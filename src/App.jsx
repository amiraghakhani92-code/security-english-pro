import React, { useMemo, useState } from "react";
import {
  Radio,
  Phone,
  Mail,
  Users,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  BadgeCheck,
  Mic,
  BriefcaseBusiness,
  CheckCircle2,
  RotateCcw,
  Sparkles
} from "lucide-react";

const modules = [
  {
    id: "gsoc",
    title: "GSOC Reports",
    icon: ShieldCheck,
    level: "Core",
    goal: "Write short, clear updates to Global Security.",
    scenario: "A vendor is testing an emergency kiosk in the Station 2 Parking Garage.",
    modelAnswer:
      "FYI: Unlimited (vendor) was working on the emergency kiosk in the Station 2 Parking Garage and testing the device. This is for awareness only.",
    phrases: [
      "FYI, this is for awareness only.",
      "The vendor is currently testing the device.",
      "No further action is needed at this time.",
      "I will continue to monitor and provide updates if needed."
    ],
    drills: [
      "Report that a vendor completed work on the emergency kiosk.",
      "Report that a badge reader is not responding.",
      "Report that the parking gate is functioning normally again."
    ]
  },
  {
    id: "radio",
    title: "Radio Communication",
    icon: Radio,
    level: "Core",
    goal: "Use short, professional radio messages.",
    scenario: "You are at Station 2 and the crowd has cleared.",
    modelAnswer:
      "Station 2 is clear at this time. Most of the crowd has moved back inside.",
    phrases: [
      "Golf 2 back on post.",
      "Copy that.",
      "Standing by.",
      "Station 1 to GSOC, please be advised..."
    ],
    drills: [
      "Say that you are back on post.",
      "Say that the entrance is clear.",
      "Ask for assistance at the loading dock."
    ]
  },
  {
    id: "phone",
    title: "Phone Calls",
    icon: Phone,
    level: "High Priority",
    goal: "Handle access-control calls with confidence.",
    scenario: "An employee calls and says their badge is not working at the garage entrance.",
    modelAnswer:
      "Thanks for calling Security. Can I have your full name and employee ID? I’ll check your access and see what may be causing the issue.",
    phrases: [
      "Thanks for calling Security. How can I help you?",
      "Can I have your full name and employee ID?",
      "Let me check that for you.",
      "I’ll escalate this to the badging team."
    ],
    drills: [
      "Employee says access is denied.",
      "Manager calls about a new employee badge.",
      "Vendor calls asking where to check in."
    ]
  },
  {
    id: "email",
    title: "Email Writing",
    icon: Mail,
    level: "High Priority",
    goal: "Write professional emails quickly.",
    scenario: "A FedEx driver left because an escort was delayed.",
    modelAnswer:
      "Hi Pedro, just a quick update: the FedEx driver arrived for pickup, but he was unable to wait for an escort and left the site. I reached out for support and will continue to monitor for any follow-up.",
    phrases: [
      "Just a quick update...",
      "Please be advised...",
      "No further action is needed at this time.",
      "Please let me know if you need anything else."
    ],
    drills: [
      "Write an update about a delivery issue.",
      "Write an incident summary about a badge problem.",
      "Write a follow-up email to a supervisor."
    ]
  },
  {
    id: "meeting",
    title: "Meeting English",
    icon: Users,
    level: "Advanced",
    goal: "Speak clearly in Teams meetings.",
    scenario: "Your manager asks why badge troubleshooting needs a faster escalation process.",
    modelAnswer:
      "From my side, the main issue is response time. If a badge issue is not handled quickly, it can delay employees, vendors, and operations. My recommendation is to create a clear escalation process.",
    phrases: [
      "From my side...",
      "The main issue is...",
      "My recommendation is...",
      "Could you please clarify that?"
    ],
    drills: [
      "Explain a badge-access issue in a meeting.",
      "Give a status update about onboarding.",
      "Answer a follow-up question from a manager."
    ]
  },
  {
    id: "jira",
    title: "Jira Tickets",
    icon: ClipboardList,
    level: "Job Skill",
    goal: "Read, update, and explain access tickets.",
    scenario: "A Jira ticket says a new employee needs building access by tomorrow morning.",
    modelAnswer:
      "I reviewed the ticket and confirmed the requested access. I will process the badge update and follow up once the access has been assigned.",
    phrases: [
      "I reviewed the ticket.",
      "The request has been completed.",
      "I added a comment to the ticket.",
      "I’m waiting for approval before proceeding."
    ],
    drills: [
      "Write a Jira comment after completing access.",
      "Ask HR for missing information.",
      "Escalate a ticket that needs manager approval."
    ]
  },
  {
    id: "interview",
    title: "Interview Practice",
    icon: BriefcaseBusiness,
    level: "Career",
    goal: "Prepare for Access Management Specialist interviews.",
    scenario: "Interview question: Tell me about your experience with badging and access control.",
    modelAnswer:
      "I have about 4 to 5 years of experience in badging, access control, visitor management, and access troubleshooting. I have worked with systems such as Genetec, Lenel, AMAG, and Feenics, and I have supported onboarding, badge printing, access requests, and incident reports.",
    phrases: [
      "I have hands-on experience with...",
      "My background includes...",
      "I supported daily badge operations.",
      "I’m comfortable working with employees, vendors, and managers."
    ],
    drills: [
      "Answer: Why do you want this role?",
      "Answer: How do you handle an angry employee?",
      "Answer: Describe a time you solved an access issue."
    ]
  },
  {
    id: "vocab",
    title: "Vocabulary",
    icon: BookOpen,
    level: "Daily",
    goal: "Build Access Control and workplace vocabulary.",
    scenario: "Learn the words used in badging, GSOC, Jira, meetings, and access control.",
    modelAnswer:
      "Focus words: escalate, troubleshoot, access denied, badge reader, onboarding, visitor management, incident report, follow up.",
    phrases: [
      "escalate",
      "troubleshoot",
      "access denied",
      "badge reader",
      "onboarding",
      "follow up"
    ],
    drills: [
      "Use 'escalate' in a sentence.",
      "Explain 'access denied' to an employee.",
      "Use 'follow up' in an email."
    ]
  }
];

