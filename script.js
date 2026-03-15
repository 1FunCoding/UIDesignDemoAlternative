// ─── Friend data ────────────────────────────────────────────────────────────
const FRIENDS = {
  jordan: {
    initials: "JD", name: "Jordan", avatarClass: "friend-online",
    status: "online", statusLabel: "Online", dotClass: "status-online",
    activity: "CSEN 29 Homework", phone: "(408) 555-0121",
    bio: "CS major, coffee addict ☕",
    subject: "CS",
  },
  taylor: {
    initials: "TW", name: "Taylor", avatarClass: "friend-away",
    status: "away", statusLabel: "Away", dotClass: "status-away",
    activity: "Chilling", phone: "(408) 555-0132",
    bio: "Into music and hiking 🎵",
    subject: "Writing",
  },
  morgan: {
    initials: "MC", name: "Morgan", avatarClass: "friend-busy",
    status: "busy", statusLabel: "Do Not Disturb", dotClass: "status-busy",
    activity: "Study Session", phone: "(408) 555-0143",
    bio: "Pre-med, always busy 🩺",
    subject: "Biology",
  },
  alex: {
    initials: "AJ", name: "Alex", avatarClass: "friend-online",
    status: "online", statusLabel: "Online", dotClass: "status-online",
    activity: "Free", phone: "(408) 555-0154",
    bio: "Game dev enthusiast 🎮",
    subject: "Math",
  },
  sarah: {
    initials: "SM", name: "Sarah", avatarClass: "friend-offline",
    status: "away", statusLabel: "Away", dotClass: "status-away",
    activity: "In class", phone: "(408) 555-0165",
    bio: "Art and design lover 🎨",
    subject: "Art",
  },
};

const SESSION_FRIENDS = {
  max:   { initials: "MX", subject: "Math",      statusLabel: "Active",        dotClass: "status-online" },
  emily: { initials: "EM", subject: "Chemistry",  statusLabel: "Active",        dotClass: "status-online" },
  chris: { initials: "CH", subject: "History",    statusLabel: "Do Not Disturb", dotClass: "status-busy" },
  jordan:{ initials: "JD", subject: "CS",         statusLabel: "Online",        dotClass: "status-online" },
  taylor:{ initials: "TW", subject: "Writing",    statusLabel: "Away",          dotClass: "status-away" },
};

// ─── Screen navigation ───────────────────────────────────────────────────────
const screens = document.querySelectorAll(".screen");
const navTabs = document.querySelectorAll(".nav-tab");

function showScreen(id) {
  screens.forEach((s) => s.classList.toggle("active-screen", s.id === id));
  navTabs.forEach((tab) =>
    tab.classList.toggle("active", tab.getAttribute("data-screen") === id)
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navTabs.forEach((tab) =>
  tab.addEventListener("click", () => showScreen(tab.getAttribute("data-screen")))
);

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-screen-target]");
  if (btn) {
    const id = btn.getAttribute("data-screen-target");
    if (id) showScreen(id);
  }
});

// ─── Status tracking ─────────────────────────────────────────────────────────
let currentStatus = "Online";
let currentDotClass = "status-online";

const statusDots = [
  document.getElementById("home-status-dot"),
  document.getElementById("profile-status-dot"),
];

const statusLabels = [
  document.getElementById("current-status-label"),
  document.getElementById("profile-status-label"),
  document.getElementById("qs-my-status"),
];

function applyStatus(value, dotClass) {
  currentStatus = value;
  currentDotClass = dotClass;
  statusLabels.forEach((el) => { if (el) el.textContent = value; });
  statusDots.forEach((dot) => {
    if (!dot) return;
    dot.className = "status-dot " + dotClass;
  });
  // Update qs hint for self
  updateQsMyStatusHint();
}

function updateQsMyStatusHint() {
  const el = document.getElementById("qs-change-status-btn");
  if (el) {
    const mySpan = el.querySelector("#qs-my-status");
    if (mySpan) mySpan.textContent = currentStatus;
  }
}

