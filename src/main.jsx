import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SENTENCES = [
  {
    "id": 1,
    "category": "Radio",
    "english": "Copy. I will notify the team.",
    "persian": "دریافت شد. به تیم اطلاع می‌دهم.",
    "blank": "Copy. I will _____ the team.",
    "answers": [
      "notify"
    ]
  },
  {
    "id": 2,
    "category": "Radio",
    "english": "Go ahead with your traffic.",
    "persian": "پیامت را بفرست / ادامه بده.",
    "blank": "Go _____ with your traffic.",
    "answers": [
      "ahead"
    ]
  },
  {
    "id": 3,
    "category": "Radio",
    "english": "Stand by. I am checking now.",
    "persian": "صبر کنید. الان دارم بررسی می‌کنم.",
    "blank": "_____ by. I am checking now.",
    "answers": [
      "Stand"
    ]
  },
  {
    "id": 4,
    "category": "Radio",
    "english": "Be advised, the loading dock is currently clear.",
    "persian": "جهت اطلاع، لودینگ داک در حال حاضر خالی است.",
    "blank": "Be _____, the loading dock is currently clear.",
    "answers": [
      "advised"
    ]
  },
  {
    "id": 5,
    "category": "Radio",
    "english": "Negative, I do not have any updates at this time.",
    "persian": "منفی، در حال حاضر آپدیتی ندارم.",
    "blank": "_____, I do not have any updates at this time.",
    "answers": [
      "Negative"
    ]
  },
  {
    "id": 6,
    "category": "Radio",
    "english": "Received. I will remain on post.",
    "persian": "دریافت شد. در پست می‌مانم.",
    "blank": "_____. I will remain on post.",
    "answers": [
      "Received"
    ]
  },
  {
    "id": 7,
    "category": "Radio",
    "english": "Can you repeat your last transmission?",
    "persian": "می‌توانی آخرین پیامت را تکرار کنی؟",
    "blank": "Can you _____ your last transmission?",
    "answers": [
      "repeat"
    ]
  },
  {
    "id": 8,
    "category": "Radio",
    "english": "I am back on post.",
    "persian": "من به پست برگشتم.",
    "blank": "_____ am back on post.",
    "answers": [
      "I"
    ]
  },
  {
    "id": 9,
    "category": "Radio",
    "english": "I am conducting a quick check of the area.",
    "persian": "دارم یک بررسی سریع از منطقه انجام می‌دهم.",
    "blank": "I am _____ a quick check of the area.",
    "answers": [
      "conducting"
    ]
  },
  {
    "id": 10,
    "category": "Radio",
    "english": "All clear at this time.",
    "persian": "در حال حاضر همه چیز کلیر است.",
    "blank": "All _____ at this time.",
    "answers": [
      "clear"
    ]
  },
  {
    "id": 11,
    "category": "Parking Garage",
    "english": "Please pull forward and wait by the gate.",
    "persian": "لطفاً جلوتر بروید و کنار گیت منتظر بمانید.",
    "blank": "_____ pull forward and wait by the gate.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 12,
    "category": "Parking Garage",
    "english": "Please stop here for a quick badge scan.",
    "persian": "لطفاً برای یک اسکن سریع کارت اینجا توقف کنید.",
    "blank": "_____ stop here for a quick badge scan.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 13,
    "category": "Parking Garage",
    "english": "Could you please have your badge ready?",
    "persian": "ممکن است لطفاً کارتتان را آماده داشته باشید؟",
    "blank": "_____ you please have your badge ready?",
    "answers": [
      "Could"
    ]
  },
  {
    "id": 14,
    "category": "Parking Garage",
    "english": "Please follow the traffic flow and proceed slowly.",
    "persian": "لطفاً مسیر ترافیک را دنبال کنید و آهسته حرکت کنید.",
    "blank": "_____ follow the traffic flow and proceed slowly.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 15,
    "category": "Parking Garage",
    "english": "This entrance is for authorized access only.",
    "persian": "این ورودی فقط برای دسترسی مجاز است.",
    "blank": "This _____ is for authorized access only.",
    "answers": [
      "entrance"
    ]
  },
  {
    "id": 16,
    "category": "Parking Garage",
    "english": "Please do not block the garage entrance.",
    "persian": "لطفاً ورودی گاراژ را مسدود نکنید.",
    "blank": "_____ do not block the garage entrance.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 17,
    "category": "Parking Garage",
    "english": "You can park in the designated visitor area.",
    "persian": "می‌توانید در محل مشخص‌شده بازدیدکنندگان پارک کنید.",
    "blank": "You can park in the _____ visitor area.",
    "answers": [
      "designated"
    ]
  },
  {
    "id": 18,
    "category": "Parking Garage",
    "english": "Please wait here while I verify your access.",
    "persian": "لطفاً اینجا منتظر بمانید تا دسترسی شما را تأیید کنم.",
    "blank": "_____ wait here while I verify your access.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 19,
    "category": "Parking Garage",
    "english": "I need to check your badge before you enter.",
    "persian": "باید قبل از ورود کارت شما را بررسی کنم.",
    "blank": "I need to _____ your badge before you enter.",
    "answers": [
      "check"
    ]
  },
  {
    "id": 20,
    "category": "Parking Garage",
    "english": "Please use the main entrance for assistance.",
    "persian": "لطفاً برای کمک از ورودی اصلی استفاده کنید.",
    "blank": "_____ use the main entrance for assistance.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 21,
    "category": "Loading Dock",
    "english": "The driver is waiting at the loading dock.",
    "persian": "راننده در لودینگ داک منتظر است.",
    "blank": "The _____ is waiting at the loading dock.",
    "answers": [
      "driver"
    ]
  },
  {
    "id": 22,
    "category": "Loading Dock",
    "english": "I will contact logistics for an escort.",
    "persian": "برای اسکورت با لجستیک تماس می‌گیرم.",
    "blank": "I will _____ logistics for an escort.",
    "answers": [
      "contact"
    ]
  },
  {
    "id": 23,
    "category": "Loading Dock",
    "english": "The vendor is on site and ready for pickup.",
    "persian": "وندور در سایت است و برای پیکاپ آماده است.",
    "blank": "The _____ is on site and ready for pickup.",
    "answers": [
      "vendor"
    ]
  },
  {
    "id": 24,
    "category": "Loading Dock",
    "english": "The delivery requires a signature.",
    "persian": "این تحویل به امضا نیاز دارد.",
    "blank": "The _____ requires a signature.",
    "answers": [
      "delivery"
    ]
  },
  {
    "id": 25,
    "category": "Loading Dock",
    "english": "The driver cannot wait much longer.",
    "persian": "راننده نمی‌تواند خیلی بیشتر منتظر بماند.",
    "blank": "The _____ cannot wait much longer.",
    "answers": [
      "driver"
    ]
  },
  {
    "id": 26,
    "category": "Loading Dock",
    "english": "I notified the logistics team about the delivery.",
    "persian": "به تیم لجستیک درباره تحویل اطلاع دادم.",
    "blank": "I _____ the logistics team about the delivery.",
    "answers": [
      "notified"
    ]
  },
  {
    "id": 27,
    "category": "Loading Dock",
    "english": "The packages are for multiple departments.",
    "persian": "بسته‌ها برای چند دپارتمان هستند.",
    "blank": "The _____ are for multiple departments.",
    "answers": [
      "packages"
    ]
  },
  {
    "id": 28,
    "category": "Loading Dock",
    "english": "The pickup has been completed.",
    "persian": "پیکاپ انجام شده است.",
    "blank": "The _____ has been completed.",
    "answers": [
      "pickup"
    ]
  },
  {
    "id": 29,
    "category": "Loading Dock",
    "english": "The vendor is testing the equipment.",
    "persian": "وندور دارد دستگاه را تست می‌کند.",
    "blank": "The _____ is testing the equipment.",
    "answers": [
      "vendor"
    ]
  },
  {
    "id": 30,
    "category": "Loading Dock",
    "english": "The delivery has been redirected to the main lobby.",
    "persian": "تحویل به لابی اصلی هدایت شده است.",
    "blank": "The _____ has been redirected to the main lobby.",
    "answers": [
      "delivery"
    ]
  },
  {
    "id": 31,
    "category": "Badge Issues",
    "english": "Please redirect them to the main lobby.",
    "persian": "لطفاً آن‌ها را به لابی اصلی هدایت کنید.",
    "blank": "_____ redirect them to the main lobby.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 32,
    "category": "Badge Issues",
    "english": "It is due to a landlord issue and some building discrepancies.",
    "persian": "این به خاطر مشکل مربوط به مالک ساختمان و برخی مغایرت‌های ساختمانی است.",
    "blank": "It is due to a _____ issue and some building discrepancies.",
    "answers": [
      "landlord"
    ]
  },
  {
    "id": 33,
    "category": "Badge Issues",
    "english": "Please do not mention that the old badge may have stopped working.",
    "persian": "لطفاً اشاره نکنید که ممکن است کارت قدیمی از کار افتاده باشد.",
    "blank": "_____ do not mention that the old badge may have stopped working.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 34,
    "category": "Badge Issues",
    "english": "The admin team will email them directly once the badges are ready.",
    "persian": "وقتی کارت‌ها آماده شوند، تیم ادمین مستقیم به آن‌ها ایمیل می‌زند.",
    "blank": "The _____ team will email them directly once the badges are ready.",
    "answers": [
      "admin"
    ]
  },
  {
    "id": 35,
    "category": "Badge Issues",
    "english": "Let me check your badge status in the system.",
    "persian": "اجازه بدهید وضعیت کارت شما را در سیستم بررسی کنم.",
    "blank": "Let me _____ your badge status in the system.",
    "answers": [
      "check"
    ]
  },
  {
    "id": 36,
    "category": "Badge Issues",
    "english": "Your badge is active, but the reader is not responding.",
    "persian": "کارت شما فعال است، اما ریدر پاسخ نمی‌دهد.",
    "blank": "Your _____ is active, but the reader is not responding.",
    "answers": [
      "badge"
    ]
  },
  {
    "id": 37,
    "category": "Badge Issues",
    "english": "It may take a few minutes for the access level to update.",
    "persian": "ممکن است چند دقیقه طول بکشد تا سطح دسترسی به‌روزرسانی شود.",
    "blank": "It may take a few _____ for the access level to update.",
    "answers": [
      "minutes"
    ]
  },
  {
    "id": 38,
    "category": "Badge Issues",
    "english": "Could you please try scanning your badge one more time?",
    "persian": "ممکن است لطفاً یک بار دیگر کارتتان را اسکن کنید؟",
    "blank": "_____ you please try scanning your badge one more time?",
    "answers": [
      "Could"
    ]
  },
  {
    "id": 39,
    "category": "Badge Issues",
    "english": "I do not see the required access assigned to your profile.",
    "persian": "دسترسی لازم را روی پروفایل شما نمی‌بینم.",
    "blank": "I do not see the _____ access assigned to your profile.",
    "answers": [
      "required"
    ]
  },
  {
    "id": 40,
    "category": "Badge Issues",
    "english": "The badge reader may be offline.",
    "persian": "ممکن است ریدر کارت آفلاین باشد.",
    "blank": "The _____ reader may be offline.",
    "answers": [
      "badge"
    ]
  },
  {
    "id": 41,
    "category": "Access Management",
    "english": "I will review the access request and check the approval status.",
    "persian": "درخواست دسترسی را بررسی می‌کنم و وضعیت تأیید را چک می‌کنم.",
    "blank": "I will _____ the access request and check the approval status.",
    "answers": [
      "review"
    ]
  },
  {
    "id": 42,
    "category": "Access Management",
    "english": "This request requires manager approval before we can grant access.",
    "persian": "این درخواست قبل از دادن دسترسی به تأیید مدیر نیاز دارد.",
    "blank": "This _____ requires manager approval before we can grant access.",
    "answers": [
      "request"
    ]
  },
  {
    "id": 43,
    "category": "Access Management",
    "english": "For security reasons, we cannot grant access without proper authorization.",
    "persian": "به دلایل امنیتی، بدون مجوز مناسب نمی‌توانیم دسترسی بدهیم.",
    "blank": "For _____ reasons, we cannot grant access without proper authorization.",
    "answers": [
      "security"
    ]
  },
  {
    "id": 44,
    "category": "Access Management",
    "english": "I will confirm the access requirements with the request owner.",
    "persian": "نیازمندی‌های دسترسی را با مالک درخواست تأیید می‌کنم.",
    "blank": "I will _____ the access requirements with the request owner.",
    "answers": [
      "confirm"
    ]
  },
  {
    "id": 45,
    "category": "Access Management",
    "english": "Once the approval is complete, I can assign the correct access level.",
    "persian": "وقتی تأیید کامل شد، می‌توانم سطح دسترسی درست را اختصاص بدهم.",
    "blank": "Once the _____ is complete, I can assign the correct access level.",
    "answers": [
      "approval"
    ]
  },
  {
    "id": 46,
    "category": "Access Management",
    "english": "The access level has been updated.",
    "persian": "سطح دسترسی به‌روزرسانی شده است.",
    "blank": "The _____ level has been updated.",
    "answers": [
      "access"
    ]
  },
  {
    "id": 47,
    "category": "Access Management",
    "english": "The user profile needs to be reviewed.",
    "persian": "پروفایل کاربر باید بررسی شود.",
    "blank": "The user _____ needs to be reviewed.",
    "answers": [
      "profile"
    ]
  },
  {
    "id": 48,
    "category": "Access Management",
    "english": "This access is limited to authorized personnel.",
    "persian": "این دسترسی فقط محدود به افراد مجاز است.",
    "blank": "This _____ is limited to authorized personnel.",
    "answers": [
      "access"
    ]
  },
  {
    "id": 49,
    "category": "Access Management",
    "english": "The request is currently pending review.",
    "persian": "درخواست در حال حاضر منتظر بررسی است.",
    "blank": "The _____ is currently pending review.",
    "answers": [
      "request"
    ]
  },
  {
    "id": 50,
    "category": "Access Management",
    "english": "The access change has been completed.",
    "persian": "تغییر دسترسی انجام شده است.",
    "blank": "The _____ change has been completed.",
    "answers": [
      "access"
    ]
  },
  {
    "id": 51,
    "category": "Email",
    "english": "Thank you for reaching out.",
    "persian": "ممنون که پیام دادید.",
    "blank": "_____ you for reaching out.",
    "answers": [
      "Thank"
    ]
  },
  {
    "id": 52,
    "category": "Email",
    "english": "Mondays and Fridays generally work best for me.",
    "persian": "دوشنبه‌ها و جمعه‌ها معمولاً برای من بهتر هستند.",
    "blank": "_____ and Fridays generally work best for me.",
    "answers": [
      "Mondays"
    ]
  },
  {
    "id": 53,
    "category": "Email",
    "english": "Please let me know if you need any additional information.",
    "persian": "اگر اطلاعات بیشتری نیاز دارید لطفاً اطلاع دهید.",
    "blank": "_____ let me know if you need any additional information.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 54,
    "category": "Email",
    "english": "I look forward to speaking with you.",
    "persian": "مشتاقانه منتظر صحبت با شما هستم.",
    "blank": "I look _____ to speaking with you.",
    "answers": [
      "forward"
    ]
  },
  {
    "id": 55,
    "category": "Email",
    "english": "I wanted to provide a quick update on this issue.",
    "persian": "می‌خواستم یک آپدیت کوتاه درباره این مشکل بدهم.",
    "blank": "I _____ to provide a quick update on this issue.",
    "answers": [
      "wanted"
    ]
  },
  {
    "id": 56,
    "category": "Email",
    "english": "Thank you for the clarification.",
    "persian": "ممنون بابت توضیح بیشتر.",
    "blank": "_____ you for the clarification.",
    "answers": [
      "Thank"
    ]
  },
  {
    "id": 57,
    "category": "Email",
    "english": "I will follow up and provide an update shortly.",
    "persian": "پیگیری می‌کنم و به‌زودی آپدیت می‌دهم.",
    "blank": "I will _____ up and provide an update shortly.",
    "answers": [
      "follow"
    ]
  },
  {
    "id": 58,
    "category": "Email",
    "english": "Please let me know what time works best for you.",
    "persian": "لطفاً بفرمایید چه زمانی برای شما بهتر است.",
    "blank": "_____ let me know what time works best for you.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 59,
    "category": "Email",
    "english": "I appreciate your patience.",
    "persian": "از صبر شما سپاسگزارم.",
    "blank": "I _____ your patience.",
    "answers": [
      "appreciate"
    ]
  },
  {
    "id": 60,
    "category": "Email",
    "english": "This has been completed.",
    "persian": "این انجام شده است.",
    "blank": "This has been _____.",
    "answers": [
      "completed"
    ]
  },
  {
    "id": 61,
    "category": "Teams / Slack",
    "english": "Thanks for the update. I will take care of it.",
    "persian": "ممنون بابت آپدیت. من رسیدگی می‌کنم.",
    "blank": "_____ for the update. I will take care of it.",
    "answers": [
      "Thanks"
    ]
  },
  {
    "id": 62,
    "category": "Teams / Slack",
    "english": "I am checking on this now and will follow up shortly.",
    "persian": "الان دارم این را بررسی می‌کنم و به‌زودی پیگیری می‌کنم.",
    "blank": "I am _____ on this now and will follow up shortly.",
    "answers": [
      "checking"
    ]
  },
  {
    "id": 63,
    "category": "Teams / Slack",
    "english": "Can you please confirm the employee’s name and location?",
    "persian": "ممکن است لطفاً نام و محل کارمند را تأیید کنید؟",
    "blank": "Can you _____ confirm the employee’s name and location?",
    "answers": [
      "please"
    ]
  },
  {
    "id": 64,
    "category": "Teams / Slack",
    "english": "I will keep you posted once I have an update.",
    "persian": "وقتی آپدیت داشته باشم به شما اطلاع می‌دهم.",
    "blank": "I will keep you _____ once I have an update.",
    "answers": [
      "posted"
    ]
  },
  {
    "id": 65,
    "category": "Teams / Slack",
    "english": "This has been completed. Please let me know if anything else is needed.",
    "persian": "این انجام شد. اگر چیز دیگری لازم است لطفاً اطلاع دهید.",
    "blank": "This has been _____. Please let me know if anything else is needed.",
    "answers": [
      "completed"
    ]
  },
  {
    "id": 66,
    "category": "Teams / Slack",
    "english": "I reached out to the team and I am waiting for a response.",
    "persian": "با تیم تماس گرفتم و منتظر پاسخ هستم.",
    "blank": "I _____ out to the team and I am waiting for a response.",
    "answers": [
      "reached"
    ]
  },
  {
    "id": 67,
    "category": "Teams / Slack",
    "english": "I will check and get back to you.",
    "persian": "بررسی می‌کنم و به شما خبر می‌دهم.",
    "blank": "I will _____ and get back to you.",
    "answers": [
      "check"
    ]
  },
  {
    "id": 68,
    "category": "Teams / Slack",
    "english": "Could you please send me the details?",
    "persian": "ممکن است لطفاً جزئیات را برایم بفرستید؟",
    "blank": "_____ you please send me the details?",
    "answers": [
      "Could"
    ]
  },
  {
    "id": 69,
    "category": "Teams / Slack",
    "english": "I am currently on post, but I will follow up when I can.",
    "persian": "الان در پست هستم، اما وقتی بتوانم پیگیری می‌کنم.",
    "blank": "I am _____ on post, but I will follow up when I can.",
    "answers": [
      "currently"
    ]
  },
  {
    "id": 70,
    "category": "Teams / Slack",
    "english": "Please advise if there are any changes.",
    "persian": "اگر تغییری هست لطفاً اطلاع دهید.",
    "blank": "_____ advise if there are any changes.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 71,
    "category": "Phone Calls",
    "english": "Could you please repeat that a little more slowly?",
    "persian": "ممکن است لطفاً آن را کمی آهسته‌تر تکرار کنید؟",
    "blank": "_____ you please repeat that a little more slowly?",
    "answers": [
      "Could"
    ]
  },
  {
    "id": 72,
    "category": "Phone Calls",
    "english": "Let me make sure I understood you correctly.",
    "persian": "اجازه بدهید مطمئن شوم درست متوجه شدم.",
    "blank": "Let me make sure I _____ you correctly.",
    "answers": [
      "understood"
    ]
  },
  {
    "id": 73,
    "category": "Phone Calls",
    "english": "I’m sorry, the line is a little unclear. Could you say that one more time?",
    "persian": "ببخشید، صدا کمی نامشخص است. ممکن است یک بار دیگر بگویید؟",
    "blank": "I’m _____, the line is a little unclear. Could you say that one more time?",
    "answers": [
      "sorry"
    ]
  },
  {
    "id": 74,
    "category": "Phone Calls",
    "english": "Could you send me the details by email so I can follow up accurately?",
    "persian": "ممکن است جزئیات را ایمیل کنید تا دقیق پیگیری کنم؟",
    "blank": "_____ you send me the details by email so I can follow up accurately?",
    "answers": [
      "Could"
    ]
  },
  {
    "id": 75,
    "category": "Phone Calls",
    "english": "I will check the system and get back to you shortly.",
    "persian": "سیستم را بررسی می‌کنم و به‌زودی به شما خبر می‌دهم.",
    "blank": "I will _____ the system and get back to you shortly.",
    "answers": [
      "check"
    ]
  },
  {
    "id": 76,
    "category": "Phone Calls",
    "english": "May I place you on a brief hold?",
    "persian": "ممکن است شما را برای مدت کوتاهی پشت خط نگه دارم؟",
    "blank": "May I _____ you on a brief hold?",
    "answers": [
      "place"
    ]
  },
  {
    "id": 77,
    "category": "Phone Calls",
    "english": "Who should I contact for approval?",
    "persian": "برای تأیید باید با چه کسی تماس بگیرم؟",
    "blank": "Who _____ I contact for approval?",
    "answers": [
      "should"
    ]
  },
  {
    "id": 78,
    "category": "Phone Calls",
    "english": "Can I call you back in a few minutes?",
    "persian": "می‌توانم چند دقیقه دیگر با شما تماس بگیرم؟",
    "blank": "Can I call you back in a few _____?",
    "answers": [
      "minutes"
    ]
  },
  {
    "id": 79,
    "category": "Phone Calls",
    "english": "I want to make sure I give you the correct information.",
    "persian": "می‌خواهم مطمئن شوم اطلاعات درست به شما می‌دهم.",
    "blank": "I want to make sure I give you the _____ information.",
    "answers": [
      "correct"
    ]
  },
  {
    "id": 80,
    "category": "Phone Calls",
    "english": "Thank you for calling. How can I help you?",
    "persian": "ممنون از تماس شما. چطور می‌توانم کمک کنم؟",
    "blank": "_____ you for calling. How can I help you?",
    "answers": [
      "Thank"
    ]
  },
  {
    "id": 81,
    "category": "Customer Service",
    "english": "I understand. Let me check that for you.",
    "persian": "متوجه هستم. اجازه بدهید آن را برای شما بررسی کنم.",
    "blank": "I _____. Let me check that for you.",
    "answers": [
      "understand"
    ]
  },
  {
    "id": 82,
    "category": "Customer Service",
    "english": "Thank you for your patience while I check the system.",
    "persian": "از صبر شما ممنونم تا سیستم را بررسی کنم.",
    "blank": "_____ you for your patience while I check the system.",
    "answers": [
      "Thank"
    ]
  },
  {
    "id": 83,
    "category": "Customer Service",
    "english": "I apologize for the inconvenience. I will look into it right away.",
    "persian": "بابت ناراحتی عذرخواهی می‌کنم. همین الان بررسی می‌کنم.",
    "blank": "I _____ for the inconvenience. I will look into it right away.",
    "answers": [
      "apologize"
    ]
  },
  {
    "id": 84,
    "category": "Customer Service",
    "english": "I can help you with that. May I have your name, please?",
    "persian": "می‌توانم در این مورد کمک کنم. ممکن است نامتان را داشته باشم؟",
    "blank": "I can help you with that. May I have your name, _____?",
    "answers": [
      "please"
    ]
  },
  {
    "id": 85,
    "category": "Customer Service",
    "english": "I will make sure this gets routed to the right team.",
    "persian": "مطمئن می‌شوم این به تیم درست ارجاع داده شود.",
    "blank": "I will make sure this gets _____ to the right team.",
    "answers": [
      "routed"
    ]
  },
  {
    "id": 86,
    "category": "Customer Service",
    "english": "I understand the urgency.",
    "persian": "فوریت موضوع را درک می‌کنم.",
    "blank": "I _____ the urgency.",
    "answers": [
      "understand"
    ]
  },
  {
    "id": 87,
    "category": "Customer Service",
    "english": "Let me verify that before I give you an answer.",
    "persian": "اجازه بدهید قبل از پاسخ، آن را تأیید کنم.",
    "blank": "Let me _____ that before I give you an answer.",
    "answers": [
      "verify"
    ]
  },
  {
    "id": 88,
    "category": "Customer Service",
    "english": "Thank you for bringing this to our attention.",
    "persian": "ممنون که این موضوع را به اطلاع ما رساندید.",
    "blank": "_____ you for bringing this to our attention.",
    "answers": [
      "Thank"
    ]
  },
  {
    "id": 89,
    "category": "Customer Service",
    "english": "I will do my best to assist you quickly.",
    "persian": "تمام تلاشم را می‌کنم سریع کمک کنم.",
    "blank": "I will do my best to _____ you quickly.",
    "answers": [
      "assist"
    ]
  },
  {
    "id": 90,
    "category": "Customer Service",
    "english": "Please give me a moment to check.",
    "persian": "لطفاً یک لحظه فرصت بدهید بررسی کنم.",
    "blank": "_____ give me a moment to check.",
    "answers": [
      "Please"
    ]
  },
  {
    "id": 91,
    "category": "Incident Reports",
    "english": "I notified the supervisor and documented the incident.",
    "persian": "به سوپروایزر اطلاع دادم و حادثه را ثبت کردم.",
    "blank": "I _____ the supervisor and documented the incident.",
    "answers": [
      "notified"
    ]
  },
  {
    "id": 92,
    "category": "Incident Reports",
    "english": "No safety issues were observed at the time of the report.",
    "persian": "در زمان گزارش، هیچ مشکل ایمنی مشاهده نشد.",
    "blank": "No _____ issues were observed at the time of the report.",
    "answers": [
      "safety"
    ]
  },
  {
    "id": 93,
    "category": "Incident Reports",
    "english": "I remained on post and continued to monitor the area.",
    "persian": "من در پست ماندم و به نظارت بر منطقه ادامه دادم.",
    "blank": "I _____ on post and continued to monitor the area.",
    "answers": [
      "remained"
    ]
  },
  {
    "id": 94,
    "category": "Incident Reports",
    "english": "The situation was resolved without further escalation.",
    "persian": "وضعیت بدون نیاز به ارجاع بیشتر حل شد.",
    "blank": "The _____ was resolved without further escalation.",
    "answers": [
      "situation"
    ]
  },
  {
    "id": 95,
    "category": "Incident Reports",
    "english": "At approximately 10:30 AM, I observed an access issue at the main entrance.",
    "persian": "حدود ساعت ۱۰:۳۰ صبح، یک مشکل دسترسی در ورودی اصلی مشاهده کردم.",
    "blank": "At _____ 10:30 AM, I observed an access issue at the main entrance.",
    "answers": [
      "approximately"
    ]
  },
  {
    "id": 96,
    "category": "Incident Reports",
    "english": "I reported the issue to GSOC for awareness.",
    "persian": "موضوع را جهت آگاهی به GSOC گزارش دادم.",
    "blank": "I _____ the issue to GSOC for awareness.",
    "answers": [
      "reported"
    ]
  },
  {
    "id": 97,
    "category": "Incident Reports",
    "english": "The area was clear at the time of the report.",
    "persian": "در زمان گزارش، منطقه کلیر بود.",
    "blank": "The area was _____ at the time of the report.",
    "answers": [
      "clear"
    ]
  },
  {
    "id": 98,
    "category": "Incident Reports",
    "english": "The vendor was working on the emergency kiosk.",
    "persian": "وندور روی کیوسک اضطراری کار می‌کرد.",
    "blank": "The _____ was working on the emergency kiosk.",
    "answers": [
      "vendor"
    ]
  },
  {
    "id": 99,
    "category": "Incident Reports",
    "english": "No further action was required at that time.",
    "persian": "در آن زمان اقدام بیشتری لازم نبود.",
    "blank": "No _____ action was required at that time.",
    "answers": [
      "further"
    ]
  },
  {
    "id": 100,
    "category": "Incident Reports",
    "english": "I continued to monitor the situation.",
    "persian": "به نظارت بر وضعیت ادامه دادم.",
    "blank": "I _____ to monitor the situation.",
    "answers": [
      "continued"
    ]
  }
];
const STORAGE_KEY = "securityEnglishProProgressV22";
const intervals = [0, 1, 2, 4, 7, 14];
const dayMs = 24 * 60 * 60 * 1000;

