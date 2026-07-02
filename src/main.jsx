import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SENTENCES = [
  {
    "id": 1,
    "category": "Interview",
    "english": "My technical skills are strong, and I am actively working on improving my communication.",
    "persian": "مهارت‌های فنی من قوی است و دارم فعالانه روی بهتر کردن ارتباطم کار می‌کنم.",
    "blank": "My technical skills are _____, and I am actively working on improving my _____.",
    "answers": [
      "strong",
      "communication"
    ]
  },
  {
    "id": 2,
    "category": "Phone Calls",
    "english": "Could you please repeat that a little more slowly?",
    "persian": "ممکن است لطفاً آن را کمی آهسته‌تر تکرار کنید؟",
    "blank": "Could you please _____ that a little more slowly?",
    "answers": [
      "repeat"
    ]
  },
  {
    "id": 3,
    "category": "Radio",
    "english": "Stand by. I will check and get back to you.",
    "persian": "صبر کنید. بررسی می‌کنم و به شما خبر می‌دهم.",
    "blank": "Stand by. I will _____ and get back to you.",
    "answers": [
      "check"
    ]
  },
  {
    "id": 4,
    "category": "Parking Garage",
    "english": "Please pull forward and wait by the gate.",
    "persian": "لطفاً جلوتر بروید و کنار گیت منتظر بمانید.",
    "blank": "Please pull _____ and wait by the gate.",
    "answers": [
      "forward"
    ]
  },
  {
    "id": 5,
    "category": "Badge Issues",
    "english": "Please redirect them to the main lobby.",
    "persian": "لطفاً آن‌ها را به لابی اصلی هدایت کنید.",
    "blank": "Please _____ them to the main lobby.",
    "answers": [
      "redirect"
    ]
  },
  {
    "id": 6,
    "category": "Badge Issues",
    "english": "It is due to a landlord issue and some building discrepancies.",
    "persian": "این به خاطر مشکل مربوط به مالک ساختمان و برخی مغایرت‌های ساختمانی است.",
    "blank": "It is due to a landlord issue and some building _____.",
    "answers": [
      "discrepancies"
    ]
  },
  {
    "id": 7,
    "category": "Email",
    "english": "Thank you for reaching out.",
    "persian": "ممنون که تماس گرفتید / پیام دادید.",
    "blank": "Thank you for reaching _____.",
    "answers": [
      "out"
    ]
  },
  {
    "id": 8,
    "category": "Email",
    "english": "Mondays and Fridays generally work best for me.",
    "persian": "دوشنبه‌ها و جمعه‌ها معمولاً برای من بهتر هستند.",
    "blank": "Mondays and Fridays generally _____ best for me.",
    "answers": [
      "work"
    ]
  },
  {
    "id": 9,
    "category": "Customer Service",
    "english": "I understand. Let me check that for you.",
    "persian": "متوجه هستم. اجازه بدهید آن را برای شما بررسی کنم.",
    "blank": "I understand. Let me _____ that for you.",
    "answers": [
      "check"
    ]
  },
  {
    "id": 10,
    "category": "Access Management",
    "english": "I will review the access request and check the approval status.",
    "persian": "درخواست دسترسی را بررسی می‌کنم و وضعیت تأیید را چک می‌کنم.",
    "blank": "I will review the access request and check the approval _____.",
    "answers": [
      "status"
    ]
  }
];

const STORAGE_KEY = "securityEnglishProProgressV2";
const intervals = [0, 1, 2, 4, 7, 14];
const dayMs = 24 * 60 * 60 * 1000;