// ─── Status modal ────────────────────────────────────────────────────────────
const statusModal = document.getElementById("status-modal");

function openStatusModal() { statusModal?.classList.remove("hidden"); }
function closeStatusModalFn() { statusModal?.classList.add("hidden"); }

document.getElementById("change-status-btn")?.addEventListener("click", openStatusModal);
document.getElementById("change-status-btn-profile")?.addEventListener("click", openStatusModal);
document.getElementById("qs-change-status-btn")?.addEventListener("click", openStatusModal);
document.getElementById("close-status-modal")?.addEventListener("click", closeStatusModalFn);
statusModal?.addEventListener("click", (e) => { if (e.target === statusModal) closeStatusModalFn(); });

document.querySelectorAll(".status-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    const value = opt.getAttribute("data-status");
    const dotClass = opt.getAttribute("data-dot");
    applyStatus(value, dotClass);
    closeStatusModalFn();
  });
});

// ─── Friend profile screen ───────────────────────────────────────────────────
let currentFriendKey = null;

function loadFriendProfile(key) {
  const f = FRIENDS[key];
  if (!f) return;
  currentFriendKey = key;
  document.getElementById("friend-profile-title").textContent = f.name + "'s Profile";
  document.getElementById("fp-avatar").textContent = f.initials;
  document.getElementById("fp-avatar").className = "avatar-circle " + f.avatarClass;
  document.getElementById("fp-status-dot").className = "status-dot " + f.dotClass;
  document.getElementById("fp-name").textContent = f.name;
  document.getElementById("fp-status-label").textContent = f.statusLabel;
  document.getElementById("fp-activity").textContent = f.activity;
  document.getElementById("fp-phone").textContent = f.phone;
  document.getElementById("fp-bio").textContent = f.bio;

  // Status hint
  const banner = document.getElementById("fp-hint-banner");
  const hintText = document.getElementById("fp-hint-text");
  setStatusHint(banner, hintText, f.status, f.name);

  document.getElementById("fp-action-result").textContent = "";
}

function setStatusHint(banner, hintText, status, name) {
  banner.className = "status-hint-banner";
  if (status === "online") {
    banner.classList.add("hint-green");
    hintText.textContent = `${name} is online and available — great time to reach out!`;
  } else if (status === "away") {
    banner.classList.add("hint-yellow");
    hintText.textContent = `${name} is away — they might respond slowly.`;
  } else if (status === "busy") {
    banner.classList.add("hint-red");
    hintText.textContent = `${name} is set to Do Not Disturb — consider scheduling instead.`;
  } else {
    banner.classList.add("hint-grey");
    hintText.textContent = `${name} is offline.`;
  }
}

document.querySelectorAll(".friend-clickable").forEach((item) => {
  item.addEventListener("click", () => {
    const key = item.getAttribute("data-friend");
    loadFriendProfile(key);
    showScreen("friend-profile-screen");
  });
});

document.getElementById("fp-call-btn")?.addEventListener("click", () => {
  const name = FRIENDS[currentFriendKey]?.name || "your friend";
  const result = document.getElementById("fp-action-result");
  result.textContent = `📞 Calling ${name}… (call screen would appear here)`;
  result.style.color = "var(--accent-green)";
});

document.getElementById("fp-message-btn")?.addEventListener("click", () => {
  const name = FRIENDS[currentFriendKey]?.name || "your friend";
  const result = document.getElementById("fp-action-result");
  result.textContent = `💬 Message sent to ${name}!`;
  result.style.color = "var(--accent-blue)";
});

document.getElementById("fp-quick-support-btn")?.addEventListener("click", () => {
  if (currentFriendKey) loadQuickSupport(currentFriendKey);
  showScreen("quick-support-screen");
});