const vocab = [
  { word: "access denied", meaning: "Badge or credential does not allow entry.", example: "The employee received an access denied message at the garage." },
  { word: "escalate", meaning: "Send a problem to a higher-level person or team.", example: "I will escalate this issue to the badging team." },
  { word: "troubleshoot", meaning: "Find and fix the cause of a problem.", example: "I helped troubleshoot the badge reader issue." },
  { word: "badge reader", meaning: "Device that scans a badge.", example: "The badge reader at Station 2 is not responding." },
  { word: "onboarding", meaning: "Process of setting up a new employee.", example: "I support new employee onboarding." },
  { word: "vendor", meaning: "Outside company or worker providing service.", example: "The vendor was testing the emergency kiosk." },
  { word: "awareness only", meaning: "Information only; no action required.", example: "This is for awareness only." },
  { word: "incident report", meaning: "Written report about an issue or event.", example: "I submitted an incident report to my supervisor." },
  { word: "escort", meaning: "Accompany someone for security reasons.", example: "The FedEx driver needed an escort." },
  { word: "follow up", meaning: "Check again later.", example: "I will follow up with HR tomorrow." },
  { word: "remediation", meaning: "Fixing or correcting a problem.", example: "The team assisted with alarm remediation." },
  { word: "RBAC", meaning: "Role-Based Access Control.", example: "Access can be assigned based on RBAC policies." }
];

const dailyPlans = {
  "15 minutes": ["3 min vocabulary", "4 min listening/speaking", "4 min scenario response", "4 min correction/repeat"],
  "30 minutes": ["5 min vocabulary", "8 min phone or radio", "8 min email/report writing", "9 min review"],
  "60 minutes": ["10 min vocabulary", "15 min listening", "15 min speaking role-play", "10 min writing", "10 min interview practice"]
};