function defaultProgress() {
  const now = Date.now();
  const obj = {};
  SENTENCES.forEach((s) => obj[s.id] = { box: 1, due: now, correct: 0, wrong: 0 });
  return obj;
}

function normalize(text) {
  return (text || "").toLowerCase().replace(/[.,!?;:'"“”‘’]/g, "").replace(/\s+/g, " ").trim();
}

function speak(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) { alert("Speech is not supported in this browser."); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = rate; u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang === "en-US") || voices.find(v => v.lang && v.lang.startsWith("en"));
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

function App() {
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultProgress(); }
    catch { return defaultProgress(); }
  });
  const [mode, setMode] = useState("read");
  const [rate, setRate] = useState(0.85);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(SENTENCES[0]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [micStatus, setMicStatus] = useState("");
  const [recorder, setRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)), [progress]);

  const categories = useMemo(() => ["All", ...new Set(SENTENCES.map(s => s.category))], []);
  const filtered = useMemo(() => SENTENCES.filter(s => {
    const q = normalize(search);
    return (category === "All" || s.category === category) && (!q || normalize(s.english).includes(q) || normalize(s.category).includes(q));
  }), [category, search]);

  const stats = useMemo(() => {
    const now = Date.now();
    const due = SENTENCES.filter(s => progress[s.id]?.due <= now).length;
    const boxes = [1,2,3,4,5].map(b => SENTENCES.filter(s => progress[s.id]?.box === b).length);
    const correct = Object.values(progress).reduce((sum,p)=>sum+(p.correct||0),0);
    const wrong = Object.values(progress).reduce((sum,p)=>sum+(p.wrong||0),0);
    return { total: SENTENCES.length, due, boxes, correct, wrong };
  }, [progress]);

  function pickNext() {
    const now = Date.now();
    let due = filtered.filter(s => progress[s.id]?.due <= now);
    if (!due.length) due = filtered.length ? filtered : SENTENCES;
    due.sort((a,b) => progress[a.id].box - progress[b.id].box || a.id - b.id);
    setCurrent(due[0]); setAnswer(""); setFeedback(""); setAudioUrl("");
  }

  function mark(ok) {
    setProgress(old => {
      const p = old[current.id] || { box:1, due:Date.now(), correct:0, wrong:0 };
      const nextBox = ok ? Math.min(5, p.box + 1) : 1;
      return { ...old, [current.id]: { box: nextBox, due: Date.now() + intervals[nextBox]*dayMs, correct: p.correct + (ok?1:0), wrong: p.wrong + (ok?0:1) } };
    });
    setTimeout(pickNext, 100);
  }

  function checkAnswer() {
    if (mode === "blank") {
      const ok = current.answers.every(a => normalize(answer).includes(normalize(a)));
      setFeedback(ok ? "Correct." : `Not yet. Answer: ${current.answers.join(", ")}`);
      return;
    }
    const target = normalize(current.english).split(" ");
    const given = normalize(answer).split(" ");
    let matched = 0;
    target.forEach(w => { if (given.includes(w)) matched++; });
    const score = Math.round((matched / target.length) * 100);
    setFeedback(`Score: ${score}%. Correct sentence: ${current.english}`);
  }

  async function requestMic() {
    try {
      if (!navigator.mediaDevices?.getUserMedia) { setMicStatus("Microphone requires HTTPS and a supported browser."); return false; }
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
      stream.getTracks().forEach(t=>t.stop());
      setMicStatus("Microphone allowed.");
      return true;
    } catch(e) {
      setMicStatus(`Microphone blocked or unavailable: ${e.name}`);
      return false;
    }
  }

  async function startRecording() {
    setAudioUrl("");
    if (!(await requestMic())) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    mediaRecorder.ondataavailable = e => { if(e.data.size>0) chunks.push(e.data); };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type:"audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach(t=>t.stop());
      setMicStatus("Recording ready. Play it below.");
    };
    mediaRecorder.start();
    setRecorder(mediaRecorder);
    setMicStatus("Recording... press Stop when finished.");
  }

  function stopRecording() {
    if (recorder && recorder.state !== "inactive") { recorder.stop(); setRecorder(null); }
    else setMicStatus("No active recording.");
  }

  function resetProgress() {
    if (!confirm("Reset all progress?")) return;
    const fresh = defaultProgress();
    setProgress(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  }

  const words = current.english.replace(/[.,!?;:'"“”‘’]/g, "").split(/\s+/).filter(w => w.length >= 7).slice(0,8);

  return <main>
    <header><h1>Security English Pro</h1><p>Version 2.2 — 100 workplace English sentences for Security, Access Control, Radio, Emails, Phone Calls, and Interviews</p></header>
    <section className="card"><h2>Dashboard</h2><div className="stats">
      <div><b>{stats.total}</b><span>Total</span></div><div><b>{stats.due}</b><span>Due</span></div><div><b>{stats.boxes[0]}</b><span>Box 1</span></div><div><b>{stats.correct}</b><span>Correct</span></div><div><b>{stats.wrong}</b><span>Review</span></div>
    </div></section>
    <section className="card controls">
      <label>Practice Mode</label><select value={mode} onChange={e=>setMode(e.target.value)}><option value="read">Read & Repeat</option><option value="blank">Fill in the Blank</option><option value="write">Write from Memory</option><option value="fa2en">Persian to English</option></select>
      <label>Category</label><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select>
      <label>Search</label><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sentence or category..." />
      <label>Voice Speed</label><select value={rate} onChange={e=>setRate(Number(e.target.value))}><option value={0.65}>Slow 0.65x</option><option value={0.85}>Clear 0.85x</option><option value={1}>Normal 1.0x</option><option value={1.15}>Fast 1.15x</option></select>
      <button onClick={pickNext}>Start / Next Due Sentence</button><button className="secondary" onClick={resetProgress}>Reset Progress</button>
    </section>
    <section className="card lesson">
      <div className="tag">{current.category}</div><div className="box">Box {progress[current.id]?.box || 1}</div>
      <div className="audioTools"><button onClick={()=>speak(current.english, rate)}>🔊 Play Sentence</button>{words.map(w=><button className="secondary" key={w} onClick={()=>speak(w, rate)}>🔊 {w}</button>)}</div>
      {mode==="read" && <><p className="sentence">{current.english}</p><p className="persian">{current.persian}</p><p>Read it out loud 5 times. Then mark yourself.</p><button className="good" onClick={()=>mark(true)}>I remembered it</button><button className="bad" onClick={()=>mark(false)}>I forgot it</button></>}
      {mode==="blank" && <><p className="sentence">{current.blank}</p><p className="persian">{current.persian}</p><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type the missing word(s)" /><button onClick={checkAnswer}>Check</button><button className="good" onClick={()=>mark(true)}>Move Forward</button><button className="bad" onClick={()=>mark(false)}>Move Back</button></>}
      {(mode==="write" || mode==="fa2en") && <><p className="persian">{current.persian}</p><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type the full English sentence from memory" /><button onClick={checkAnswer}>Check</button><button className="secondary" onClick={()=>setFeedback(current.english)}>Show Answer</button><button className="good" onClick={()=>mark(true)}>Move Forward</button><button className="bad" onClick={()=>mark(false)}>Move Back</button></>}
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="recorder"><h3>Speaking Recorder</h3><button onClick={requestMic}>🎤 Allow Microphone</button><button onClick={startRecording}>Start Record</button><button onClick={stopRecording}>Stop</button><p>{micStatus}</p>{audioUrl && <audio controls src={audioUrl}></audio>}</div>
    </section>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