// ─── Quick Decision Support ───────────────────────────────────────────────────
function loadQuickSupport(key) {
  const f = FRIENDS[key];
  if (!f) return;
  document.getElementById("qs-avatar").textContent = f.initials;
  document.getElementById("qs-name").textContent = f.name;
  document.getElementById("qs-status-dot").className = "status-dot " + f.dotClass;
  document.getElementById("qs-status-label").textContent = f.statusLabel;
  document.getElementById("qs-activity").textContent = f.activity;

  const banner = document.getElementById("qs-hint-banner");
  const hintText = document.getElementById("qs-hint-text");
  setStatusHint(banner, hintText, f.status, f.name);

  document.getElementById("quick-result").textContent = "";
}

document.getElementById("quick-message-btn")?.addEventListener("click", () => {
  const name = document.getElementById("qs-name")?.textContent || "your friend";
  const result = document.getElementById("quick-result");
  result.textContent = `💬 Message sent to ${name}! They'll see it when they're available.`;
  result.style.color = "var(--accent-blue)";
});

document.getElementById("quick-call-btn")?.addEventListener("click", () => {
  const name = document.getElementById("qs-name")?.textContent || "your friend";
  const result = document.getElementById("quick-result");
  result.textContent = `📞 Calling ${name}… (call screen would appear here)`;
  result.style.color = "var(--accent-green)";
});

// ─── Calendar — day navigation ───────────────────────────────────────────────
const CALENDAR_DAYS = [
  {
    label: "Sunday, Feb 1st",
    events: [
      { type: "study", title: "CSEN 79 Study Sesh", time: "9:00 AM – 11:00 AM", people: "John Doe, Sarah Smith" },
      { type: "social", title: "Trivia Night", time: "9:00 PM – 10:00 PM", people: "Jake Brown" },
    ],
  },
  {
    label: "Monday, Feb 2nd",
    events: [
      { type: "study", title: "CSEN 129 Group Work", time: "2:00 PM – 4:00 PM", people: "Alex, Jordan" },
    ],
  },
  {
    label: "Tuesday, Feb 3rd",
    events: [],
  },
  {
    label: "Wednesday, Feb 4th",
    events: [
      { type: "social", title: "Coffee Chat", time: "10:00 AM – 11:00 AM", people: "Taylor" },
      { type: "study", title: "Finals Prep", time: "6:00 PM – 9:00 PM", people: "Morgan, Emily" },
    ],
  },
  {
    label: "Thursday, Feb 5th",
    events: [
      { type: "study", title: "CSEN 175 Lab Review", time: "3:30 PM – 5:00 PM", people: "Max, Chris" },
    ],
  },
];

let currentDayIndex = 0;

function renderCalendarDay() {
  const day = CALENDAR_DAYS[currentDayIndex];
  document.getElementById("cal-day-label").textContent = day.label;
  const list = document.getElementById("event-list");
  list.innerHTML = "";
  if (day.events.length === 0) {
    const li = document.createElement("li");
    li.className = "event-row";
    li.innerHTML = `<div class="event-empty">No events — enjoy your free day!</div>`;
    list.appendChild(li);
  } else {
    day.events.forEach((ev) => {
      const li = document.createElement("li");
      li.className = "event-row";
      li.innerHTML = `
        <div class="event-pill ${ev.type}">
          <div class="event-title">${ev.title}</div>
          <div class="event-time">${ev.time} • ${ev.people}</div>
        </div>`;
      list.appendChild(li);
    });
  }
  document.getElementById("cal-prev").disabled = currentDayIndex === 0;
  document.getElementById("cal-next").disabled = currentDayIndex === CALENDAR_DAYS.length - 1;
}

document.getElementById("cal-prev")?.addEventListener("click", () => {
  if (currentDayIndex > 0) { currentDayIndex--; renderCalendarDay(); }
});
document.getElementById("cal-next")?.addEventListener("click", () => {
  if (currentDayIndex < CALENDAR_DAYS.length - 1) { currentDayIndex++; renderCalendarDay(); }
});

renderCalendarDay();

// ─── Add Activity form ───────────────────────────────────────────────────────
const selectedCalFriends = new Set();
const friendsHiddenInput = document.getElementById("activity-friends");