function defaultProgress() {
  const now = Date.now();
  const obj = {};
  SENTENCES.forEach((s) => {
    obj[s.id] = { box: 1, due: now, correct: 0, wrong: 0 };
  });
  return obj;
}

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function speak(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) {
    alert("Speech is not supported in this browser.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const voice =
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang && v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function App() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved || defaultProgress();
    } catch {
      return defaultProgress();
    }
  });

  const [mode, setMode] = useState("read");
  const [rate, setRate] = useState(0.85);
  const [current, setCurrent] = useState(SENTENCES[0]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [micStatus, setMicStatus] = useState("");
  const [recorder, setRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const stats = useMemo(() => {
    const now = Date.now();
    const due = SENTENCES.filter((s) => progress[s.id]?.due <= now).length;
    const boxes = [1, 2, 3, 4, 5].map(
      (b) => SENTENCES.filter((s) => progress[s.id]?.box === b).length
    );
    return { total: SENTENCES.length, due, boxes };
  }, [progress]);

  function pickNext() {
    const now = Date.now();
    let due = SENTENCES.filter((s) => progress[s.id]?.due <= now);
    if (due.length === 0) due = SENTENCES;
    due.sort((a, b) => {
      const pa = progress[a.id];
      const pb = progress[b.id];
      return pa.box - pb.box || a.id - b.id;
    });
    setCurrent(due[0]);
    setAnswer("");
    setFeedback("");
    setAudioUrl("");
  }

  function mark(ok) {
    setProgress((old) => {
      const p = old[current.id] || { box: 1, due: Date.now(), correct: 0, wrong: 0 };
      const nextBox = ok ? Math.min(5, p.box + 1) : 1;
      return {
        ...old,
        [current.id]: {
          box: nextBox,
          due: Date.now() + intervals[nextBox] * dayMs,
          correct: p.correct + (ok ? 1 : 0),
          wrong: p.wrong + (ok ? 0 : 1)
        }
      };
    });
    setTimeout(pickNext, 100);
  }

  function checkAnswer() {
    if (mode === "blank") {
      const clean = normalize(answer);
      const ok = current.answers.every((a) => clean.includes(normalize(a)));
      setFeedback(ok ? "Correct." : `Not yet. Answer: ${current.answers.join(", ")}`);
      return;
    }

    const cleanAnswer = normalize(answer);
    const target = normalize(current.english);
    const targetWords = target.split(" ");
    const answerWords = cleanAnswer.split(" ");
    let matched = 0;
    targetWords.forEach((w) => {
      if (answerWords.includes(w)) matched++;
    });
    const score = Math.round((matched / targetWords.length) * 100);
    setFeedback(`Score: ${score}%. Correct sentence: ${current.english}`);
  }

  async function requestMic() {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setMicStatus("Microphone requires HTTPS and a supported browser.");
        return false;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicStatus("Microphone allowed.");
      return true;
    } catch (e) {
      setMicStatus(`Microphone blocked or unavailable: ${e.name}`);
      return false;
    }
  }

  async function startRecording() {
    setAudioUrl("");
    const ok = await requestMic();
    if (!ok) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const localChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) localChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(localChunks, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((t) => t.stop());
      setMicStatus("Recording ready. Play it below.");
    };

    mediaRecorder.start();
    setChunks(localChunks);
    setRecorder(mediaRecorder);
    setMicStatus("Recording... press Stop when finished.");
  }

  function stopRecording() {
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      setRecorder(null);
    } else {
      setMicStatus("No active recording.");
    }
  }

  const hardWords = current.english
    .replace(/[.,!?;:'"“”‘’]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 8)
    .slice(0, 6);

  return (
    <main>
      <header>
        <h1>Security English Pro</h1>
        <p>Workplace English for Security, Access Control, Badging, Radio, Email, and Interviews</p>
      </header>

      <section className="card">
        <h2>Dashboard</h2>
        <div className="stats">
          <div><b>{stats.total}</b><span>Total</span></div>
          <div><b>{stats.due}</b><span>Due</span></div>
          <div><b>{stats.boxes[0]}</b><span>Box 1</span></div>
          <div><b>{stats.boxes[2]}</b><span>Box 3</span></div>
          <div><b>{stats.boxes[4]}</b><span>Mastered</span></div>
        </div>
      </section>

      <section className="card controls">
        <label>Practice Mode</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="read">Read & Repeat</option>
          <option value="blank">Fill in the Blank</option>
          <option value="write">Write from Memory</option>
          <option value="fa2en">Persian to English</option>
        </select>

        <label>Voice Speed</label>
        <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
          <option value={0.65}>Slow 0.65x</option>
          <option value={0.85}>Clear 0.85x</option>
          <option value={1}>Normal 1.0x</option>
          <option value={1.15}>Fast 1.15x</option>
        </select>

        <button onClick={pickNext}>Start / Next Due Sentence</button>
      </section>

      <section className="card lesson">
        <div className="tag">{current.category}</div>
        <div className="box">Box {progress[current.id]?.box || 1}</div>

        <div className="audioTools">
          <button onClick={() => speak(current.english, rate)}>🔊 Play Sentence</button>
          {hardWords.map((w) => (
            <button key={w} onClick={() => speak(w, rate)}>🔊 {w}</button>
          ))}
        </div>

        {mode === "read" && (
          <>
            <p className="sentence">{current.english}</p>
            <p className="persian">{current.persian}</p>
            <p className="instruction">Read it out loud 5 times. Then mark yourself.</p>
            <button className="good" onClick={() => mark(true)}>I remembered it</button>
            <button className="bad" onClick={() => mark(false)}>I forgot it</button>
          </>
        )}

        {mode === "blank" && (
          <>
            <p className="sentence">{current.blank}</p>
            <p className="persian">{current.persian}</p>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type the missing word(s)" />
            <button onClick={checkAnswer}>Check</button>
            <button className="good" onClick={() => mark(true)}>Move Forward</button>
            <button className="bad" onClick={() => mark(false)}>Move Back</button>
          </>
        )}

        {(mode === "write" || mode === "fa2en") && (
          <>
            <p className="persian">{current.persian}</p>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type the full English sentence from memory" />
            <button onClick={checkAnswer}>Check</button>
            <button onClick={() => setFeedback(current.english)}>Show Answer</button>
            <button className="good" onClick={() => mark(true)}>Move Forward</button>
            <button className="bad" onClick={() => mark(false)}>Move Back</button>
          </>
        )}

        {feedback && <div className="feedback">{feedback}</div>}

        <div className="recorder">
          <h3>Speaking Recorder</h3>
          <button onClick={requestMic}>🎤 Allow Microphone</button>
          <button onClick={startRecording}>Start Record</button>
          <button onClick={stopRecording}>Stop</button>
          <p>{micStatus}</p>
          {audioUrl && <audio controls src={audioUrl}></audio>}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