function App() {
  const [selectedId, setSelectedId] = useState("gsoc");
  const [answer, setAnswer] = useState("");
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aep_completed") || "[]"); } catch { return []; }
  });
  const [plan, setPlan] = useState("30 minutes");
  const [tab, setTab] = useState("training");

  const selected = useMemo(() => modules.find(m => m.id === selectedId), [selectedId]);
  const progress = Math.round((completed.length / modules.length) * 100);

  const markDone = () => {
    const next = completed.includes(selectedId) ? completed : [...completed, selectedId];
    setCompleted(next);
    localStorage.setItem("aep_completed", JSON.stringify(next));
  };

  const reset = () => {
    setCompleted([]);
    setAnswer("");
    localStorage.removeItem("aep_completed");
  };

  const Icon = selected.icon;

  return (
    <div className="app">
      <header className="hero">
        <div>
          <div className="eyebrow"><Sparkles size={16}/> Access English Pro v1.0</div>
          <h1>Workplace English for Access Management Jobs</h1>
          <p>Train for Badging, Access Control, Identity Management, GSOC reports, phone calls, meetings, and interviews.</p>
        </div>
        <div className="target">
          <span>Target Role</span>
          <strong>$50–60/hr</strong>
        </div>
      </header>

      <nav className="tabs">
        <button className={tab === "training" ? "active" : ""} onClick={() => setTab("training")}>Training</button>
        <button className={tab === "dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}>Dashboard</button>
        <button className={tab === "vocabulary" ? "active" : ""} onClick={() => setTab("vocabulary")}>Vocabulary</button>
        <button className={tab === "interview" ? "active" : ""} onClick={() => { setTab("training"); setSelectedId("interview"); }}>Interview</button>
      </nav>

      {tab === "dashboard" && (
        <section className="dashboard">
          <div className="card">
            <h2>Mission</h2>
            <p>This app is not for general English. It is for Access Control, Badging, Identity Management, and Physical Security communication.</p>
          </div>
          <div className="card">
            <h2>Progress</h2>
            <div className="progress"><div style={{ width: `${progress}%` }} /></div>
            <p>{progress}% complete</p>
            <button className="secondary" onClick={reset}><RotateCcw size={16}/> Reset Progress</button>
          </div>
          <div className="card">
            <h2>Daily Plan</h2>
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              {Object.keys(dailyPlans).map(p => <option key={p}>{p}</option>)}
            </select>
            <ul>
              {dailyPlans[plan].map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      )}

      {tab === "training" && (
        <main className="training-grid">
          <aside className="card module-list">
            <h2>Modules</h2>
            {modules.map(m => {
              const MIcon = m.icon;
              return (
                <button key={m.id} className={selectedId === m.id ? "module active" : "module"} onClick={() => setSelectedId(m.id)}>
                  <MIcon size={18}/>
                  <span>{m.title}</span>
                  {completed.includes(m.id) && <CheckCircle2 size={16}/>}
                </button>
              );
            })}
          </aside>

          <section className="card lesson">
            <div className="lesson-head">
              <Icon size={34}/>
              <div>
                <h2>{selected.title}</h2>
                <span>{selected.level}</span>
              </div>
            </div>

            <div className="block">
              <h3>Goal</h3>
              <p>{selected.goal}</p>
            </div>

            <div className="block scenario">
              <h3>Scenario</h3>
              <p>{selected.scenario}</p>
            </div>

            <div className="block model">
              <h3>Model Answer</h3>
              <p>{selected.modelAnswer}</p>
            </div>

            <div className="block">
              <h3>Useful Phrases</h3>
              <div className="chips">
                {selected.phrases.map(p => <span key={p}>{p}</span>)}
              </div>
            </div>

            <div className="block">
              <h3>Practice Drills</h3>
              <ul>
                {selected.drills.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>

            <div className="block">
              <h3>Your Answer</h3>
              <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here. Later we will connect this to AI feedback."/>
              <div className="actions">
                <button onClick={markDone}>Mark Module Done</button>
                <button className="secondary" onClick={() => setAnswer("")}>Clear</button>
              </div>
            </div>
          </section>

          <aside className="card coach">
            <h2>Coach Instructions</h2>
            <p>Practice out loud. Then type your answer. Compare it with the model answer.</p>
            <h3>Correction Method</h3>
            <ol>
              <li>Say it naturally.</li>
              <li>Make it shorter.</li>
              <li>Make it more professional.</li>
              <li>Repeat it 3 times.</li>
            </ol>
          </aside>
        </main>
      )}

      {tab === "vocabulary" && (
        <section className="card">
          <div className="lesson-head">
            <BookOpen size={34}/>
            <div>
              <h2>Access Control Vocabulary</h2>
              <span>Daily Review</span>
            </div>
          </div>
          <div className="vocab-grid">
            {vocab.map(v => (
              <div className="vocab-card" key={v.word}>
                <h3>{v.word}</h3>
                <p>{v.meaning}</p>
                <em>{v.example}</em>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer>
        Built for Amir Aghakhani — Access English Pro
      </footer>
    </div>
  );
}

export default App;