document.querySelectorAll("#quick-add-friends-row .friend-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const name = chip.getAttribute("data-friend");
    if (!name) return;
    if (selectedCalFriends.has(name)) {
      selectedCalFriends.delete(name);
      chip.classList.remove("active");
    } else {
      selectedCalFriends.add(name);
      chip.classList.add("active");
    }
    if (friendsHiddenInput) friendsHiddenInput.value = Array.from(selectedCalFriends).join(", ");
  });
});

document.getElementById("add-activity-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("activity-title").value.trim();
  const desc = document.getElementById("activity-desc").value.trim();
  const start = document.getElementById("activity-start").value;
  const end = document.getElementById("activity-end").value;
  const friends = friendsHiddenInput?.value || "";

  const day = CALENDAR_DAYS[currentDayIndex];
  day.events.push({
    type: "study",
    title: title || "New Activity",
    time: start && end ? `${start} – ${end}` : "Time TBD",
    people: friends || "No friends added",
  });
  renderCalendarDay();

  e.target.reset();
  selectedCalFriends.clear();
  document.querySelectorAll("#quick-add-friends-row .friend-chip").forEach((c) => c.classList.remove("active"));
  if (friendsHiddenInput) friendsHiddenInput.value = "";
});

document.getElementById("add-activity-scroll")?.addEventListener("click", () => {
  document.getElementById("add-activity-card")?.scrollIntoView({ behavior: "smooth" });
});

// ─── Poll ────────────────────────────────────────────────────────────────────
const selectedPollFriends = new Set();

document.querySelectorAll("#poll-friends-row .friend-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const name = chip.getAttribute("data-friend");
    if (!name) return;
    if (selectedPollFriends.has(name)) {
      selectedPollFriends.delete(name);
      chip.classList.remove("active");
    } else {
      selectedPollFriends.add(name);
      chip.classList.add("active");
    }
  });
});

document.getElementById("add-poll-option-btn")?.addEventListener("click", () => {
  const container = document.getElementById("poll-options-container");
  const count = container.querySelectorAll(".poll-option-input").length + 1;
  const input = document.createElement("input");
  input.className = "field-input poll-option-input";
  input.type = "text";
  input.placeholder = `Option ${count}`;
  container.appendChild(input);
});

document.getElementById("poll-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = document.getElementById("poll-question").value.trim();
  const options = Array.from(document.querySelectorAll(".poll-option-input"))
    .map((i) => i.value.trim()).filter(Boolean);
  const recipients = Array.from(selectedPollFriends);

  const result = document.getElementById("poll-result");
  if (recipients.length === 0) {
    result.textContent = "Please select at least one friend to send to.";
    result.style.color = "var(--accent-pink)";
    return;
  }
  result.textContent = `✅ Poll "${question}" sent to ${recipients.join(", ")}! (${options.length} options)`;
  result.style.color = "var(--accent-green)";
  setTimeout(() => showScreen("home-screen"), 2000);
});

// ─── Profile photo / camera ───────────────────────────────────────────────────
document.getElementById("photo-add-btn")?.addEventListener("click", () => {
  const hint = document.getElementById("photo-camera-hint");
  if (hint) {
    hint.style.display = hint.style.display === "none" ? "block" : "none";
  }
  const slots = document.querySelectorAll(".photo-slot");
  for (const slot of slots) {
    if (!slot.classList.contains("filled")) {
      slot.classList.add("filled");
      slot.style.background = "linear-gradient(135deg, #333a6b, #7a5cff44)";
      slot.textContent = "📷";
      slot.style.display = "flex";
      slot.style.alignItems = "center";
      slot.style.justifyContent = "center";
      break;
    }
  }
});

// ─── Session overlay flow ─────────────────────────────────────────────────────
const sessionOverlay = document.getElementById("session-overlay");
let selectedActivityType = "Study Session";
let selectedSubject = "History";
const sessionInvited = new Set(["Max", "Emily"]);

function showOverlayScreen(el) {
  document.querySelectorAll(".overlay-screen").forEach((s) => s.classList.remove("active"));
  el.classList.add("active");
}

document.getElementById("start-activity-btn")?.addEventListener("click", () => {
  sessionOverlay?.classList.remove("hidden");
  const screen = document.getElementById("start-activity-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("cancel-start-activity-btn")?.addEventListener("click", () => {
  sessionOverlay?.classList.add("hidden");
});

document.querySelectorAll(".activity-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectedActivityType = card.getAttribute("data-activity-type") || "Study Session";
    const titleEl = document.getElementById("start-session-title");
    if (titleEl) titleEl.textContent = `Start ${selectedActivityType}`;
    const screen = document.getElementById("start-session-screen");
    if (screen) showOverlayScreen(screen);
  });
});

document.getElementById("cancel-session-flow-btn")?.addEventListener("click", () => {
  sessionOverlay?.classList.add("hidden");
});

// Goal length
let goalSeconds = 60 * 60;
const goalLabel = document.getElementById("session-goal-label");
const goalSummary = document.getElementById("session-goal-summary");

function formatSeconds(total) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

document.querySelectorAll(".goal-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".goal-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const mins = Number(chip.getAttribute("data-minutes")) || 60;
    goalSeconds = mins * 60;
    const label = formatSeconds(goalSeconds);
    if (goalLabel) goalLabel.textContent = label;
    if (goalSummary) goalSummary.textContent = label;
  });
});

document.querySelectorAll(".type-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".type-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
  });
});

document.querySelectorAll(".subject-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".subject-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    selectedSubject = chip.getAttribute("data-subject") || "History";
  });
});

// Invite chip toggle in setup screen
document.querySelectorAll(".invite-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const name = chip.getAttribute("data-friend");
    if (!name) return;
    if (chip.getAttribute("data-status") === "busy") {
      chip.classList.toggle("chip-selected-warn");
      return;
    }
    if (sessionInvited.has(name)) {
      sessionInvited.delete(name);
      chip.classList.remove("active");
    } else {
      sessionInvited.add(name);
      chip.classList.add("active");
    }
  });
});

function buildParticipantRow() {
  const row = document.getElementById("participant-row");
  if (!row) return;
  row.innerHTML = "";

  // User chip
  const youChip = document.createElement("div");
  youChip.className = "participant-chip";
  youChip.innerHTML = `
    <div class="p-chip-inner chip-online">
      <span class="p-avatar">B</span>
      <span class="p-info"><span class="p-name">You</span><span class="p-subject">${selectedSubject}</span></span>
    </div>`;
  row.appendChild(youChip);

  sessionInvited.forEach((name) => {
    const key = name.toLowerCase();
    const sf = SESSION_FRIENDS[key] || { initials: name.substring(0, 2).toUpperCase(), subject: "—", dotClass: "status-online" };
    const chip = document.createElement("div");
    chip.className = "participant-chip";
    chip.innerHTML = `
      <div class="p-chip-inner chip-online">
        <span class="p-avatar">${sf.initials}</span>
        <span class="p-info"><span class="p-name">${name}</span><span class="p-subject">${sf.subject}</span></span>
      </div>`;
    row.appendChild(chip);
  });
}

function buildEncouragementRecipients() {
  const row = document.getElementById("encouragement-recipients");
  if (!row) return;
  row.innerHTML = "";
  sessionInvited.forEach((name) => {
    const chip = document.createElement("span");
    chip.className = "chip chip-online";
    chip.textContent = name;
    row.appendChild(chip);
  });
  if (sessionInvited.size === 0) {
    row.innerHTML = '<span class="subtle">No participants</span>';
  }
}

function buildSessionCompleteMsg() {
  const msg = document.getElementById("session-complete-msg");
  if (!msg) return;
  const names = Array.from(sessionInvited);
  if (names.length > 0) {
    msg.textContent = `Wish ${names.join(" + ")} good luck on their studies!`;
  } else {
    msg.textContent = "Great solo session! Keep up the momentum.";
  }
}

// Session timer
let sessionInterval = null;
let breakInterval = null;
let sessionStart = null;

document.getElementById("begin-session-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("study-session-screen");
  if (!screen) return;

  const typeLabel = document.getElementById("session-type-label");
  if (typeLabel) typeLabel.textContent = selectedActivityType;

  buildParticipantRow();
  showOverlayScreen(screen);

  const elapsedEl = document.getElementById("session-elapsed");
  if (sessionInterval) clearInterval(sessionInterval);
  sessionStart = Date.now();
  sessionInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - sessionStart) / 1000);
    if (elapsedEl) elapsedEl.textContent = formatSeconds(diff);
  }, 1000);

  // Update home card
  const line = document.getElementById("home-activity-line");
  if (line) line.textContent = `In ${selectedActivityType}`;
  const profLine = document.getElementById("profile-activity-line");
  if (profLine) profLine.textContent = `In ${selectedActivityType}`;
  document.getElementById("recent-activity")?.setAttribute && (document.getElementById("recent-activity").textContent = selectedActivityType);
});

// Emotes
document.querySelectorAll(".emote-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const emote = btn.getAttribute("data-emote");
    const result = document.getElementById("emote-result");
    const recipients = Array.from(sessionInvited);
    const to = recipients.length > 0 ? recipients.join(" & ") : "everyone";
    if (result) {
      result.textContent = `${emote} sent to ${to}!`;
      result.style.color = "var(--accent-green)";
      setTimeout(() => { if (result) result.textContent = ""; }, 2500);
    }
    btn.classList.add("emote-pop");
    setTimeout(() => btn.classList.remove("emote-pop"), 300);
  });
});

// Invite more
document.getElementById("invite-more-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("invite-more-screen");
  if (screen) {
    // Mark already invited
    document.querySelectorAll(".invite-friend-item").forEach((item) => {
      const name = item.getAttribute("data-friend");
      const check = item.querySelector(".invite-check");
      if (sessionInvited.has(name)) {
        item.classList.add("invited");
        if (check) check.style.opacity = "1";
      } else {
        item.classList.remove("invited");
        if (check) check.style.opacity = "0";
      }
    });
    showOverlayScreen(screen);
  }
});

document.querySelectorAll(".invite-friend-item").forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.getAttribute("data-friend");
    if (!name) return;
    const check = item.querySelector(".invite-check");
    if (item.classList.contains("invited")) {
      item.classList.remove("invited");
      sessionInvited.delete(name);
      if (check) check.style.opacity = "0";
    } else {
      item.classList.add("invited");
      sessionInvited.add(name);
      if (check) check.style.opacity = "1";
    }
  });
});

document.getElementById("cancel-invite-more-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("study-session-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("close-invite-more-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("study-session-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("confirm-invite-more-btn")?.addEventListener("click", () => {
  buildParticipantRow();
  const screen = document.getElementById("study-session-screen");
  if (screen) showOverlayScreen(screen);
});

// Break
let breakSeconds = 5 * 60;
const breakRemainingEl = document.getElementById("break-remaining");

document.querySelectorAll(".break-len-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".break-len-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    breakSeconds = Number(chip.getAttribute("data-secs")) || 300;
    if (breakRemainingEl) breakRemainingEl.textContent = formatSeconds(breakSeconds);
    if (breakInterval) { clearInterval(breakInterval); breakInterval = null; }
  });
});

document.getElementById("take-break-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("break-screen");
  if (!screen) return;
  showOverlayScreen(screen);
  breakSeconds = Number(document.querySelector(".break-len-chip.active")?.getAttribute("data-secs")) || 300;
  if (breakRemainingEl) breakRemainingEl.textContent = formatSeconds(breakSeconds);
  if (sessionInterval) clearInterval(sessionInterval);
  if (breakInterval) clearInterval(breakInterval);
  breakInterval = setInterval(() => {
    breakSeconds -= 1;
    if (breakSeconds <= 0) {
      clearInterval(breakInterval);
      breakInterval = null;
      const ss = document.getElementById("study-session-screen");
      if (ss) showOverlayScreen(ss);
      resumeSessionTimer();
      return;
    }
    if (breakRemainingEl) breakRemainingEl.textContent = formatSeconds(breakSeconds);
  }, 1000);
});

function resumeSessionTimer() {
  const elapsedEl = document.getElementById("session-elapsed");
  const current = elapsedEl?.textContent || "00:00";
  const parts = current.split(":").map(Number);
  let already = 0;
  if (parts.length === 3) already = parts[0] * 3600 + parts[1] * 60 + parts[2];
  else if (parts.length === 2) already = parts[0] * 60 + parts[1];
  const startBase = Date.now() - already * 1000;
  sessionStart = startBase;
  if (sessionInterval) clearInterval(sessionInterval);
  sessionInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - startBase) / 1000);
    if (elapsedEl) elapsedEl.textContent = formatSeconds(diff);
  }, 1000);
}

document.getElementById("skip-break-btn")?.addEventListener("click", () => {
  if (breakInterval) { clearInterval(breakInterval); breakInterval = null; }
  const ss = document.getElementById("study-session-screen");
  if (ss) showOverlayScreen(ss);
  resumeSessionTimer();
});

document.getElementById("resume-session-btn")?.addEventListener("click", () => {
  if (breakInterval) { clearInterval(breakInterval); breakInterval = null; }
  const ss = document.getElementById("study-session-screen");
  if (ss) showOverlayScreen(ss);
  resumeSessionTimer();
});

// End session → confirm screen
document.getElementById("end-session-btn")?.addEventListener("click", () => {
  const elapsedEl = document.getElementById("session-elapsed");
  const confirmEl = document.getElementById("end-confirm-elapsed");
  if (confirmEl && elapsedEl) confirmEl.textContent = elapsedEl.textContent || "00:00";
  if (sessionInterval) clearInterval(sessionInterval);
  const screen = document.getElementById("end-confirm-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("cancel-end-btn")?.addEventListener("click", () => {
  resumeSessionTimer();
  const ss = document.getElementById("study-session-screen");
  if (ss) showOverlayScreen(ss);
});

document.getElementById("confirm-end-btn")?.addEventListener("click", () => {
  const elapsedEl = document.getElementById("session-elapsed");
  const totalLabel = document.getElementById("session-total-label");
  if (elapsedEl && totalLabel) totalLabel.textContent = elapsedEl.textContent || "00:00";
  if (goalSummary) goalSummary.textContent = formatSeconds(goalSeconds);
  buildSessionCompleteMsg();
  buildEncouragementRecipients();

  const homeActivity = document.getElementById("home-activity-line");
  if (homeActivity) homeActivity.textContent = "Not in activity";
  const profActivity = document.getElementById("profile-activity-line");
  if (profActivity) profActivity.textContent = "Not in activity";

  const screen = document.getElementById("session-complete-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("close-session-flow-btn")?.addEventListener("click", () => {
  sessionOverlay?.classList.add("hidden");
  sessionInvited.clear();
  sessionInvited.add("Max");
  sessionInvited.add("Emily");
  const elapsedEl = document.getElementById("session-elapsed");
  if (elapsedEl) elapsedEl.textContent = "00:00";
});

// Encouragement
document.querySelectorAll("#send-encouragement-screen .chip[data-message]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const msg = chip.getAttribute("data-message");
    const ta = document.getElementById("encouragement-custom");
    if (msg && ta) ta.value = msg;
  });
});

document.getElementById("send-encouragement-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("send-encouragement-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("cancel-encouragement-btn")?.addEventListener("click", () => {
  const screen = document.getElementById("session-complete-screen");
  if (screen) showOverlayScreen(screen);
});

document.getElementById("send-encouragement-final-btn")?.addEventListener("click", () => {
  const text = document.getElementById("encouragement-custom")?.value.trim();
  const result = document.getElementById("encouragement-result");
  const recipients = Array.from(sessionInvited);
  const to = recipients.length > 0 ? recipients.join(" and ") : "your study partners";
  if (result) {
    result.textContent = text
      ? `✅ Sent to ${to}: "${text}"`
      : `✅ Sent encouragement to ${to}!`;
    result.style.color = "var(--accent-green)";
  }
});
