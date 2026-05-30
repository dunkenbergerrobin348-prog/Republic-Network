const publicCategories = ["Alle", "Sektor", "Missionen", "Cantina", "Technik", "Archiv"];
const unitCategories = ["Alle", "Einheitsbeitrag", "Regeln", "Bewaffnung", "Funkcodes", "Mitgliederakten", "Chat"];
const defaultCategoryPermissions = {
  Einheitsbeitrag: "user",
  Regeln: "admin",
  Bewaffnung: "admin",
  Funkcodes: "admin",
  Chat: "user",
  Mitgliederakten: "admin"
};

const units = [
  { id: "Holonet", name: "Holonet", public: true, code: "", theme: "holonet" },
  { id: "212th", name: "212th", public: false, code: "212-AX7", theme: "unit-212" },
  { id: "501st", name: "501st", public: false, code: "501-VDR", theme: "unit-501" },
  { id: "91st", name: "91st", public: false, code: "91-RCN", theme: "unit-91" },
  { id: "Fleet Crew", name: "Fleet Crew", public: false, code: "FLT-CRW", theme: "unit-fleet" },
  { id: "5th", name: "5th", public: false, code: "5TH-ARC", theme: "unit-5th" },
  { id: "Flottensicherheit", name: "Flottensicherheit", public: false, code: "SEC-5F", theme: "unit-security" }
];

const cloneRanks = [
  { group: "Generalitaet", items: [["Marshall Commander", "MCMD"], ["Senior Commander", "SCMD"]] },
  { group: "Stabsoffiziersebene", items: [["Commander", "CMD"], ["Major", "MJR"], ["Captain", "CPT"]] },
  { group: "Offiziersebene", items: [["First Lieutenant", "1LT"], ["Lieutenant", "LT"]] },
  { group: "Unteroffiziersebene", items: [["Sergeant Major", "SMJ"], ["First Sergeant", "FSGT"], ["Master Sergeant", "MSGT"], ["Sergeant", "SGT"]] },
  { group: "Obere Mannschaftsebene", items: [["First Corporal", "1CPL"], ["Chief Corporal", "CCPL"], ["Corporal", "CPL"], ["Lance Corporal", "LCPL"]] },
  { group: "Mannschaftsebene", items: [["Specialist First Class", "SFC"], ["Specialist", "SPC"], ["Private First Class", "PFC"], ["Private", "PVT"], ["Trooper", "TRP"]] },
  { group: "Ausbildung", items: [["Cadet", "C"]] }
];

const fleetRanks = [
  { group: "Admiralitaet", items: [["Admiral", "ADM"], ["Vice Admiral", "VADM"], ["Rear Admiral", "RADM"]] },
  { group: "Stabsoffiziersebene", items: [["Commodore", "CMDR"], ["Commander", "CMD"], ["Captain", "CPT"]] },
  { group: "Offiziersebene", items: [["Lieutenant-Commander", "LTCMD"], ["Lieutenant", "LT"]] },
  { group: "Unteroffiziersebene", items: [["Ensign", "ENS"], ["Midshipman", "MSM"], ["Chief Petty Officer", "CPO"], ["Senior Petty Officer", "SPO"]] },
  { group: "Obere Mannschaftsebene", items: [["Petty Officer", "PO"], ["Chief Deck Officer", "CDO"], ["Senior Deck Officer", "SDO"], ["Deck Officer", "DO"]] },
  { group: "Mannschaftsebene", items: [["Senior Crewman", "SCM"], ["Crewman", "CM"], ["Junior Crewman", "JCM"], ["Fleet Cadet", "FCT"], ["Trooper", "TRP"]] },
  { group: "Ausbildung", items: [["Cadet", "C"]] }
];

const trainingTemplates = ["Grundausbildung", "Funkdisziplin", "Taktiktraining", "Sanitaetskunde", "Techniklehrgang", "Fuehrungsfreigabe"];
const memberBoardColumns = [
  { id: "inbox", title: "Akteneingang" },
  { id: "training", title: "Ausbildung" },
  { id: "active", title: "Aktiv" },
  { id: "reserve", title: "Reserve" }
];
const labelPalette = ["Front", "Ausbildung", "Fuehrung", "Medizin", "Technik", "Disziplin", "Befoerderung", "Beobachten"];
const ownerCode = "";
const threadPageSize = 10;

const seedThreads = [
  {
    id: crypto.randomUUID(),
    unit: "Holonet",
    title: "Willkommen im Holonet",
    category: "Sektor",
    body: "Hier werden Transmissionen aus der ganzen Galaxis gesammelt. Einheitliche Bereiche sind per Registerpruefung geschuetzt.",
    tags: ["start", "holonet"],
    author: "Rat",
    createdAt: Date.now() - 1000 * 60 * 80,
    likes: 8,
    liked: false,
    saved: true,
    replies: [
      {
        id: crypto.randomUUID(),
        author: "Dana",
        body: "Die Verbindung steht. Kategorien und Suche sind fuer schnelle Sektorberichte perfekt.",
        createdAt: Date.now() - 1000 * 60 * 56
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    unit: "212th",
    title: "212th Einsatzbesprechung",
    category: "Einheitsbeitrag",
    body: "Nur bestaetigte Mitglieder der 212th erhalten Zugriff auf diesen Einsatzkanal.",
    tags: ["212th", "briefing"],
    author: "Commander Cody",
    createdAt: Date.now() - 1000 * 60 * 190,
    likes: 14,
    liked: true,
    saved: false,
    replies: []
  },
  {
    id: crypto.randomUUID(),
    unit: "501st",
    title: "501st Frontbericht",
    category: "Einheitsbeitrag",
    body: "Verschluesselte Meldung fuer registrierte Mitglieder der 501st.",
    tags: ["501st", "front"],
    author: "Captain Rex",
    createdAt: Date.now() - 1000 * 60 * 240,
    likes: 10,
    liked: false,
    saved: false,
    replies: []
  },
  {
    id: crypto.randomUUID(),
    unit: "Flottensicherheit",
    title: "Sicherheitsprotokoll Hangar 3",
    category: "Regeln",
    body: "Zugriff nur fuer bestaetigte Flottensicherheit. Unautorisierte Zugriffe werden im Register markiert.",
    tags: ["sicherheit", "hangar"],
    author: "Chief Varro",
    createdAt: Date.now() - 1000 * 60 * 320,
    likes: 3,
    liked: false,
    saved: false,
    replies: [
      {
        id: crypto.randomUUID(),
        author: "Tom",
        body: "Patrouillenplan ist aktualisiert.",
        createdAt: Date.now() - 1000 * 60 * 260
      }
    ]
  }
];

const seedThreadTitles = new Set(seedThreads.map((thread) => thread.title));

const state = {
  activeUnit: "Holonet",
  pendingUnit: null,
  category: "Alle",
  view: "home",
  memberSubView: "board",
  adminSubView: "users",
  query: "",
  selectedThreadId: null,
  user: { name: "Du", bio: "Mitglied" },
  account: null,
  adminUsers: [],
  auditEntries: [],
  threads: [],
  threadReports: [],
  threadSubscriptions: {},
  readThreads: {},
  threadLimit: threadPageSize,
  access: {},
  members: {},
  chats: {},
  memberTemplates: {},
  memberFilters: { search: "", status: "all", label: "all", training: "all" },
  selectedMemberId: null,
  activityLogs: {},
  missionReports: {},
  announcements: {},
  memberAudit: [],
  promotionRequests: [],
  rankRights: {},
  notifications: [],
  wikiPages: {},
  applications: [],
  owners: {},
  permissions: {}
};

const storageKey = "galactic-forum-local-session-v1";
const authTokenKey = "galactic-forum-auth-token";
let backendAvailable = false;
let authToken = localStorage.getItem(authTokenKey) || "";
let authMode = "login";
let eventsBound = false;

const els = {
  unitTabs: document.querySelector("#unitTabs"),
  accessPanel: document.querySelector("#accessPanel"),
  overviewPanel: document.querySelector("#overviewPanel"),
  tabs: document.querySelector("#categoryTabs"),
  threadList: document.querySelector("#threadList"),
  searchInput: document.querySelector("#searchInput"),
  newThreadButton: document.querySelector("#newThreadButton"),
  threadDialog: document.querySelector("#threadDialog"),
  threadForm: document.querySelector("#threadForm"),
  threadTitle: document.querySelector("#threadTitle"),
  threadCategory: document.querySelector("#threadCategory"),
  threadBody: document.querySelector("#threadBody"),
  threadTags: document.querySelector("#threadTags"),
  detailDialog: document.querySelector("#detailDialog"),
  detailTitle: document.querySelector("#detailTitle"),
  detailMeta: document.querySelector("#detailMeta"),
  detailBody: document.querySelector("#detailBody"),
  replyStack: document.querySelector("#replyStack"),
  replyForm: document.querySelector("#replyForm"),
  replyBody: document.querySelector("#replyBody"),
  backButton: document.querySelector("#backButton"),
  saveThreadButton: document.querySelector("#saveThreadButton"),
  profileButton: document.querySelector("#profileButton"),
  profileDialog: document.querySelector("#profileDialog"),
  profileForm: document.querySelector("#profileForm"),
  displayName: document.querySelector("#displayName"),
  profileBio: document.querySelector("#profileBio"),
  profilePassword: document.querySelector("#profilePassword"),
  profilePasswordMessage: document.querySelector("#profilePasswordMessage"),
  logoutButton: document.querySelector("#logoutButton"),
  profileInitial: document.querySelector("#profileInitial"),
  threadCount: document.querySelector("#threadCount"),
  replyCount: document.querySelector("#replyCount"),
  activeCategory: document.querySelector("#activeCategory"),
  navItems: document.querySelectorAll(".nav-item"),
  membersPanel: document.querySelector("#membersPanel"),
  chatPanel: document.querySelector("#chatPanel"),
  adminPanel: document.querySelector("#adminPanel"),
  wikiPanel: document.querySelector("#wikiPanel"),
  applicationsPanel: document.querySelector("#applicationsPanel"),
  notificationsPanel: document.querySelector("#notificationsPanel"),
  introVideo: document.querySelector("#introVideo"),
  introMovie: document.querySelector("#introMovie"),
  skipIntroButton: document.querySelector("#skipIntroButton"),
  memberDialog: document.querySelector("#memberDialog"),
  memberForm: document.querySelector("#memberForm"),
  memberDetailDialog: document.querySelector("#memberDetailDialog"),
  memberDetailBody: document.querySelector("#memberDetailBody"),
  closeMemberDetailButton: document.querySelector("#closeMemberDetailButton"),
  memberName: document.querySelector("#memberName"),
  memberSerial: document.querySelector("#memberSerial"),
  memberRank: document.querySelector("#memberRank"),
  memberTemplate: document.querySelector("#memberTemplate"),
  memberStatus: document.querySelector("#memberStatus"),
  memberLabels: document.querySelector("#memberLabels"),
  memberTrainings: document.querySelector("#memberTrainings"),
  accessDialog: document.querySelector("#accessDialog"),
  accessForm: document.querySelector("#accessForm"),
  accessTitle: document.querySelector("#accessTitle"),
  accessCopy: document.querySelector("#accessCopy"),
  accessCallsign: document.querySelector("#accessCallsign"),
  accessCode: document.querySelector("#accessCode"),
  accessError: document.querySelector("#accessError"),
  authDialog: document.querySelector("#authDialog"),
  authForm: document.querySelector("#authForm"),
  authTitle: document.querySelector("#authTitle"),
  authCopy: document.querySelector("#authCopy"),
  authUsername: document.querySelector("#authUsername"),
  authRpName: document.querySelector("#authRpName"),
  authCtNumber: document.querySelector("#authCtNumber"),
  authRpName2: document.querySelector("#authRpName2"),
  authRpName3: document.querySelector("#authRpName3"),
  authPassword: document.querySelector("#authPassword"),
  authSetupCode: document.querySelector("#authSetupCode"),
  setupCodeField: document.querySelector("#setupCodeField"),
  authError: document.querySelector("#authError"),
  authSubmit: document.querySelector("#authSubmit"),
  discordLoginButton: document.querySelector("#discordLoginButton"),
  authSwitchButton: document.querySelector("#authSwitchButton"),
  registerFields: document.querySelector("#registerFields")
};

function authHeaders() {
  return authToken ? { authorization: `Bearer ${authToken}` } : {};
}

async function apiFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...authHeaders()
    }
  });
}

async function requireLogin() {
  try {
    consumeDiscordRedirect();
    const response = await apiFetch("./api/auth/status", { cache: "no-store" });
    const payload = await response.json();
    backendAvailable = true;
    if (payload.user) {
      state.account = payload.user;
      state.user.name = payload.user.rpName || payload.user.username;
      state.user.bio = payload.user.role === "owner" ? "Account Owner" : "Mitglied";
      document.body.classList.toggle("is-owner", payload.user.role === "owner");
      if (payload.user.role !== "owner" && payload.user.status !== "approved") {
        showAuthDialog(payload.user.status === "blocked" ? "Dein Account ist gesperrt." : "Dein Account wartet auf Freischaltung durch einen Owner.");
        return false;
      }
      return true;
    }

    authMode = payload.hasUsers ? "login" : "setup";
    showAuthDialog(payload.setupLocked ? "Owner-Setup ist gesperrt. Setze auf Render die Environment-Variable OWNER_SETUP_CODE und deploye neu." : "");
    return false;
  } catch {
    backendAvailable = false;
    authMode = "offline";
    showAuthDialog("Backend nicht erreichbar. Starte die App mit npm start oder nutze die Render-URL.");
    return false;
  }
}

function consumeDiscordRedirect() {
  const params = new URLSearchParams(window.location.search);
  const discordToken = params.get("discord_token");
  const discordError = params.get("discord_error");
  if (discordToken) {
    authToken = discordToken;
    localStorage.setItem(authTokenKey, authToken);
  }
  if (discordError) {
    authMode = "login";
    showAuthDialog(`Discord Login fehlgeschlagen: ${discordError}`);
  }
  if (discordToken || discordError) {
    window.history.replaceState({}, "", window.location.pathname);
  }
}

function showAuthDialog(message = "") {
  const registerMode = authMode === "setup" || authMode === "register";
  els.authTitle.textContent = authMode === "setup" ? "Owner-Account erstellen" : authMode === "register" ? "Account erstellen" : "Login";
  els.authCopy.textContent =
    message ||
    (authMode === "setup"
      ? "Erstelle den ersten Account. Dieser Account ist der Server-Owner."
      : authMode === "register"
        ? "Erstelle deinen Republic-Network-Account mit Discord- und RP-Daten."
      : "Melde dich an, um auf das Republic Network zuzugreifen.");
  els.authSubmit.textContent = authMode === "setup" ? "Owner erstellen" : authMode === "register" ? "Account erstellen" : "Einloggen";
  els.authSwitchButton.hidden = authMode === "setup" || authMode === "offline";
  els.discordLoginButton.hidden = authMode === "setup" || authMode === "offline";
  els.authSwitchButton.textContent = authMode === "register" ? "Zum Login" : "Account erstellen";
  els.registerFields.hidden = !registerMode;
  els.setupCodeField.hidden = authMode !== "setup";
  els.authSetupCode.required = authMode === "setup";
  els.authRpName.required = registerMode;
  els.authPassword.autocomplete = registerMode ? "new-password" : "current-password";
  els.authError.textContent = "";
  els.authPassword.value = "";
  if (!els.authDialog.open) els.authDialog.showModal();
}

async function submitAuth() {
  if (authMode === "offline") return;
  const username = els.authUsername.value.trim();
  const password = els.authPassword.value;
  const endpoint = authMode === "setup" ? "./api/auth/setup" : authMode === "register" ? "./api/auth/register" : "./api/auth/login";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username,
      discordUsername: username,
      password,
      setupCode: els.authSetupCode.value.trim(),
      rpName: els.authRpName.value.trim(),
      ctNumber: els.authCtNumber.value.trim(),
      rpName2: els.authRpName2.value.trim(),
      rpName3: els.authRpName3.value.trim()
    })
  });
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    els.authError.textContent = payload.error || "Login fehlgeschlagen";
    return false;
  }

  authToken = payload.token;
  localStorage.setItem(authTokenKey, authToken);
  state.user.name = payload.user.rpName || payload.user.username;
  state.user.bio = payload.user.role === "owner" ? "Account Owner" : "Mitglied";
  state.account = payload.user;
  document.body.classList.toggle("is-owner", payload.user.role === "owner");
  if (payload.user.role !== "owner" && payload.user.status !== "approved") {
    showAuthDialog(payload.user.status === "blocked" ? "Dein Account ist gesperrt." : "Account erstellt. Bitte warte auf Freischaltung durch einen Owner.");
    return true;
  }
  els.authDialog.close();
  await loadState();
  renderThreadFormOptions();
  renderAll();
  return true;
}

async function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    state.user = parsed.user || state.user;
    state.access = parsed.access || {};
  }

  try {
    const response = await apiFetch("./api/state", { cache: "no-store" });
    if (response.ok) {
      const payload = await response.json();
      const shared = payload.state;
      backendAvailable = true;
      state.threads = shared?.threads || seedThreads;
      state.threadReports = shared?.threadReports || [];
      state.threadSubscriptions = shared?.threadSubscriptions || {};
      state.readThreads = shared?.readThreads || {};
      state.members = shared?.members || {};
      state.chats = shared?.chats || {};
      state.memberTemplates = shared?.memberTemplates || {};
      state.activityLogs = shared?.activityLogs || {};
      state.missionReports = shared?.missionReports || {};
      state.announcements = shared?.announcements || {};
      state.memberAudit = shared?.memberAudit || [];
      state.promotionRequests = shared?.promotionRequests || [];
      state.rankRights = shared?.rankRights || {};
      state.notifications = shared?.notifications || [];
      state.wikiPages = shared?.wikiPages || {};
      state.applications = shared?.applications || [];
      state.owners = {};
      state.permissions = shared?.permissions || {};
      if (!shared) saveState();
      return;
    }
  } catch {
    backendAvailable = false;
  }

  const sharedBackup = localStorage.getItem("galactic-forum-shared-backup");
  if (sharedBackup) {
    const parsed = JSON.parse(sharedBackup);
    state.threads = parsed.threads || seedThreads;
    state.threadReports = parsed.threadReports || [];
    state.threadSubscriptions = parsed.threadSubscriptions || {};
    state.readThreads = parsed.readThreads || {};
    state.members = parsed.members || {};
    state.chats = parsed.chats || {};
    state.memberTemplates = parsed.memberTemplates || {};
    state.activityLogs = parsed.activityLogs || {};
    state.missionReports = parsed.missionReports || {};
    state.announcements = parsed.announcements || {};
    state.memberAudit = parsed.memberAudit || [];
    state.promotionRequests = parsed.promotionRequests || [];
    state.rankRights = parsed.rankRights || {};
    state.notifications = parsed.notifications || [];
    state.wikiPages = parsed.wikiPages || {};
    state.applications = parsed.applications || [];
    state.owners = {};
    state.permissions = parsed.permissions || {};
    return;
  }

  state.threads = seedThreads;
}

function saveState() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      user: state.user,
      access: state.access
    })
  );

  localStorage.setItem(
    "galactic-forum-shared-backup",
    JSON.stringify({
      threads: state.threads,
      threadReports: state.threadReports,
      threadSubscriptions: state.threadSubscriptions,
      readThreads: state.readThreads,
      members: state.members,
      chats: state.chats,
      memberTemplates: state.memberTemplates,
      activityLogs: state.activityLogs,
      missionReports: state.missionReports,
      announcements: state.announcements,
      memberAudit: state.memberAudit,
      promotionRequests: state.promotionRequests,
      rankRights: state.rankRights,
      notifications: state.notifications,
      wikiPages: state.wikiPages,
      applications: state.applications,
      owners: {},
      permissions: state.permissions
    })
  );

  if (!backendAvailable) return;

  apiFetch("./api/state", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      threads: state.threads,
      threadReports: state.threadReports,
      threadSubscriptions: state.threadSubscriptions,
      readThreads: state.readThreads,
      members: state.members,
      chats: state.chats,
      memberTemplates: state.memberTemplates,
      activityLogs: state.activityLogs,
      missionReports: state.missionReports,
      announcements: state.announcements,
      memberAudit: state.memberAudit,
      promotionRequests: state.promotionRequests,
      rankRights: state.rankRights,
      notifications: state.notifications,
      wikiPages: state.wikiPages,
      applications: state.applications,
      owners: {},
      permissions: state.permissions
    })
  }).catch(() => {
    backendAvailable = false;
  });
}

function formatTime(timestamp) {
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `vor ${minutes} Min.`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  return `vor ${Math.round(hours / 24)} Tagen`;
}

function getUnit(unitId) {
  return units.find((unit) => unit.id === unitId);
}

function hasAccess(unitId) {
  const unit = getUnit(unitId);
  return Boolean(unit?.public || state.account?.role === "owner" || state.account?.unitAccess?.includes(unitId) || state.access[unitId]);
}

function getRankGroups(unitId) {
  return unitId === "Fleet Crew" ? fleetRanks : cloneRanks;
}

function getCategories() {
  return state.activeUnit === "Holonet" ? publicCategories : unitCategories;
}

function getFlatRanks(unitId) {
  return getRankGroups(unitId).flatMap((group) => group.items.map(([name, code]) => ({ name, code, group: group.group })));
}

function getMembers(unitId = state.activeUnit) {
  return state.members[unitId] || [];
}

function getMemberTemplates(unitId = state.activeUnit) {
  state.memberTemplates[unitId] ||= [
    {
      id: crypto.randomUUID(),
      name: "Standard Personalakte",
      rankCode: getFlatRanks(unitId).at(-1)?.code || "C",
      status: "inbox",
      labels: ["Ausbildung"],
      trainings: trainingTemplates.map((name) => ({ name, done: false })),
      notes: "Grunddaten pruefen und Einweisung terminieren.",
      warnings: "",
      awards: "",
      history: ""
    }
  ];
  return state.memberTemplates[unitId];
}

function getChatMessages(unitId = state.activeUnit) {
  return state.chats[unitId] || [];
}

function getActivityLogs(unitId = state.activeUnit) {
  state.activityLogs[unitId] ||= [];
  return state.activityLogs[unitId];
}

function getMissionReports(unitId = state.activeUnit) {
  state.missionReports[unitId] ||= [];
  return state.missionReports[unitId];
}

function getAnnouncements(unitId = state.activeUnit) {
  state.announcements[unitId] ||= [];
  return state.announcements[unitId];
}

function getPromotionRequests(unitId = state.activeUnit) {
  return state.promotionRequests.filter((request) => request.unit === unitId);
}

function setMembers(unitId, members) {
  state.members[unitId] = members;
  saveState();
}

function setMemberTemplates(unitId, templates) {
  state.memberTemplates[unitId] = templates;
  saveState();
}

function normalizeTrainings(member, unitId = state.activeUnit) {
  const trainings = Array.isArray(member.trainings) ? member.trainings : [];
  const merged = [...trainings];
  trainingTemplates.forEach((name) => {
    if (!merged.some((training) => training.name === name)) merged.push({ name, done: false });
  });
  return {
    ...member,
    status: member.status || "active",
    labels: Array.isArray(member.labels) ? member.labels : [],
    trainings: merged,
    rankCode: member.rankCode || getFlatRanks(unitId).at(-1)?.code || "C"
  };
}

function setChatMessages(unitId, messages) {
  state.chats[unitId] = messages;
  saveState();
}

function deleteThread(threadId) {
  state.threads = state.threads.filter((thread) => thread.id !== threadId);
  saveState();
  renderAll();
}

function deleteMember(memberId) {
  setMembers(
    state.activeUnit,
    getMembers().filter((member) => member.id !== memberId)
  );
  renderMembersPanel();
  renderStats([]);
}

function deleteChatMessage(messageId) {
  setChatMessages(
    state.activeUnit,
    getChatMessages().filter((message) => message.id !== messageId)
  );
  renderChatPanel();
  renderStats([]);
}

function parseList(value) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function serialExists(serial, ignoreId = "") {
  const normalized = normalizeName(serial);
  return Object.values(state.members)
    .flat()
    .some((member) => member.id !== ignoreId && normalizeName(member.serial || "") === normalized);
}

function logMemberAudit(action, member, details = "") {
  state.memberAudit.unshift({
    id: crypto.randomUUID(),
    unit: state.activeUnit,
    action,
    member: member?.name || "",
    serial: member?.serial || "",
    details,
    actor: state.user.name,
    createdAt: Date.now()
  });
  state.memberAudit = state.memberAudit.slice(0, 160);
}

function addUnitNotification(title, body, unitId = state.activeUnit) {
  addNotification(title, body, unitId);
}

function createMemberFromTemplate(template, name, serial) {
  return {
    id: crypto.randomUUID(),
    name,
    serial,
    rankCode: template.rankCode || getFlatRanks(state.activeUnit).at(-1)?.code || "C",
    status: template.status || "inbox",
    labels: Array.isArray(template.labels) ? [...template.labels] : [],
    trainings: (template.trainings || trainingTemplates.map((training) => ({ name: training, done: false }))).map((training) => ({ ...training, done: Boolean(training.done) })),
    notes: template.notes || "",
    warnings: template.warnings || "",
    awards: template.awards || "",
    history: template.history || "",
    createdAt: Date.now()
  };
}

function exportJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function clearSeedData() {
  state.threads = state.threads.filter((thread) => !seedThreadTitles.has(thread.title));
  saveState();
  renderAll();
}

function addNotification(title, body, unit = "Holonet") {
  state.notifications.unshift({ id: crypto.randomUUID(), title, body, unit, createdAt: Date.now(), read: false });
  state.notifications = state.notifications.slice(0, 60);
  saveState();
}

function wikiKey(unitId = state.activeUnit, category = state.category) {
  return `${unitId}::${category}`;
}

function getWikiPage() {
  const key = wikiKey();
  state.wikiPages[key] ||= {
    title: `${state.category} - ${state.activeUnit}`,
    body: "Noch keine offizielle Seite hinterlegt.",
    updatedBy: "System",
    updatedAt: Date.now()
  };
  return state.wikiPages[key];
}

function setWikiPage(body) {
  state.wikiPages[wikiKey()] = {
    title: `${state.category} - ${state.activeUnit}`,
    body,
    updatedBy: state.user.name,
    updatedAt: Date.now()
  };
  addNotification("Wiki aktualisiert", `${state.activeUnit}: ${state.category} wurde aktualisiert.`);
  saveState();
}

function rankLabel(rank) {
  return `${rank.name} (${rank.code})`;
}

function normalizeName(value) {
  return value.trim().toLowerCase();
}

function isOwner(unitId = state.activeUnit) {
  return state.account?.role === "owner";
}

function canManageAccounts() {
  return ["owner", "admin"].includes(state.account?.role);
}

function getUserPermissions(unitId = state.activeUnit) {
  if (isOwner(unitId)) return { records: true, promote: true, rights: true };
  const direct = state.permissions[unitId]?.[normalizeName(state.user.name)];
  if (direct) return direct;
  const member = getMembers(unitId).find((item) => normalizeName(item.name) === normalizeName(state.user.name));
  const rankRights = member ? state.rankRights[unitId]?.[member.rankCode] : null;
  return rankRights || { records: false, promote: false, rights: false };
}

function roleRank(role) {
  return { user: 1, member: 1, admin: 2, owner: 3 }[role] || 1;
}

function getCategoryPermissions(unitId = state.activeUnit) {
  state.permissions.categoryRules ||= {};
  state.permissions.categoryRules[unitId] ||= { ...defaultCategoryPermissions };
  return state.permissions.categoryRules[unitId];
}

function canCreateInCurrentCategory() {
  if (state.activeUnit === "Holonet") return true;
  if (state.category === "Alle") return true;
  const required = getCategoryPermissions()[state.category] || "user";
  return roleRank(state.account?.role) >= roleRank(required);
}

function canManageRecords() {
  return getUserPermissions().records;
}

function canPromoteMembers() {
  return getUserPermissions().promote;
}

function setPermission(unitId, callsign, key, value) {
  const normalized = normalizeName(callsign);
  state.permissions[unitId] ||= {};
  state.permissions[unitId][normalized] ||= { records: false, promote: false, rights: false };
  state.permissions[unitId][normalized][key] = value;
  saveState();
}

function getFilteredThreads() {
  const query = state.query.trim().toLowerCase();
  return state.threads
    .map(normalizeThread)
    .filter((thread) => thread.unit === state.activeUnit)
    .filter((thread) => state.category === "Alle" || thread.category === state.category)
    .filter((thread) => {
      if (state.view === "popular") return thread.likes >= 5 || thread.replies.length > 0;
      if (state.view === "saved") return thread.saved;
      return true;
    })
    .filter((thread) => {
      if (!query) return true;
      const haystack = [
        thread.title,
        thread.body,
        thread.category,
        thread.locked ? "geschlossen locked" : "",
        thread.pinned ? "wichtig pinned" : "",
        thread.unit,
        thread.author,
        thread.tags.join(" "),
        thread.replies.map((reply) => reply.body).join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt - a.createdAt);
}

function normalizeThread(thread) {
  return {
    ...thread,
    reactions: { Signal: thread.likes || 0, Bestaetigt: 0, Frage: 0, ...(thread.reactions || {}) },
    subscribers: Array.isArray(thread.subscribers) ? thread.subscribers : [],
    reports: Array.isArray(thread.reports) ? thread.reports : [],
    pinned: Boolean(thread.pinned),
    locked: Boolean(thread.locked),
    editedAt: thread.editedAt || null
  };
}

function canModerateThread(thread) {
  return isOwner() || state.account?.role === "admin" || thread.author === state.user.name;
}

function notifyThreadSubscribers(thread, body) {
  (thread.subscribers || []).filter((name) => name !== state.user.name).forEach((name) => {
    state.notifications.unshift({ id: crypto.randomUUID(), title: `Thread: ${thread.title}`, body, unit: thread.unit, target: name, createdAt: Date.now(), read: false });
  });
  state.notifications = state.notifications.slice(0, 80);
}

function renderUnitTabs() {
  els.unitTabs.innerHTML = units
    .map((unit) => {
      const active = unit.id === state.activeUnit ? " active" : "";
      const locked = !hasAccess(unit.id) ? " locked" : "";
      const marker = unit.public || hasAccess(unit.id) ? "" : " <span>LOCK</span>";
      return `<button class="unit-tab ${unit.theme}${active}${locked}" data-unit="${unit.id}"><i></i>${unit.name}${marker}</button>`;
    })
    .join("");
}

function renderAccessPanel() {
  const unit = getUnit(state.activeUnit);
  const access = state.access[state.activeUnit];
  const pinned = getAnnouncements(state.activeUnit).slice(0, 2);
  if (unit.public) {
    const unread = state.notifications.filter((note) => !note.read).length;
    els.accessPanel.innerHTML = `<div class="breadcrumb">${escapeHtml(state.activeUnit)} > ${escapeHtml(state.category)} > ${escapeHtml(state.view)}</div><strong>Offener Holonet-Kanal</strong><span>${unread ? unread + " neue Benachrichtigungen" : "Einheitsbereiche erfordern eine Registerpruefung."}</span>`;
    return;
  }
  els.accessPanel.innerHTML = `<div class="breadcrumb">${escapeHtml(state.activeUnit)} > ${escapeHtml(state.category)} > ${state.category === "Mitgliederakten" ? escapeHtml(state.memberSubView) : escapeHtml(state.view)}</div><strong>${escapeHtml(unit.name)} Zugriff bestaetigt</strong><span>${escapeHtml(access.callsign)} - Register ${escapeHtml(access.code)} - Rolle ${escapeHtml(state.account?.role || "user")}</span>${
    pinned.length ? `<div class="pinned-stack">${pinned.map((item) => `<p><b>${escapeHtml(item.title)}</b> ${escapeHtml(item.body)}</p>`).join("")}</div>` : ""
  }`;
}

function renderOverviewPanel() {
  const isForumHome = state.view === "home" && state.activeUnit === "Holonet" && state.category === "Alle";
  if (!isForumHome) {
    els.overviewPanel.innerHTML = "";
    return;
  }
  const unitsWithAccess = units.filter((unit) => !unit.public && hasAccess(unit.id));
  const openApps = state.applications.filter((application) => !["angenommen", "abgelehnt"].includes(application.status));
  const openPromotions = state.promotionRequests.filter((request) => request.status === "offen");
  const unread = state.notifications.filter((note) => !note.read).length;
  const latestMissions = Object.entries(state.missionReports)
    .flatMap(([unit, reports]) => reports.map((report) => ({ ...report, unit })))
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);
  els.overviewPanel.innerHTML = `
    <section class="home-dashboard">
      <header>
        <div>
          <strong>Kommandouebersicht</strong>
          <span>${escapeHtml(state.user.name)} - ${escapeHtml(state.account?.role || "user")}</span>
        </div>
      </header>
      <div class="dashboard-strip">
        <div><strong>${unitsWithAccess.length}</strong><span>Einheiten</span></div>
        <div><strong>${openApps.length}</strong><span>Bewerbungen</span></div>
        <div><strong>${openPromotions.length}</strong><span>Befoerderungen</span></div>
        <div><strong>${unread}</strong><span>Info</span></div>
      </div>
      <div class="quick-actions">
        ${unitsWithAccess.slice(0, 4).map((unit) => `<button class="chip-button" data-jump-unit="${unit.id}" type="button">${unit.name}</button>`).join("")}
        <button class="chip-button" data-jump-view="notifications" type="button">Info</button>
        ${canManageAccounts() ? `<button class="chip-button" data-jump-view="admin" type="button">Admin</button>` : ""}
      </div>
      <div class="command-lists">
        <div><strong>Letzte Missionen</strong>${latestMissions.length ? latestMissions.map((report) => `<p>${escapeHtml(report.unit)}: ${escapeHtml(report.title)}</p>`).join("") : `<p>Keine Missionsberichte.</p>`}</div>
        <div><strong>Offene Punkte</strong><p>${openPromotions.length} Befoerderungsantraege, ${openApps.length} Bewerbungen, ${unread} Benachrichtigungen.</p></div>
      </div>
    </section>
  `;
}

function renderTabs() {
  els.tabs.innerHTML = getCategories()
    .map((category) => {
      const active = category === state.category ? " active" : "";
      return `<button class="tab${active}" data-category="${category}">${category}</button>`;
    })
    .join("");
}

function renderThreadFormOptions() {
  els.threadCategory.innerHTML = getCategories()
    .filter((category) => category !== "Alle" && category !== "Mitgliederakten" && category !== "Chat")
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

function renderMemberRankOptions() {
  const ranks = getRankGroups(state.activeUnit);
  els.memberRank.innerHTML = ranks
    .map(
      (group) => `
        <optgroup label="${escapeHtml(group.group)}">
          ${group.items.map(([name, code]) => `<option value="${code}">${escapeHtml(name)} (${escapeHtml(code)})</option>`).join("")}
        </optgroup>
      `
    )
    .join("");
}

function renderMemberTemplateOptions() {
  if (!els.memberTemplate) return;
  els.memberTemplate.innerHTML = `<option value="">Ohne Vorlage</option>${getMemberTemplates()
    .map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`)
    .join("")}`;
}

function renderStats(threads) {
  const memberMode = state.activeUnit !== "Holonet" && state.category === "Mitgliederakten";
  const chatMode = state.activeUnit !== "Holonet" && state.category === "Chat";
  els.threadCount.textContent = memberMode ? String(getMembers().length) : chatMode ? String(getChatMessages().length) : String(threads.length);
  els.replyCount.textContent = memberMode
    ? String(getMembers().filter((member) => member.trainings.every((training) => training.done)).length)
    : chatMode
      ? String(new Set(getChatMessages().map((message) => message.author)).size)
      : String(threads.reduce((sum, thread) => sum + thread.replies.length, 0));
  els.activeCategory.textContent = memberMode ? "Akten" : chatMode ? "Chat" : state.view === "home" ? state.activeUnit : state.view === "popular" ? "Beliebt" : "Gemerkte";
  els.profileInitial.textContent = state.user.name.slice(0, 1).toUpperCase();
}

function renderThreads() {
  if (["admin", "notifications"].includes(state.view)) {
    renderStats([]);
    els.threadList.innerHTML = "";
    return;
  }

  if (state.view === "home" && state.activeUnit === "Holonet" && state.category === "Alle") {
    renderStats([]);
    els.threadList.innerHTML = "";
    return;
  }

  if (state.activeUnit !== "Holonet" && (state.category === "Mitgliederakten" || state.category === "Chat" || ["Regeln", "Bewaffnung", "Funkcodes"].includes(state.category))) {
    renderStats([]);
    els.threadList.innerHTML = "";
    return;
  }

  const threads = getFilteredThreads();
  renderStats(threads);
  const visibleThreads = threads.slice(0, state.threadLimit);
  const hasMoreThreads = visibleThreads.length < threads.length;

  if (!threads.length) {
    els.threadList.innerHTML = `<div class="empty-state">Keine passenden Transmissionen in ${escapeHtml(state.activeUnit)} gefunden.</div>`;
    return;
  }

  els.threadList.innerHTML = visibleThreads
    .map(
      (thread) => `
        <article class="thread-card ${thread.pinned ? "pinned" : ""} ${thread.locked ? "locked" : ""} ${state.readThreads[thread.id] ? "" : "unread"}" data-thread-id="${thread.id}">
          <header>
            <div>
              <h3>${thread.pinned ? "[PIN] " : ""}${thread.locked ? "[ZU] " : ""}${escapeHtml(thread.title)}</h3>
              <div class="meta-row">
                <span>${escapeHtml(thread.unit)}</span>
                <span>${escapeHtml(thread.category)}</span>
                <span>${escapeHtml(thread.author)}</span>
                <span>${formatTime(thread.createdAt)}</span>
                ${thread.editedAt ? `<span>bearbeitet ${formatTime(thread.editedAt)}</span>` : ""}
              </div>
            </div>
            <button class="ghost-icon-button save-button" data-action="save" aria-label="Merken">${thread.saved ? "+" : "-"}</button>
          </header>
          <p>${escapeHtml(thread.body)}</p>
          <div class="tag-row">
            ${thread.tags.map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="action-row">
            <button class="chip-button ${thread.liked ? "liked" : ""}" data-action="like">Signal ${thread.reactions.Signal || 0}</button>
            <button class="chip-button" data-action="react-confirm">Bestaetigt ${thread.reactions.Bestaetigt || 0}</button>
            <button class="chip-button" data-action="react-question">Frage ${thread.reactions.Frage || 0}</button>
            <button class="chip-button" data-action="open">Antworten ${thread.replies.length}</button>
            <button class="chip-button" data-action="subscribe">${thread.subscribers.includes(state.user.name) ? "Abo aus" : "Abo"}</button>
            <button class="chip-button danger" data-action="report">Melden</button>
            ${canModerateThread(thread) ? `<button class="chip-button" data-action="edit">Bearbeiten</button>` : ""}
            ${isOwner() || state.account?.role === "admin" ? `<button class="chip-button" data-action="pin">${thread.pinned ? "Entpinnen" : "Pinnen"}</button><button class="chip-button" data-action="lock">${thread.locked ? "Oeffnen" : "Schliessen"}</button><button class="chip-button danger" data-action="delete">Loeschen</button>` : ""}
          </div>
        </article>
      `
    )
    .join("") + (hasMoreThreads ? `<button class="chip-button load-more-button" id="loadMoreThreadsButton" type="button">Mehr laden (${visibleThreads.length}/${threads.length})</button>` : "");
}

function renderMembersPanel() {
  if (state.view === "admin" || state.activeUnit === "Holonet" || state.category !== "Mitgliederakten") {
    els.membersPanel.innerHTML = "";
    return;
  }

  const allMembers = getMembers().map((member) => normalizeTrainings(member));
  const filter = state.memberFilters;
  const members = allMembers.filter((member) => {
    const haystack = [member.name, member.serial, member.rankCode, member.absentUntil ? "abwesend" : "", ...(member.labels || []), member.rpProfile || "", member.specialization || ""].join(" ").toLowerCase();
    const matchesSearch = !filter.search || haystack.includes(filter.search.toLowerCase());
    const matchesStatus = filter.status === "all" || member.status === filter.status;
    const matchesLabel = filter.label === "all" || member.labels?.includes(filter.label);
    const hasOpenTraining = member.trainings.some((training) => !training.done);
    const matchesTraining = filter.training === "all" || (filter.training === "open" ? hasOpenTraining : !hasOpenTraining);
    return matchesSearch && matchesStatus && matchesLabel && matchesTraining;
  });
  if (JSON.stringify(allMembers) !== JSON.stringify(getMembers())) state.members[state.activeUnit] = allMembers;
  const templates = getMemberTemplates();
  const labels = [...new Set(allMembers.flatMap((member) => member.labels || []))];
  const activities = getActivityLogs();
  const missions = getMissionReports();
  const announcements = getAnnouncements();
  const rankMap = Object.fromEntries(getFlatRanks(state.activeUnit).map((rank) => [rank.code, rank]));
  const rights = getUserPermissions();
  const permissionMap = state.permissions[state.activeUnit] || {};
  const memberTabs = [["board", "Board"], ["akten", "Akten"], ["vorlagen", "Vorlagen"], ["missionen", "Missionen"], ["aktivitaet", "Aktivitaet"], ["rechte", "Rechte"]];
  const visibleColumns = state.memberSubView === "akten" ? [{ id: "all", title: "Akten" }] : memberBoardColumns;

  els.membersPanel.innerHTML = `
    <div class="members-header">
      <div>
        <strong>${escapeHtml(state.activeUnit)} Mitgliederliste</strong>
        <span>${members.length} Personalakten - Board, Labels, Vorlagen und Fortbildungen</span>
      </div>
      ${canManageRecords() ? `<button class="chip-button" id="addMemberButton" type="button">Akte +</button>` : ""}
    </div>
    <nav class="sub-tabs" aria-label="Mitgliederakten Ansicht">
      ${memberTabs.map(([id, label]) => `<button class="sub-tab ${state.memberSubView === id ? "active" : ""}" data-member-subview="${id}" type="button">${label}</button>`).join("")}
    </nav>
    <section class="command-panel">
      <section class="unit-dashboard">
        <div><strong>${allMembers.length}</strong><span>Personalakten</span></div>
        <div><strong>${allMembers.filter((member) => normalizeTrainings(member).trainings.some((training) => !training.done)).length}</strong><span>offene Fortbildungen</span></div>
        <div><strong>${allMembers.filter((member) => member.absentUntil).length}</strong><span>abwesend</span></div>
        <div><strong>${getPromotionRequests().filter((request) => request.status === "offen").length}</strong><span>Befoerderungsantraege</span></div>
      </section>
      <div class="quick-filter-row">
        <button class="chip-button ${filter.training === "open" ? "active" : ""}" data-quick-filter="open-training" type="button">Offene Fortbildungen</button>
        <button class="chip-button ${filter.status === "training" ? "active" : ""}" data-quick-filter="training" type="button">Ausbildung</button>
        <button class="chip-button ${filter.status === "active" ? "active" : ""}" data-quick-filter="active" type="button">Aktiv</button>
        <button class="chip-button" data-quick-filter="absent" type="button">Abwesend</button>
        <button class="chip-button" data-quick-filter="reset" type="button">Reset</button>
      </div>
      <div class="member-filters">
        <input id="memberSearchInput" value="${escapeHtml(filter.search)}" placeholder="Akten suchen: Name, CT, Rang, Label" />
        <select id="memberStatusFilter">
          <option value="all">Alle Spalten</option>
          ${memberBoardColumns.map((column) => `<option value="${column.id}" ${filter.status === column.id ? "selected" : ""}>${column.title}</option>`).join("")}
        </select>
        <select id="memberLabelFilter">
          <option value="all">Alle Labels</option>
          ${labels.map((label) => `<option value="${escapeHtml(label)}" ${filter.label === label ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
        </select>
        <select id="memberTrainingFilter">
          <option value="all">Alle Fortbildungen</option>
          <option value="open" ${filter.training === "open" ? "selected" : ""}>Offene Fortbildungen</option>
          <option value="done" ${filter.training === "done" ? "selected" : ""}>Alles erledigt</option>
        </select>
      </div>
      <div class="command-grid">
        <form id="announcementForm" class="mini-form">
          <strong>Bekanntmachung</strong>
          <input id="announcementTitle" required maxlength="50" placeholder="Titel" />
          <textarea id="announcementBody" required maxlength="220" rows="2" placeholder="Befehl oder Hinweis"></textarea>
          <button class="chip-button" type="submit">Fixieren</button>
        </form>
        <form id="missionForm" class="mini-form">
          <strong>Missionsbericht</strong>
          <input id="missionTitle" required maxlength="60" placeholder="Mission" />
          <input id="missionMembers" maxlength="160" placeholder="Teilnehmer, mit Komma getrennt" />
          <textarea id="missionResult" required maxlength="360" rows="2" placeholder="Ergebnis, besondere Leistungen"></textarea>
          <button class="chip-button" type="submit">Bericht sichern</button>
        </form>
        <form id="activityForm" class="mini-form">
          <strong>Aktivitaetslog</strong>
          <input id="activityMember" required maxlength="40" placeholder="Mitglied / CT" />
          <select id="activityType">
            <option>Training</option>
            <option>Mission</option>
            <option>Abmeldung</option>
            <option>Verwarnung</option>
            <option>Befoerderungsantrag</option>
          </select>
          <textarea id="activityNote" required maxlength="240" rows="2" placeholder="Eintrag / Begruendung"></textarea>
          <button class="chip-button" type="submit">Eintragen</button>
        </form>
      </div>
      <div class="command-lists">
        <div><strong>Fixiert</strong>${announcements.length ? announcements.slice(0, 3).map((item) => `<p>${escapeHtml(item.title)} - ${escapeHtml(item.body)}</p>`).join("") : `<p>Keine Bekanntmachungen.</p>`}</div>
        <div><strong>Letzte Missionen</strong>${missions.length ? missions.slice(0, 3).map((item) => `<p>${escapeHtml(item.title)} - ${escapeHtml(item.result)}</p>`).join("") : `<p>Keine Berichte.</p>`}</div>
        <div><strong>Aktivitaet</strong>${activities.length ? activities.slice(0, 4).map((item) => `<p>${escapeHtml(item.member)}: ${escapeHtml(item.type)} - ${escapeHtml(item.note)}</p>`).join("") : `<p>Keine Eintraege.</p>`}</div>
      </div>
      <div class="action-row">
        <button class="chip-button" id="exportMembersButton" type="button">CSV Export</button>
        <button class="chip-button" id="exportUnitBackupButton" type="button">Einheit Backup</button>
      </div>
    </section>
    ${
      isOwner() && members.length
        ? `<section class="rights-panel">
            <strong>Rechteverwaltung</strong>
            <button class="chip-button danger" id="clearSeedDataButton" type="button">Testdaten bereinigen</button>
            <div class="category-rules">
              <strong>Thread-Rechte</strong>
              ${unitCategories
                .filter((category) => !["Alle", "Mitgliederakten", "Chat"].includes(category))
                .map(
                  (category) => `
                    <label>${category}
                      <select data-category-rule="${category}">
                        ${["user", "admin", "owner"].map((role) => `<option value="${role}" ${getCategoryPermissions()[category] === role ? "selected" : ""}>${role}</option>`).join("")}
                      </select>
                    </label>
                  `
                )
                .join("")}
            </div>
            <div class="category-rules">
              <strong>Rang-Rechte Matrix</strong>
              ${getFlatRanks(state.activeUnit)
                .map((rank) => {
                  const rankRight = state.rankRights[state.activeUnit]?.[rank.code] || { records: false, promote: false };
                  return `
                    <div class="rights-row" data-rank-code="${rank.code}">
                      <span>${escapeHtml(rank.code)}</span>
                      <label><input type="checkbox" data-rank-right="records" ${rankRight.records ? "checked" : ""} /> Akten</label>
                      <label><input type="checkbox" data-rank-right="promote" ${rankRight.promote ? "checked" : ""} /> Rang</label>
                    </div>
                  `;
                })
                .join("")}
            </div>
            ${members
              .map((member) => {
                const key = normalizeName(member.name);
                const memberRights = permissionMap[key] || { records: false, promote: false };
                return `
                  <div class="rights-row" data-rights-name="${escapeHtml(member.name)}">
                    <span>${escapeHtml(member.name)}</span>
                    <label><input type="checkbox" data-right="records" ${memberRights.records ? "checked" : ""} /> Akten</label>
                    <label><input type="checkbox" data-right="promote" ${memberRights.promote ? "checked" : ""} /> Rang</label>
                  </div>
                `;
              })
              .join("")}
          </section>`
        : ""
    }
    ${
      canManageRecords()
        ? `<section class="template-panel">
            <header>
              <div>
                <strong>Vorgemerkte Karteikarten</strong>
                <span>Vorlagen kopieren oder aus bestehenden Akten sichern.</span>
              </div>
            </header>
            <div class="template-strip">
              ${templates
                .map(
                  (template) => `
                    <article class="template-card" data-template-id="${template.id}">
                      <strong>${escapeHtml(template.name)}</strong>
                      <span>${escapeHtml(rankLabel(rankMap[template.rankCode] || getFlatRanks(state.activeUnit).at(-1)))}</span>
                      <div class="label-row">${(template.labels || []).map((label) => `<small class="member-label">${escapeHtml(label)}</small>`).join("")}</div>
                      <button class="chip-button" data-template-copy="${template.id}" type="button">Kopieren</button>
                    </article>
                  `
                )
                .join("")}
            </div>
            <form class="template-form" id="templateForm">
              <input id="templateName" required maxlength="36" placeholder="Vorlagenname" />
              <input id="templateLabels" maxlength="80" placeholder="Labels, z.B. Medic, ARC, Beobachten" />
              <textarea id="templateTrainings" rows="3" maxlength="260" placeholder="Fortbildungen, eine pro Zeile"></textarea>
              <button class="primary-button" type="submit">Vorlage anlegen</button>
            </form>
          </section>`
        : ""
    }
    ${
      members.length
        ? `<div class="member-board">
            ${visibleColumns
              .map((column) => {
                const columnMembers = column.id === "all" ? members : members.filter((member) => member.status === column.id);
                return `
                  <section class="member-column">
                    <header><strong>${column.title}</strong><span>${columnMembers.length}</span></header>
                    <div class="member-column-list">
                      ${
                        columnMembers.length
                          ? columnMembers
                              .map((member) => {
                                const rank = rankMap[member.rankCode] || getFlatRanks(state.activeUnit).at(-1);
                                return `
                                  <article class="member-card dossier" data-member-id="${member.id}">
                                    <header>
                                      <div>
                                        <h3>${escapeHtml(member.name)}</h3>
                                        <span>${escapeHtml(member.serial)} - ${escapeHtml(rankLabel(rank))}</span>
                                      </div>
                                      <b>${escapeHtml(column.title)}</b>
                                    </header>
                                    <div class="label-row">
                                      ${member.labels.map((label) => `<small class="member-label">${escapeHtml(label)}</small>`).join("")}
                                    </div>
                                    ${
                                      member.absentUntil
                                        ? `<p class="absence-badge">Abwesend bis ${escapeHtml(member.absentUntil)}</p>`
                                        : ""
                                    }
                                    ${
                                      canManageRecords()
                                        ? `<label class="compact-field">Spalte
                                            <select data-member-status>
                                              ${memberBoardColumns.map((option) => `<option value="${option.id}" ${member.status === option.id ? "selected" : ""}>${option.title}</option>`).join("")}
                                            </select>
                                          </label>
                                          <label class="compact-field">Abmeldung bis
                                            <input data-member-absence type="date" value="${escapeHtml(member.absentUntil || "")}" />
                                          </label>`
                                        : ""
                                    }
                                    <div class="training-list">
                                      ${member.trainings
                                        .map(
                                          (training) => `
                                            <label class="training-item">
                                              <input type="checkbox" data-training="${escapeHtml(training.name)}" ${training.done ? "checked" : ""} />
                                              <span>${escapeHtml(training.name)}</span>
                                            </label>
                                          `
                                        )
                                        .join("")}
                                    </div>
                                    ${
                                      canManageRecords()
                                        ? `<form class="inline-add-form" data-training-form>
                                            <input maxlength="48" placeholder="Fortbildung manuell eintragen" />
                                            <button class="chip-button" type="submit">+</button>
                                          </form>
                                          <form class="inline-add-form" data-label-form>
                                            <input maxlength="24" placeholder="Label hinzufuegen" list="labelOptions" />
                                            <button class="chip-button" type="submit">+</button>
                                          </form>`
                                        : ""
                                    }
                                    <div class="record-fields">
                                      <label>RP Profil<textarea data-member-note="rpProfile" rows="2">${escapeHtml(member.rpProfile || "")}</textarea></label>
                                      <label>Spezialisierung / Ausruestung<textarea data-member-note="specialization" rows="2">${escapeHtml(member.specialization || "")}</textarea></label>
                                      <label>Notizen<textarea data-member-note="notes" rows="2">${escapeHtml(member.notes || "")}</textarea></label>
                                      <label>Verwarnungen<textarea data-member-note="warnings" rows="2">${escapeHtml(member.warnings || "")}</textarea></label>
                                      <label>Auszeichnungen<textarea data-member-note="awards" rows="2">${escapeHtml(member.awards || "")}</textarea></label>
                                      <label>Einsatzhistorie<textarea data-member-note="history" rows="2">${escapeHtml(member.history || "")}</textarea></label>
                                    </div>
                                    <div class="rank-history">
                                      <strong>Ranghistorie</strong>
                                      ${
                                        member.rankHistory?.length
                                          ? member.rankHistory
                                              .slice()
                                              .reverse()
                                              .map((entry) => `<span>${formatTime(entry.createdAt)} - ${escapeHtml(entry.from)} -> ${escapeHtml(entry.to)} durch ${escapeHtml(entry.actor)}</span>`)
                                              .join("")
                                          : `<span>Keine Rangbewegungen.</span>`
                                      }
                                    </div>
                                    <div class="action-row">
                                      ${canManageRecords() ? `<button class="chip-button" data-member-action="template" type="button">Als Vorlage</button>` : ""}
                                      <button class="chip-button" data-member-action="detail" type="button">Details</button>
                                      ${canPromoteMembers() ? `<button class="chip-button" data-member-action="promote" type="button">Befoerdern</button>` : ""}
                                      ${canPromoteMembers() ? `<button class="chip-button" data-member-action="demote" type="button">Degradieren</button>` : ""}
                                      ${canManageRecords() ? `<button class="chip-button danger" data-member-action="delete" type="button">Akte loeschen</button>` : ""}
                                    </div>
                                  </article>
                                `;
                              })
                              .join("")
                          : `<div class="empty-column">Keine Akten.</div>`
                      }
                    </div>
                  </section>
                `;
              })
              .join("")}
          </div><datalist id="labelOptions">${labelPalette.map((label) => `<option value="${label}"></option>`).join("")}</datalist>`
        : `<div class="empty-state">Noch keine Personalakten fuer diese Einheit.</div>`
    }
  `;
  applyMemberSubView();
}

function applyMemberSubView() {
  els.membersPanel.dataset.subview = state.memberSubView;
  const command = els.membersPanel.querySelector(".command-panel");
  const rights = els.membersPanel.querySelector(".rights-panel");
  const templates = els.membersPanel.querySelector(".template-panel");
  const board = els.membersPanel.querySelector(".member-board");
  if (command) command.hidden = !["board", "akten", "missionen", "aktivitaet"].includes(state.memberSubView);
  if (rights) rights.hidden = state.memberSubView !== "rechte";
  if (templates) templates.hidden = state.memberSubView !== "vorlagen";
  if (board) board.hidden = !["board", "akten"].includes(state.memberSubView);
  const forms = command?.querySelector(".command-grid");
  const lists = command?.querySelector(".command-lists");
  if (forms) forms.hidden = !["missionen", "aktivitaet"].includes(state.memberSubView);
  if (lists) lists.hidden = !["missionen", "aktivitaet"].includes(state.memberSubView);
}

function renderChatPanel() {
  if (state.view === "admin" || state.activeUnit === "Holonet" || state.category !== "Chat") {
    els.chatPanel.innerHTML = "";
    return;
  }

  const messages = getChatMessages();
  els.chatPanel.innerHTML = `
    <div class="chat-header">
      <div>
        <strong>${escapeHtml(state.activeUnit)} Einheitschat</strong>
        <span><i></i>COMMS ONLINE - Interner RP-Funkkanal</span>
      </div>
    </div>
    <div class="chat-log">
      ${
        messages.length
          ? messages
              .map(
                (message) => `
                  <article class="chat-message">
                    <header>
                      <strong>${escapeHtml(message.author)}</strong>
                      <span>${formatTime(message.createdAt)}</span>
                    </header>
                    <p>${escapeHtml(message.body)}</p>
                    ${isOwner() ? `<button class="chip-button danger compact" data-chat-delete="${message.id}" type="button">Loeschen</button>` : ""}
                  </article>
                `
              )
              .join("")
          : `<div class="empty-state">Noch keine Funknachrichten in diesem Kanal.</div>`
      }
    </div>
    <form class="chat-form" id="chatForm">
      <input id="chatInput" maxlength="260" required placeholder="Funknachricht schreiben" autocomplete="off" />
      <button class="primary-icon-button" type="submit" aria-label="Senden">></button>
    </form>
  `;
}

function renderWikiPanel() {
  if (state.view !== "home" || state.activeUnit === "Holonet" || !["Regeln", "Bewaffnung", "Funkcodes"].includes(state.category)) {
    els.wikiPanel.innerHTML = "";
    return;
  }
  const page = getWikiPage();
  const editable = roleRank(state.account?.role) >= roleRank(getCategoryPermissions()[state.category] || "admin");
  els.wikiPanel.innerHTML = `
    <article class="wiki-card">
      <header>
        <div>
          <strong>${escapeHtml(page.title)}</strong>
          <span>Zuletzt bearbeitet von ${escapeHtml(page.updatedBy)} - ${formatTime(page.updatedAt)}</span>
        </div>
      </header>
      ${
        editable
          ? `<textarea id="wikiEditor" rows="9">${escapeHtml(page.body)}</textarea><button class="primary-button" id="saveWikiButton" type="button">Wiki speichern</button>`
          : `<p>${escapeHtml(page.body)}</p>`
      }
    </article>
  `;
}

function renderApplicationsPanel() {
  if (state.view !== "home" || state.activeUnit !== "Holonet") {
    els.applicationsPanel.innerHTML = "";
    return;
  }
  const ownApplications = state.applications.filter((application) => application.author === state.user.name || state.account?.role === "owner");
  els.applicationsPanel.innerHTML = `
    <article class="application-card">
      <header>
        <strong>Einheitsbewerbung</strong>
        <span>Bewirb dich fuer eine Einheit oder pruefe offene Antraege.</span>
      </header>
      <form id="applicationForm" class="application-form">
        <select id="applicationUnit" required>
          ${units.filter((unit) => !unit.public).map((unit) => `<option value="${unit.id}">${unit.name}</option>`).join("")}
        </select>
        <textarea id="applicationMotivation" required rows="3" maxlength="500" placeholder="Motivation, RP-Erfahrung, Wunschposten"></textarea>
        <button class="primary-button" type="submit">Bewerbung senden</button>
      </form>
      <div class="application-list">
        ${
          ownApplications.length
            ? ownApplications
                .map(
                  (application) => `
                    <div class="application-item" data-application-id="${application.id}">
                      <strong>${escapeHtml(application.unit)} - ${escapeHtml(application.status)}</strong>
                      <span>${escapeHtml(application.author)} - ${formatTime(application.createdAt)}</span>
                      <p>${escapeHtml(application.motivation)}</p>
                      ${
                        application.comments?.length
                          ? `<div class="application-comments">${application.comments.map((comment) => `<span>${escapeHtml(comment.author)}: ${escapeHtml(comment.body)}</span>`).join("")}</div>`
                          : ""
                      }
                      ${
                        state.account?.role === "owner"
                          ? `<div class="application-review">
                              <select data-application-next>
                                ${["offen", "in pruefung", "angenommen", "abgelehnt"].map((status) => `<option value="${status}" ${application.status === status ? "selected" : ""}>${status}</option>`).join("")}
                              </select>
                              <input data-application-comment maxlength="160" placeholder="Kommentar / Rueckfrage" />
                              <button class="chip-button" data-application-save type="button">Pruefung speichern</button>
                            </div>`
                          : ""
                      }
                    </div>
                  `
                )
                .join("")
            : `<div class="empty-state">Keine Bewerbungen vorhanden.</div>`
        }
      </div>
    </article>
  `;
}

function renderNotificationsPanel() {
  if (state.view !== "notifications") {
    els.notificationsPanel.innerHTML = "";
    return;
  }
  els.notificationsPanel.innerHTML = `
    <article class="notifications-card">
      <header>
        <strong>Benachrichtigungen</strong>
        <button class="chip-button" id="markNotificationsButton" type="button">Alle gelesen</button>
      </header>
      ${
        state.notifications.length
          ? state.notifications
              .map((note) => `<div class="notification-item ${note.read ? "" : "unread"}"><strong>${escapeHtml(note.title)}</strong><span>${escapeHtml(note.unit || "Holonet")} - ${formatTime(note.createdAt)}</span><p>${escapeHtml(note.body)}</p></div>`)
              .join("")
          : `<div class="empty-state">Keine Benachrichtigungen.</div>`
      }
    </article>
  `;
}

async function loadAdminUsers() {
  if (!canManageAccounts()) return;
  const requests = [apiFetch("./api/admin/users", { cache: "no-store" })];
  if (isOwner()) requests.push(apiFetch("./api/admin/audit", { cache: "no-store" }));
  const [usersResponse, auditResponse] = await Promise.all(requests);
  if (usersResponse.ok) {
    const payload = await usersResponse.json();
    state.adminUsers = payload.users || [];
  }
  if (auditResponse?.ok) {
    const payload = await auditResponse.json();
    state.auditEntries = payload.entries || [];
  } else if (!isOwner()) {
    state.auditEntries = [];
  }
}

function renderAdminPanel() {
  if (state.view !== "admin") {
    els.adminPanel.innerHTML = "";
    return;
  }

  if (!canManageAccounts()) {
    state.view = "home";
    state.adminUsers = [];
    state.auditEntries = [];
    renderNav();
    els.adminPanel.innerHTML = "";
    return;
  }

  els.adminPanel.innerHTML = `
    <div class="admin-header">
      <strong>Admin Dashboard</strong>
      <button class="chip-button" id="refreshAdminButton" type="button">Aktualisieren</button>
    </div>
    <nav class="sub-tabs" aria-label="Admin Ansicht">
      ${[["users", "User"], ["bewerbungen", "Bewerbungen"], ["befoerderungen", "Befoerderungen"], ["audit", "Audit"], ["backup", "Backup"]].map(([id, label]) => `<button class="sub-tab ${state.adminSubView === id ? "active" : ""}" data-admin-subview="${id}" type="button">${label}</button>`).join("")}
    </nav>
    <section class="command-panel">
      <div class="member-filters">
        <input id="ownerGlobalSearch" placeholder="Owner-Suche: Name, CT, Rang, Label, Einheit" />
        <button class="chip-button" id="exportFullBackupButton" type="button">Vollbackup JSON</button>
      </div>
      <div class="command-lists" id="ownerSearchResults"></div>
    </section>
    <section class="dashboard-strip">
      ${units
        .filter((unit) => !unit.public)
        .map((unit) => {
          const unitMembers = getMembers(unit.id);
          const openApplications = state.applications.filter((application) => application.unit === unit.id && !["angenommen", "abgelehnt"].includes(application.status)).length;
          const openTrainings = unitMembers.reduce((sum, member) => sum + normalizeTrainings(member, unit.id).trainings.filter((training) => !training.done).length, 0);
          return `<div><strong>${unit.name}</strong><span>${unitMembers.length} Akten</span><span>${openApplications} Bewerbungen</span><span>${openTrainings} offene Fortbildungen</span></div>`;
        })
        .join("")}
    </section>
    <section class="admin-applications-panel">
      <strong>Bewerbungen</strong>
      ${state.applications.length
        ? state.applications
            .slice(0, 80)
            .map((application) => `
              <div class="audit-entry application-item" data-application-id="${application.id}">
                <span>${formatTime(application.createdAt)} - ${escapeHtml(application.unit)}</span>
                <strong>${escapeHtml(application.author)} (${escapeHtml(application.status)})</strong>
                <p>${escapeHtml(application.motivation)}</p>
                ${application.comments?.length ? `<div class="application-comments">${application.comments.map((comment) => `<span>${escapeHtml(comment.author)}: ${escapeHtml(comment.body)}</span>`).join("")}</div>` : ""}
                <div class="application-review">
                  <select data-application-next>
                    ${["offen", "in pruefung", "angenommen", "abgelehnt"].map((status) => `<option value="${status}" ${application.status === status ? "selected" : ""}>${status}</option>`).join("")}
                  </select>
                  <input data-application-comment maxlength="160" placeholder="Kommentar / Rueckfrage" />
                  <button class="chip-button" data-admin-application-save type="button">Bewerbung speichern</button>
                </div>
              </div>
            `)
            .join("")
        : `<div class="empty-state">Keine Bewerbungen vorhanden.</div>`}
    </section>
    <div class="admin-grid">
      ${state.adminUsers
        .map(
          (user) => `
            <article class="admin-card" data-user-id="${user.id}">
              <header>
                <div>
                  <h3>${escapeHtml(user.rpName || user.username)}</h3>
                  <span>${escapeHtml(user.discordUsername)} - ${escapeHtml(user.ctNumber || "keine CT")}</span>
                </div>
                <strong>${escapeHtml(user.status)}</strong>
              </header>
              <div class="admin-row">
                <label>Status
                  <select data-admin-field="status">
                    ${["pending", "approved", "blocked"].map((status) => `<option value="${status}" ${user.status === status ? "selected" : ""}>${status}</option>`).join("")}
                  </select>
                </label>
                <label>Rolle
                  <select data-admin-field="role" ${isOwner() ? "" : "disabled"}>
                    ${["user", "admin", "owner"].map((role) => `<option value="${role}" ${user.role === role ? "selected" : ""}>${role}</option>`).join("")}
                  </select>
                </label>
              </div>
              <div class="unit-access-list">
                ${units
                  .filter((unit) => !unit.public)
                  .map(
                    (unit) => `
                      <label>
                        <input type="checkbox" data-admin-unit="${unit.id}" ${user.unitAccess?.includes(unit.id) ? "checked" : ""} />
                        ${unit.name}
                      </label>
                    `
                  )
                  .join("")}
              </div>
              <div class="action-row">
                <button class="chip-button" data-account-status="approved" type="button">Annehmen</button>
                <button class="chip-button" data-account-status="pending" type="button">Warten</button>
                <button class="chip-button danger" data-account-status="blocked" type="button">Blockieren</button>
              </div>
              ${isOwner() ? `<div class="action-row">
                <button class="chip-button" data-account-role="user" type="button">User</button>
                <button class="chip-button" data-account-role="admin" type="button">Admin</button>
                <button class="chip-button danger" data-account-role="owner" type="button">Owner</button>
              </div>` : ""}
              ${isOwner() ? `<label class="password-reset">Neues Passwort
                <input data-password-reset type="password" minlength="6" placeholder="Optional" />
              </label>` : ""}
              <button class="primary-button" data-admin-save type="button">Speichern</button>
              ${isOwner() ? `<button class="chip-button danger full-width" data-password-save type="button">Passwort setzen</button>` : ""}
            </article>
          `
        )
        .join("")}
    </div>
    <section class="audit-panel">
      <strong>Audit-Log</strong>
      ${state.auditEntries.length
        ? state.auditEntries
            .map((entry) => `<div class="audit-entry"><span>${escapeHtml(entry.created_at)}</span><strong>${escapeHtml(entry.action)}</strong><p>${escapeHtml(entry.actor_name)} -> ${escapeHtml(entry.target)}</p></div>`)
            .join("")
        : `<div class="empty-state">Noch keine Audit-Eintraege.</div>`}
    </section>
    <section class="audit-panel">
      <strong>Moderation</strong>
      ${state.threadReports.length
        ? state.threadReports
            .slice(0, 80)
            .map((report) => `<div class="audit-entry" data-report-id="${report.id}"><span>${formatTime(report.createdAt)} - ${escapeHtml(report.unit)}</span><strong>${escapeHtml(report.title)} (${escapeHtml(report.status)})</strong><p>${escapeHtml(report.author)}: ${escapeHtml(report.reason)}</p>${report.status === "offen" ? `<div class="action-row"><button class="chip-button" data-report-status="erledigt" type="button">Erledigt</button><button class="chip-button danger" data-report-status="abgelehnt" type="button">Ablehnen</button></div>` : ""}</div>`)
            .join("")
        : `<div class="empty-state">Keine Meldungen.</div>`}
    </section>
    <section class="audit-panel">
      <strong>Akten-Audit</strong>
      ${state.memberAudit.length
        ? state.memberAudit
            .slice(0, 80)
            .map((entry) => `<div class="audit-entry"><span>${formatTime(entry.createdAt)} - ${escapeHtml(entry.unit)}</span><strong>${escapeHtml(entry.action)}</strong><p>${escapeHtml(entry.actor)} -> ${escapeHtml(entry.member)} ${escapeHtml(entry.details || "")}</p></div>`)
            .join("")
        : `<div class="empty-state">Noch keine Akten-Aenderungen.</div>`}
    </section>
    <section class="audit-panel">
      <strong>Befoerderungsantraege</strong>
      ${state.promotionRequests.length
        ? state.promotionRequests
            .slice(0, 80)
            .map((request) => `<div class="audit-entry" data-promotion-id="${request.id}"><span>${formatTime(request.createdAt)} - ${escapeHtml(request.unit)}</span><strong>${escapeHtml(request.memberName)}: ${escapeHtml(request.fromRank)} -> ${escapeHtml(request.toRank)}</strong><p>${escapeHtml(request.reason)} (${escapeHtml(request.status)})</p>${request.status === "offen" ? `<div class="action-row"><button class="chip-button" data-promotion-decision="angenommen" type="button">Annehmen</button><button class="chip-button danger" data-promotion-decision="abgelehnt" type="button">Ablehnen</button></div>` : ""}</div>`)
            .join("")
        : `<div class="empty-state">Keine offenen Antraege.</div>`}
    </section>
  `;
  applyAdminSubView();
}

function applyAdminSubView() {
  els.adminPanel.dataset.subview = state.adminSubView;
  const command = els.adminPanel.querySelector(".command-panel");
  const dashboard = els.adminPanel.querySelector(".dashboard-strip");
  const applications = els.adminPanel.querySelector(".admin-applications-panel");
  const userGrid = els.adminPanel.querySelector(".admin-grid");
  const auditPanels = [...els.adminPanel.querySelectorAll(".audit-panel")];
  if (command) command.hidden = !["backup"].includes(state.adminSubView);
  if (dashboard) dashboard.hidden = !["users", "bewerbungen"].includes(state.adminSubView);
  if (applications) applications.hidden = state.adminSubView !== "bewerbungen";
  if (userGrid) userGrid.hidden = state.adminSubView !== "users";
  auditPanels.forEach((panel, index) => {
    if (index === 0) panel.hidden = state.adminSubView !== "audit";
    if (index === 1) panel.hidden = state.adminSubView !== "audit";
    if (index === 2) panel.hidden = state.adminSubView !== "audit";
    if (index === 3) panel.hidden = state.adminSubView !== "befoerderungen";
  });
}

function renderDetail() {
  const rawThread = state.threads.find((item) => item.id === state.selectedThreadId);
  const thread = rawThread ? normalizeThread(rawThread) : null;
  if (!thread) return;

  els.detailTitle.textContent = thread.title;
  els.detailMeta.innerHTML = `
    <span>${escapeHtml(thread.unit)}</span>
    <span>${escapeHtml(thread.category)}</span>
    <span>${escapeHtml(thread.author)}</span>
    <span>${formatTime(thread.createdAt)}</span>
    <span>Signal ${thread.reactions.Signal || 0}</span>
    ${thread.locked ? "<span>geschlossen</span>" : ""}
    ${thread.editedAt ? `<span>bearbeitet ${formatTime(thread.editedAt)}</span>` : ""}
  `;
  els.detailBody.textContent = thread.body;
  els.saveThreadButton.textContent = thread.saved ? "+" : "-";
  els.replyStack.innerHTML = thread.replies.length
    ? thread.replies
        .map(
          (reply) => `
            <div class="reply" data-reply-id="${reply.id}">
              <strong>${escapeHtml(reply.author)} - ${formatTime(reply.createdAt)}</strong>
              <p>${escapeHtml(reply.body)}</p>
              <div class="action-row"><button class="chip-button compact" data-reply-quote="${reply.id}" type="button">Zitieren</button>${reply.author === state.user.name || isOwner() ? `<button class="chip-button compact" data-reply-edit="${reply.id}" type="button">Bearbeiten</button>` : ""}</div>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state">Noch keine Antworten im Sektor.</div>`;
  els.replyForm.hidden = thread.locked && !(isOwner() || state.account?.role === "admin");
}

function renderAll() {
  document.body.dataset.unitTheme = getUnit(state.activeUnit)?.theme || "holonet";
  renderUnitTabs();
  renderAccessPanel();
  renderOverviewPanel();
  renderTabs();
  renderNav();
  renderMembersPanel();
  renderChatPanel();
  renderAdminPanel();
  renderWikiPanel();
  renderApplicationsPanel();
  renderNotificationsPanel();
  renderThreads();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openThread(threadId) {
  state.selectedThreadId = threadId;
  state.readThreads[threadId] = Date.now();
  saveState();
  renderDetail();
  els.detailDialog.showModal();
}

function openAccessDialog(unitId) {
  const unit = getUnit(unitId);
  state.pendingUnit = unitId;
  els.accessTitle.textContent = `${unit.name} Registerpruefung`;
  els.accessCopy.textContent = "Zugriff wird nur gewaehrt, wenn dein Registereintrag zur Einheit passt.";
  els.accessCallsign.value = state.user.name === "Du" ? "" : state.user.name;
  els.accessCode.value = "";
  els.accessError.textContent = "";
  els.accessDialog.showModal();
}

function updateThread(threadId, updater) {
  state.threads = state.threads.map((thread) => (thread.id === threadId ? updater({ ...thread }) : thread));
  saveState();
  renderThreads();
  renderDetail();
}

function changeMemberRank(memberId, direction) {
  const ranks = getFlatRanks(state.activeUnit);
  const members = getMembers().map((member) => {
    if (member.id !== memberId) return member;
    const index = ranks.findIndex((rank) => rank.code === member.rankCode);
    const nextIndex = Math.min(Math.max(index + direction, 0), ranks.length - 1);
    const from = ranks[index] || ranks.at(-1);
    const to = ranks[nextIndex];
    logMemberAudit(direction < 0 ? "rang.befoerdert" : "rang.degradiert", member, `${from.code} -> ${to.code}`);
    return {
      ...member,
      rankCode: to.code,
      rankHistory: [
        ...(member.rankHistory || []),
        {
          id: crypto.randomUUID(),
          from: from.code,
          to: to.code,
          actor: state.user.name,
          reason: direction < 0 ? "Befoerderung" : "Degradierung",
          createdAt: Date.now()
        }
      ]
    };
  });
  setMembers(state.activeUnit, members);
  addNotification("Rang geaendert", `${state.activeUnit}: Personalakte wurde ${direction < 0 ? "befoerdert" : "degradiert"}.`);
  renderMembersPanel();
}

function renderMemberDetail(memberId) {
  const member = normalizeTrainings(getMembers().find((item) => item.id === memberId) || {});
  if (!member.id) return;
  state.selectedMemberId = memberId;
  const rankMap = Object.fromEntries(getFlatRanks(state.activeUnit).map((rank) => [rank.code, rank]));
  const memberActivities = getActivityLogs().filter((entry) => normalizeName(entry.member).includes(normalizeName(member.name)) || normalizeName(entry.member).includes(normalizeName(member.serial)));
  const memberMissions = getMissionReports().filter((report) => report.members?.some((name) => normalizeName(name).includes(normalizeName(member.name)) || normalizeName(name).includes(normalizeName(member.serial))));
  const audit = state.memberAudit.filter((entry) => entry.unit === state.activeUnit && entry.serial === member.serial);
  const requests = getPromotionRequests().filter((request) => request.memberId === member.id);
  els.memberDetailBody.innerHTML = `
    <section class="member-detail-hero">
      <div>
        <strong>${escapeHtml(member.name)}</strong>
        <span>${escapeHtml(member.serial)} - ${escapeHtml(rankLabel(rankMap[member.rankCode] || getFlatRanks(state.activeUnit).at(-1)))}</span>
      </div>
      <div class="label-row">${(member.labels || []).map((label) => `<small class="member-label">${escapeHtml(label)}</small>`).join("")}</div>
    </section>
    <section class="detail-grid">
      <article><strong>Fortbildungen</strong>${member.trainings.map((training) => `<p>${training.done ? "[x]" : "[ ]"} ${escapeHtml(training.name)}</p>`).join("")}</article>
      <article><strong>RP Profil</strong><p>${escapeHtml(member.rpProfile || "Nicht hinterlegt.")}</p><p>${escapeHtml(member.specialization || "")}</p></article>
      <article><strong>Ranghistorie</strong>${member.rankHistory?.length ? member.rankHistory.slice().reverse().map((entry) => `<p>${formatTime(entry.createdAt)}: ${escapeHtml(entry.from)} -> ${escapeHtml(entry.to)} (${escapeHtml(entry.reason || "")})</p>`).join("") : "<p>Keine Rangbewegungen.</p>"}</article>
      <article><strong>Aktivitaet</strong>${memberActivities.length ? memberActivities.slice(0, 8).map((entry) => `<p>${escapeHtml(entry.type)}: ${escapeHtml(entry.note)}</p>`).join("") : "<p>Keine Eintraege.</p>"}</article>
      <article><strong>Missionen</strong>${memberMissions.length ? memberMissions.slice(0, 8).map((report) => `<p>${escapeHtml(report.title)}: ${escapeHtml(report.result)}</p>`).join("") : "<p>Keine Missionen verknuepft.</p>"}</article>
      <article><strong>Aktennotizen</strong><p>${escapeHtml(member.notes || "Keine Notizen.")}</p><p>${escapeHtml(member.warnings || "")}</p><p>${escapeHtml(member.awards || "")}</p></article>
      <article><strong>Akten-Audit</strong>${audit.length ? audit.slice(0, 8).map((entry) => `<p>${formatTime(entry.createdAt)}: ${escapeHtml(entry.action)} - ${escapeHtml(entry.details || "")}</p>`).join("") : "<p>Keine Aenderungen.</p>"}</article>
      <article><strong>Befoerderungsantraege</strong>${requests.length ? requests.map((request) => `<p>${escapeHtml(request.status)}: ${escapeHtml(request.fromRank)} -> ${escapeHtml(request.toRank)} - ${escapeHtml(request.reason)}</p>`).join("") : "<p>Keine Antraege.</p>"}</article>
    </section>
    <form id="promotionRequestForm" class="mini-form">
      <strong>Befoerderungsantrag</strong>
      <select id="promotionTargetRank" required>
        ${getFlatRanks(state.activeUnit).map((rank) => `<option value="${rank.code}" ${rank.code === member.rankCode ? "selected" : ""}>${escapeHtml(rankLabel(rank))}</option>`).join("")}
      </select>
      <textarea id="promotionReason" required maxlength="300" rows="3" placeholder="Begruendung, Leistung, Mission"></textarea>
      <button class="primary-button" type="submit">Antrag stellen</button>
    </form>
  `;
  els.memberDetailDialog.showModal();
}

function bindEvents() {
  if (eventsBound) return;
  eventsBound = true;

  if (els.introVideo && !sessionStorage.getItem("galactic-intro-seen")) {
    els.introVideo.classList.add("playing");
    const closeIntro = () => {
      els.introVideo.classList.add("hidden");
      els.introMovie?.pause();
      sessionStorage.setItem("galactic-intro-seen", "1");
    };
    els.skipIntroButton?.addEventListener("click", closeIntro);
    els.introMovie?.addEventListener("ended", closeIntro, { once: true });
    els.introMovie?.play().catch(() => {});
    setTimeout(closeIntro, 12000);
  } else if (els.introVideo) {
    els.introVideo.classList.add("hidden");
  }

  els.authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitAuth();
  });

  els.authSwitchButton.addEventListener("click", () => {
    authMode = authMode === "register" ? "login" : "register";
    showAuthDialog();
  });

  els.unitTabs.addEventListener("click", (event) => {
    const button = event.target.closest(".unit-tab");
    if (!button) return;
    const unitId = button.dataset.unit;
    if (!hasAccess(unitId)) {
      openAccessDialog(unitId);
      return;
    }
    state.activeUnit = unitId;
    state.category = "Alle";
    state.threadLimit = threadPageSize;
    renderThreadFormOptions();
    renderAll();
  });

  els.overviewPanel.addEventListener("click", async (event) => {
    const unitButton = event.target.closest("[data-jump-unit]");
    if (unitButton) {
      state.activeUnit = unitButton.dataset.jumpUnit;
      state.category = "Mitgliederakten";
      state.memberSubView = "board";
      state.threadLimit = threadPageSize;
      renderAll();
      return;
    }
    const viewButton = event.target.closest("[data-jump-view]");
    if (!viewButton) return;
    state.view = viewButton.dataset.jumpView;
    state.threadLimit = threadPageSize;
    if (state.view === "admin") await loadAdminUsers();
    renderAll();
  });

  els.accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const unit = getUnit(state.pendingUnit);
    const code = els.accessCode.value.trim().toUpperCase();
    const callsign = els.accessCallsign.value.trim();

    if (!unit || code !== unit.code) {
      els.accessError.textContent = "Register abgelehnt: Kennung gehoert nicht zu dieser Einheit.";
      return;
    }

    state.access[unit.id] = { callsign, code, approvedAt: Date.now() };
    state.user.name = callsign;
    state.user.bio = unit.name;
    state.activeUnit = unit.id;
    state.category = "Alle";
    state.threadLimit = threadPageSize;
    saveState();
    els.accessDialog.close();
    renderThreadFormOptions();
    renderAll();
  });

  els.membersPanel.addEventListener("click", (event) => {
    const subViewButton = event.target.closest("[data-member-subview]");
    if (subViewButton) {
      state.memberSubView = subViewButton.dataset.memberSubview;
      renderMembersPanel();
      return;
    }

    const quickFilter = event.target.closest("[data-quick-filter]");
    if (quickFilter) {
      const action = quickFilter.dataset.quickFilter;
      state.memberFilters = { ...state.memberFilters, search: "", status: "all", label: "all", training: "all" };
      if (action === "open-training") state.memberFilters.training = "open";
      if (action === "training") state.memberFilters.status = "training";
      if (action === "active") state.memberFilters.status = "active";
      if (action === "absent") state.memberFilters.search = "abwesend";
      renderMembersPanel();
      return;
    }

    if (event.target.closest("#clearSeedDataButton")) {
      if (!isOwner()) return;
      clearSeedData();
      return;
    }

    if (event.target.closest("#exportMembersButton")) {
      const rows = [["Einheit", "Rufname", "Dienstnummer", "Rang", "Status", "Labels", "Fortbildungen offen", "Abwesend bis"]];
      getMembers().forEach((member) => {
        const normalized = normalizeTrainings(member);
        rows.push([
          state.activeUnit,
          normalized.name,
          normalized.serial,
          normalized.rankCode,
          normalized.status,
          normalized.labels.join(" | "),
          normalized.trainings.filter((training) => !training.done).map((training) => training.name).join(" | "),
          normalized.absentUntil || ""
        ]);
      });
      const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${state.activeUnit}-mitglieder.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      return;
    }

    if (event.target.closest("#exportUnitBackupButton")) {
      exportJson(`${state.activeUnit}-backup.json`, {
        unit: state.activeUnit,
        members: getMembers(),
        activityLogs: getActivityLogs(),
        missionReports: getMissionReports(),
        announcements: getAnnouncements(),
        promotionRequests: getPromotionRequests(),
        exportedAt: new Date().toISOString()
      });
      return;
    }

    if (event.target.closest("#addMemberButton")) {
      if (!canManageRecords()) return;
      renderMemberRankOptions();
      renderMemberTemplateOptions();
      els.memberForm.reset();
      els.memberStatus.value = "inbox";
      els.memberTrainings.value = trainingTemplates.join("\n");
      els.memberDialog.showModal();
      return;
    }

    const templateCopyButton = event.target.closest("[data-template-copy]");
    if (templateCopyButton) {
      if (!canManageRecords()) return;
      const template = getMemberTemplates().find((item) => item.id === templateCopyButton.dataset.templateCopy);
      if (!template) return;
      const name = prompt("Rufname fuer die neue Akte?");
      if (!name) return;
      const serial = prompt("Dienstnummer?");
      if (!serial) return;
      if (serialExists(serial.trim())) {
        alert("Diese Dienstnummer existiert bereits.");
        return;
      }
      const member = createMemberFromTemplate(template, name.trim(), serial.trim());
      logMemberAudit("akte.kopiert", member, template.name);
      setMembers(state.activeUnit, [member, ...getMembers()]);
      renderMembersPanel();
      return;
    }

    const actionButton = event.target.closest("[data-member-action]");
    if (!actionButton) return;
    const card = event.target.closest(".member-card");
    if (actionButton.dataset.memberAction === "detail") {
      renderMemberDetail(card.dataset.memberId);
      return;
    }
    if (actionButton.dataset.memberAction === "delete") {
      if (!canManageRecords()) return;
      deleteMember(card.dataset.memberId);
      return;
    }
    if (actionButton.dataset.memberAction === "template") {
      if (!canManageRecords()) return;
      const member = getMembers().find((item) => item.id === card.dataset.memberId);
      if (!member) return;
      const templateName = prompt("Name fuer die Vorlage?", `${member.name} Vorlage`);
      if (!templateName) return;
      const templates = getMemberTemplates();
      templates.unshift({
        ...normalizeTrainings(member),
        id: crypto.randomUUID(),
        name: templateName.trim()
      });
      setMemberTemplates(state.activeUnit, templates.slice(0, 10));
      renderMembersPanel();
      return;
    }
    if (!canPromoteMembers()) return;
    const direction = actionButton.dataset.memberAction === "promote" ? -1 : 1;
    changeMemberRank(card.dataset.memberId, direction);
  });

  els.membersPanel.addEventListener("submit", (event) => {
    const templateForm = event.target.closest("#templateForm");
    const trainingForm = event.target.closest("[data-training-form]");
    const labelForm = event.target.closest("[data-label-form]");
    const announcementForm = event.target.closest("#announcementForm");
    const missionForm = event.target.closest("#missionForm");
    const activityForm = event.target.closest("#activityForm");
    if (!templateForm && !trainingForm && !labelForm && !announcementForm && !missionForm && !activityForm) return;
    event.preventDefault();
    if (!canManageRecords()) return;

    if (announcementForm) {
      getAnnouncements().unshift({
        id: crypto.randomUUID(),
        title: document.querySelector("#announcementTitle").value.trim(),
        body: document.querySelector("#announcementBody").value.trim(),
        author: state.user.name,
        createdAt: Date.now()
      });
      state.announcements[state.activeUnit] = getAnnouncements().slice(0, 10);
      addUnitNotification("Bekanntmachung", `${state.activeUnit}: ${document.querySelector("#announcementTitle").value.trim()}`, state.activeUnit);
      renderAll();
      return;
    }

    if (missionForm) {
      const report = {
        id: crypto.randomUUID(),
        title: document.querySelector("#missionTitle").value.trim(),
        members: parseList(document.querySelector("#missionMembers").value),
        result: document.querySelector("#missionResult").value.trim(),
        author: state.user.name,
        createdAt: Date.now()
      };
      getMissionReports().unshift(report);
      state.missionReports[state.activeUnit] = getMissionReports().slice(0, 80);
      addUnitNotification("Missionsbericht", `${state.activeUnit}: ${report.title}`, state.activeUnit);
      saveState();
      renderMembersPanel();
      return;
    }

    if (activityForm) {
      const entry = {
        id: crypto.randomUUID(),
        member: document.querySelector("#activityMember").value.trim(),
        type: document.querySelector("#activityType").value,
        note: document.querySelector("#activityNote").value.trim(),
        actor: state.user.name,
        createdAt: Date.now()
      };
      getActivityLogs().unshift(entry);
      state.activityLogs[state.activeUnit] = getActivityLogs().slice(0, 120);
      addUnitNotification("Aktivitaetslog", `${entry.member}: ${entry.type}`, state.activeUnit);
      saveState();
      renderMembersPanel();
      return;
    }

    if (templateForm) {
      const name = templateForm.querySelector("#templateName").value.trim();
      const labels = parseList(templateForm.querySelector("#templateLabels").value);
      const customTrainings = parseList(templateForm.querySelector("#templateTrainings").value);
      const rankCode = getFlatRanks(state.activeUnit).at(-1)?.code || "C";
      setMemberTemplates(state.activeUnit, [
        {
          id: crypto.randomUUID(),
          name,
          rankCode,
          status: "inbox",
          labels,
          trainings: (customTrainings.length ? customTrainings : trainingTemplates).map((item) => ({ name: item, done: false })),
          notes: "",
          warnings: "",
          awards: "",
          history: ""
        },
        ...getMemberTemplates()
      ].slice(0, 10));
      renderMembersPanel();
      return;
    }

    const card = event.target.closest(".member-card");
    const input = event.target.querySelector("input");
    const value = input.value.trim();
    if (!value) return;
    const members = getMembers().map((member) => {
      if (member.id !== card.dataset.memberId) return member;
      const normalized = normalizeTrainings(member);
      if (trainingForm) {
        if (normalized.trainings.some((training) => training.name.toLowerCase() === value.toLowerCase())) return normalized;
        logMemberAudit("fortbildung.angelegt", normalized, value);
        return { ...normalized, trainings: [...normalized.trainings, { name: value, done: false }] };
      }
      if (normalized.labels.some((label) => label.toLowerCase() === value.toLowerCase())) return normalized;
      logMemberAudit("label.angelegt", normalized, value);
      return { ...normalized, labels: [...normalized.labels, value].slice(0, 8) };
    });
    setMembers(state.activeUnit, members);
    renderMembersPanel();
  });

  els.memberDetailBody?.addEventListener("submit", (event) => {
    const form = event.target.closest("#promotionRequestForm");
    if (!form) return;
    event.preventDefault();
    const member = getMembers().find((item) => item.id === state.selectedMemberId);
    if (!member) return;
    const targetRank = document.querySelector("#promotionTargetRank").value;
    const reason = document.querySelector("#promotionReason").value.trim();
    state.promotionRequests.unshift({
      id: crypto.randomUUID(),
      unit: state.activeUnit,
      memberId: member.id,
      memberName: member.name,
      serial: member.serial,
      fromRank: member.rankCode,
      toRank: targetRank,
      reason,
      status: "offen",
      requestedBy: state.user.name,
      createdAt: Date.now()
    });
    logMemberAudit("rang.antrag", member, `${member.rankCode} -> ${targetRank}: ${reason}`);
    addUnitNotification("Befoerderungsantrag", `${member.name}: ${member.rankCode} -> ${targetRank}`, state.activeUnit);
    saveState();
    renderMemberDetail(member.id);
  });

  els.closeMemberDetailButton?.addEventListener("click", () => els.memberDetailDialog.close());

  els.membersPanel.addEventListener("change", (event) => {
    if (event.target.closest("#memberSearchInput, #memberStatusFilter, #memberLabelFilter, #memberTrainingFilter")) {
      state.memberFilters = {
        search: document.querySelector("#memberSearchInput")?.value || "",
        status: document.querySelector("#memberStatusFilter")?.value || "all",
        label: document.querySelector("#memberLabelFilter")?.value || "all",
        training: document.querySelector("#memberTrainingFilter")?.value || "all"
      };
      renderMembersPanel();
      return;
    }

    const categoryRule = event.target.closest("[data-category-rule]");
    if (categoryRule) {
      if (!isOwner()) return;
      const rules = getCategoryPermissions();
      rules[categoryRule.dataset.categoryRule] = categoryRule.value;
      state.permissions.categoryRules[state.activeUnit] = rules;
      saveState();
      return;
    }

    const rightsCheckbox = event.target.closest('input[type="checkbox"][data-right]');
    if (rightsCheckbox) {
      if (!isOwner()) return;
      const row = event.target.closest(".rights-row");
      setPermission(state.activeUnit, row.dataset.rightsName, rightsCheckbox.dataset.right, rightsCheckbox.checked);
      renderMembersPanel();
      return;
    }

    const rankRightCheckbox = event.target.closest('input[type="checkbox"][data-rank-right]');
    if (rankRightCheckbox) {
      if (!isOwner()) return;
      const row = event.target.closest("[data-rank-code]");
      state.rankRights[state.activeUnit] ||= {};
      state.rankRights[state.activeUnit][row.dataset.rankCode] ||= { records: false, promote: false, rights: false };
      state.rankRights[state.activeUnit][row.dataset.rankCode][rankRightCheckbox.dataset.rankRight] = rankRightCheckbox.checked;
      saveState();
      renderMembersPanel();
      return;
    }

    const statusSelect = event.target.closest("[data-member-status]");
    if (statusSelect) {
      if (!canManageRecords()) return;
      const card = event.target.closest(".member-card");
      const members = getMembers().map((member) => {
        if (member.id !== card.dataset.memberId) return member;
        logMemberAudit("akte.verschoben", member, statusSelect.value);
        return { ...member, status: statusSelect.value };
      });
      setMembers(state.activeUnit, members);
      renderMembersPanel();
      return;
    }

    const absenceInput = event.target.closest("[data-member-absence]");
    if (absenceInput) {
      if (!canManageRecords()) return;
      const card = event.target.closest(".member-card");
      const members = getMembers().map((member) => {
        if (member.id !== card.dataset.memberId) return member;
        logMemberAudit("abmeldung", member, absenceInput.value || "geloescht");
        return { ...member, absentUntil: absenceInput.value };
      });
      setMembers(state.activeUnit, members);
      renderMembersPanel();
      return;
    }

    const checkbox = event.target.closest('input[type="checkbox"][data-training]');
    if (!checkbox) {
      const noteField = event.target.closest("[data-member-note]");
      if (!noteField) return;
      if (!canManageRecords()) return;
      const card = event.target.closest(".member-card");
      const field = noteField.dataset.memberNote;
      const members = getMembers().map((member) => {
        if (member.id !== card.dataset.memberId) return member;
        logMemberAudit(`akte.${field}`, member, "Text aktualisiert");
        return { ...member, [field]: noteField.value };
      });
      setMembers(state.activeUnit, members);
      return;
    }
    if (!canManageRecords()) {
      checkbox.checked = !checkbox.checked;
      return;
    }
    const card = event.target.closest(".member-card");
    const members = getMembers().map((member) => {
      if (member.id !== card.dataset.memberId) return member;
      return {
        ...member,
        trainings: member.trainings.map((training) =>
          training.name === checkbox.dataset.training ? { ...training, done: checkbox.checked } : training
        )
      };
    });
    const changed = members.find((member) => member.id === card.dataset.memberId);
    logMemberAudit("fortbildung.status", changed, `${checkbox.dataset.training}: ${checkbox.checked ? "erledigt" : "offen"}`);
    setMembers(state.activeUnit, members);
  });

  els.chatPanel.addEventListener("submit", (event) => {
    const form = event.target.closest("#chatForm");
    if (!form) return;
    event.preventDefault();
    const input = form.querySelector("#chatInput");
    const body = input.value.trim();
    if (!body) return;
    const messages = getChatMessages();
    messages.push({
      id: crypto.randomUUID(),
      author: state.user.name,
      body,
      createdAt: Date.now()
    });
    setChatMessages(state.activeUnit, messages);
    renderChatPanel();
    renderStats([]);
  });

  els.chatPanel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chat-delete]");
    if (!button || !isOwner()) return;
    deleteChatMessage(button.dataset.chatDelete);
  });

  els.wikiPanel.addEventListener("click", (event) => {
    if (!event.target.closest("#saveWikiButton")) return;
    const editor = document.querySelector("#wikiEditor");
    if (!editor) return;
    setWikiPage(editor.value.trim());
    renderWikiPanel();
  });

  els.applicationsPanel.addEventListener("submit", (event) => {
    const form = event.target.closest("#applicationForm");
    if (!form) return;
    event.preventDefault();
    state.applications.unshift({
      id: crypto.randomUUID(),
      author: state.user.name,
      unit: document.querySelector("#applicationUnit").value,
      motivation: document.querySelector("#applicationMotivation").value.trim(),
      status: "offen",
      createdAt: Date.now()
    });
    addNotification("Neue Bewerbung", `${state.user.name} hat eine Bewerbung eingereicht.`);
    saveState();
    renderApplicationsPanel();
  });

  els.applicationsPanel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-application-save]");
    if (!button || !isOwner()) return;
    const item = event.target.closest(".application-item");
    const status = item.querySelector("[data-application-next]").value;
    const comment = item.querySelector("[data-application-comment]").value.trim();
    state.applications = state.applications.map((application) => {
      if (application.id !== item.dataset.applicationId) return application;
      return {
        ...application,
        status,
        reviewedBy: state.user.name,
        reviewedAt: Date.now(),
        comments: comment ? [...(application.comments || []), { id: crypto.randomUUID(), author: state.user.name, body: comment, createdAt: Date.now() }] : application.comments || []
      };
    });
    addNotification("Bewerbung aktualisiert", `Eine Bewerbung ist jetzt ${status}.`, "Holonet");
    saveState();
    renderApplicationsPanel();
  });

  els.notificationsPanel.addEventListener("click", (event) => {
    if (!event.target.closest("#markNotificationsButton")) return;
    state.notifications = state.notifications.map((note) => ({ ...note, read: true }));
    saveState();
    renderAll();
  });

  els.adminPanel.addEventListener("click", async (event) => {
    if (!canManageAccounts()) return;

    const adminSubView = event.target.closest("[data-admin-subview]");
    if (adminSubView) {
      state.adminSubView = adminSubView.dataset.adminSubview;
      renderAdminPanel();
      return;
    }

    if (event.target.closest("#exportFullBackupButton")) {
      exportJson("republic-network-backup.json", {
        threads: state.threads,
        members: state.members,
        chats: state.chats,
        memberTemplates: state.memberTemplates,
        activityLogs: state.activityLogs,
        missionReports: state.missionReports,
        announcements: state.announcements,
        memberAudit: state.memberAudit,
        promotionRequests: state.promotionRequests,
        rankRights: state.rankRights,
        applications: state.applications,
        permissions: state.permissions,
        exportedAt: new Date().toISOString()
      });
      return;
    }

    if (event.target.closest("#refreshAdminButton")) {
      await loadAdminUsers();
      renderAdminPanel();
      return;
    }

    const applicationSaveButton = event.target.closest("[data-admin-application-save]");
    if (applicationSaveButton) {
      const item = event.target.closest(".application-item");
      const status = item.querySelector("[data-application-next]").value;
      const comment = item.querySelector("[data-application-comment]").value.trim();
      state.applications = state.applications.map((application) => {
        if (application.id !== item.dataset.applicationId) return application;
        return {
          ...application,
          status,
          reviewedBy: state.user.name,
          reviewedAt: Date.now(),
          comments: comment ? [...(application.comments || []), { id: crypto.randomUUID(), author: state.user.name, body: comment, createdAt: Date.now() }] : application.comments || []
        };
      });
      addNotification("Bewerbung aktualisiert", `Eine Bewerbung ist jetzt ${status}.`, "Holonet");
      saveState();
      renderAdminPanel();
      return;
    }

    const promotionButton = event.target.closest("[data-promotion-decision]");
    if (promotionButton) {
      const item = event.target.closest("[data-promotion-id]");
      const request = state.promotionRequests.find((entry) => entry.id === item.dataset.promotionId);
      if (!request) return;
      state.promotionRequests = state.promotionRequests.map((entry) =>
        entry.id === request.id ? { ...entry, status: promotionButton.dataset.promotionDecision, reviewedBy: state.user.name, reviewedAt: Date.now() } : entry
      );
      if (promotionButton.dataset.promotionDecision === "angenommen") {
        const previousUnit = state.activeUnit;
        state.activeUnit = request.unit;
        const members = getMembers(request.unit).map((member) => {
          if (member.id !== request.memberId) return member;
          logMemberAudit("rang.antrag.angenommen", member, `${request.fromRank} -> ${request.toRank}`);
          return {
            ...member,
            rankCode: request.toRank,
            rankHistory: [
              ...(member.rankHistory || []),
              { id: crypto.randomUUID(), from: request.fromRank, to: request.toRank, actor: state.user.name, reason: request.reason, createdAt: Date.now() }
            ]
          };
        });
        setMembers(request.unit, members);
        state.activeUnit = previousUnit;
      }
      addNotification("Befoerderungsantrag entschieden", `${request.memberName}: ${promotionButton.dataset.promotionDecision}`, request.unit);
      saveState();
      renderAdminPanel();
      return;
    }

    const reportButton = event.target.closest("[data-report-status]");
    if (reportButton) {
      const item = event.target.closest("[data-report-id]");
      state.threadReports = state.threadReports.map((report) =>
        report.id === item.dataset.reportId ? { ...report, status: reportButton.dataset.reportStatus, reviewedBy: state.user.name, reviewedAt: Date.now() } : report
      );
      state.threads = state.threads.map((thread) => ({
        ...thread,
        reports: (thread.reports || []).map((report) =>
          report.id === item.dataset.reportId ? { ...report, status: reportButton.dataset.reportStatus } : report
        )
      }));
      saveState();
      renderAdminPanel();
      return;
    }

    const saveButton = event.target.closest("[data-admin-save]");
    const passwordButton = event.target.closest("[data-password-save]");
    const accountStatusButton = event.target.closest("[data-account-status]");
    const accountRoleButton = event.target.closest("[data-account-role]");
    if (!saveButton && !passwordButton && !accountStatusButton && !accountRoleButton) return;
    const card = event.target.closest(".admin-card");
    const id = card.dataset.userId;

    if (passwordButton) {
      const password = card.querySelector("[data-password-reset]").value;
      if (!password) return;
      const response = await apiFetch(`./api/admin/users/${id}/password`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (response.ok) {
        card.querySelector("[data-password-reset]").value = "";
        await loadAdminUsers();
        renderAdminPanel();
      }
      return;
    }

    if (accountStatusButton) card.querySelector('[data-admin-field="status"]').value = accountStatusButton.dataset.accountStatus;
    if (accountRoleButton) card.querySelector('[data-admin-field="role"]').value = accountRoleButton.dataset.accountRole;
    const status = card.querySelector('[data-admin-field="status"]').value;
    const role = card.querySelector('[data-admin-field="role"]').value;
    const unitAccess = [...card.querySelectorAll("[data-admin-unit]:checked")].map((input) => input.dataset.adminUnit);
    const response = await apiFetch(`./api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status, role, unitAccess })
    });
    if (response.ok) {
      await loadAdminUsers();
      renderAdminPanel();
    }
  });

  els.adminPanel.addEventListener("input", (event) => {
    if (!event.target.closest("#ownerGlobalSearch") || !canManageAccounts()) return;
    const query = event.target.value.trim().toLowerCase();
    const target = document.querySelector("#ownerSearchResults");
    if (!target) return;
    if (!query) {
      target.innerHTML = "";
      return;
    }
    const results = Object.entries(state.members)
      .flatMap(([unit, members]) => members.map((member) => ({ unit, member: normalizeTrainings(member, unit) })))
      .filter(({ unit, member }) => [unit, member.name, member.serial, member.rankCode, ...(member.labels || []), member.rpProfile || "", member.specialization || ""].join(" ").toLowerCase().includes(query))
      .slice(0, 12);
    target.innerHTML = results.length
      ? results.map(({ unit, member }) => `<div><strong>${escapeHtml(member.name)}</strong><p>${escapeHtml(unit)} - ${escapeHtml(member.serial)} - ${escapeHtml(member.rankCode)}</p></div>`).join("")
      : `<div><p>Keine Treffer.</p></div>`;
  });

  els.memberForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageRecords()) return;
    if (serialExists(els.memberSerial.value.trim())) {
      alert("Diese Dienstnummer ist bereits vergeben.");
      return;
    }
    const members = getMembers();
    const template = getMemberTemplates().find((item) => item.id === els.memberTemplate.value);
    const manualTrainings = parseList(els.memberTrainings.value);
    const baseTemplate = template || {
      rankCode: els.memberRank.value,
      status: els.memberStatus.value,
      labels: parseList(els.memberLabels.value),
      trainings: (manualTrainings.length ? manualTrainings : trainingTemplates).map((name) => ({ name, done: false })),
      notes: "",
      warnings: "",
      awards: "",
      history: ""
    };
    const member = {
      ...createMemberFromTemplate(baseTemplate, els.memberName.value.trim(), els.memberSerial.value.trim()),
      rankCode: els.memberRank.value,
      status: els.memberStatus.value,
      labels: parseList(els.memberLabels.value),
      trainings: (manualTrainings.length ? manualTrainings : baseTemplate.trainings.map((training) => training.name)).map((name) => ({ name, done: false }))
    };
    members.unshift(member);
    logMemberAudit("akte.angelegt", member, "Neue Personalakte");
    setMembers(state.activeUnit, members);
    els.memberDialog.close();
    renderMembersPanel();
  });

  els.memberTemplate?.addEventListener("change", () => {
    const template = getMemberTemplates().find((item) => item.id === els.memberTemplate.value);
    if (!template) return;
    els.memberRank.value = template.rankCode || els.memberRank.value;
    els.memberStatus.value = template.status || "inbox";
    els.memberLabels.value = (template.labels || []).join(", ");
    els.memberTrainings.value = (template.trainings || []).map((training) => training.name).join("\n");
  });

  els.tabs.addEventListener("click", (event) => {
    const button = event.target.closest(".tab");
    if (!button) return;
    state.category = button.dataset.category;
    state.threadLimit = threadPageSize;
    renderThreadFormOptions();
    renderTabs();
    renderMembersPanel();
    renderChatPanel();
    renderWikiPanel();
    renderApplicationsPanel();
    renderNotificationsPanel();
    renderThreads();
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    state.threadLimit = threadPageSize;
    renderThreads();
  });

  els.threadList.addEventListener("click", (event) => {
    if (event.target.closest("#loadMoreThreadsButton")) {
      state.threadLimit += threadPageSize;
      renderThreads();
      return;
    }

    const card = event.target.closest(".thread-card");
    if (!card) return;
    const action = event.target.closest("button")?.dataset.action;
    const threadId = card.dataset.threadId;

    if (action === "like") {
      updateThread(threadId, (thread) => {
        thread = normalizeThread(thread);
        thread.liked = !thread.liked;
        thread.likes += thread.liked ? 1 : -1;
        thread.reactions.Signal = Math.max(0, (thread.reactions.Signal || 0) + (thread.liked ? 1 : -1));
        return thread;
      });
      return;
    }

    if (action === "react-confirm" || action === "react-question") {
      const key = action === "react-confirm" ? "Bestaetigt" : "Frage";
      updateThread(threadId, (thread) => {
        thread = normalizeThread(thread);
        thread.reactions[key] = (thread.reactions[key] || 0) + 1;
        return thread;
      });
      return;
    }

    if (action === "save") {
      updateThread(threadId, (thread) => {
        thread.saved = !thread.saved;
        return thread;
      });
      return;
    }

    if (action === "delete") {
      if (!(isOwner() || state.account?.role === "admin")) return;
      deleteThread(threadId);
      return;
    }

    if (action === "subscribe") {
      updateThread(threadId, (thread) => {
        thread = normalizeThread(thread);
        thread.subscribers = thread.subscribers.includes(state.user.name)
          ? thread.subscribers.filter((name) => name !== state.user.name)
          : [...thread.subscribers, state.user.name];
        return thread;
      });
      return;
    }

    if (action === "report") {
      const reason = prompt("Warum meldest du diesen Thread?");
      if (!reason) return;
      updateThread(threadId, (thread) => {
        thread = normalizeThread(thread);
        const report = { id: crypto.randomUUID(), reason, author: state.user.name, createdAt: Date.now(), status: "offen" };
        thread.reports.push(report);
        state.threadReports.unshift({ ...report, threadId, title: thread.title, unit: thread.unit });
        return thread;
      });
      return;
    }

    if (action === "edit") {
      const thread = state.threads.find((item) => item.id === threadId);
      if (!thread || !canModerateThread(thread)) return;
      const body = prompt("Thread bearbeiten", thread.body);
      if (!body) return;
      updateThread(threadId, (item) => ({ ...item, body: body.trim(), editedAt: Date.now(), editedBy: state.user.name }));
      return;
    }

    if (action === "pin" || action === "lock") {
      if (!(isOwner() || state.account?.role === "admin")) return;
      updateThread(threadId, (thread) => ({ ...thread, [action === "pin" ? "pinned" : "locked"]: !thread[action === "pin" ? "pinned" : "locked"] }));
      return;
    }

    openThread(threadId);
  });

  els.newThreadButton.addEventListener("click", () => {
    if (!canCreateInCurrentCategory()) return;

    if (state.activeUnit !== "Holonet" && state.category === "Mitgliederakten") {
      if (!canManageRecords()) return;
      renderMemberRankOptions();
      renderMemberTemplateOptions();
      els.memberForm.reset();
      els.memberStatus.value = "inbox";
      els.memberTrainings.value = trainingTemplates.join("\n");
      els.memberDialog.showModal();
      return;
    }

    if (state.activeUnit !== "Holonet" && state.category === "Chat") {
      const input = document.querySelector("#chatInput");
      input?.focus();
      return;
    }

    renderThreadFormOptions();
    if (state.category !== "Alle" && state.category !== "Mitgliederakten" && state.category !== "Chat") {
      els.threadCategory.value = state.category;
    }
    els.threadDialog.showModal();
  });

  els.threadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canCreateInCurrentCategory()) return;
    const tags = els.threadTags.value
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean)
      .slice(0, 4);

    state.threads.unshift({
      id: crypto.randomUUID(),
      unit: state.activeUnit,
      title: els.threadTitle.value.trim(),
      category: els.threadCategory.value,
      body: els.threadBody.value.trim(),
      tags: tags.length ? tags : ["transmission"],
      author: state.user.name,
      createdAt: Date.now(),
      likes: 0,
      liked: false,
      saved: false,
      pinned: false,
      locked: false,
      reactions: { Signal: 0, Bestaetigt: 0, Frage: 0 },
      subscribers: [state.user.name],
      reports: [],
      replies: []
    });

    saveState();
    els.threadForm.reset();
    els.threadDialog.close();
    state.category = "Alle";
    state.view = "home";
    renderAll();
  });

  els.backButton.addEventListener("click", () => els.detailDialog.close());

  els.saveThreadButton.addEventListener("click", () => {
    if (!state.selectedThreadId) return;
    updateThread(state.selectedThreadId, (thread) => {
      thread.saved = !thread.saved;
      return thread;
    });
  });

  els.replyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.selectedThreadId) return;
    updateThread(state.selectedThreadId, (thread) => {
      thread = normalizeThread(thread);
      if (thread.locked && !(isOwner() || state.account?.role === "admin")) return thread;
      thread.replies.push({
        id: crypto.randomUUID(),
        author: state.user.name,
        body: els.replyBody.value.trim(),
        createdAt: Date.now()
      });
      notifyThreadSubscribers(thread, `${state.user.name} hat geantwortet.`);
      return thread;
    });
    els.replyForm.reset();
  });

  els.replyStack.addEventListener("click", (event) => {
    const quoteButton = event.target.closest("[data-reply-quote]");
    const editButton = event.target.closest("[data-reply-edit]");
    if (!quoteButton && !editButton) return;
    const thread = state.threads.find((item) => item.id === state.selectedThreadId);
    const replyId = (quoteButton || editButton).dataset.replyQuote || (quoteButton || editButton).dataset.replyEdit;
    const reply = thread?.replies.find((item) => item.id === replyId);
    if (!thread || !reply) return;
    if (quoteButton) {
      els.replyBody.value = `> ${reply.author}: ${reply.body}\n\n`;
      els.replyBody.focus();
      return;
    }
    if (reply.author !== state.user.name && !isOwner()) return;
    const body = prompt("Antwort bearbeiten", reply.body);
    if (!body) return;
    updateThread(thread.id, (item) => ({
      ...item,
      replies: item.replies.map((entry) => (entry.id === reply.id ? { ...entry, body: body.trim(), editedAt: Date.now(), editedBy: state.user.name } : entry))
    }));
  });

  els.profileButton.addEventListener("click", () => {
    els.displayName.value = state.user.name;
    els.profileBio.value = state.user.bio;
    els.profileDialog.showModal();
  });

  els.profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.user = {
      name: els.displayName.value.trim(),
      bio: els.profileBio.value.trim() || "Mitglied"
    };
    const newPassword = els.profilePassword?.value || "";
    if (newPassword) {
      apiFetch("./api/auth/password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: newPassword })
      })
        .then(async (response) => {
          const payload = await response.json().catch(() => ({}));
          els.profilePasswordMessage.textContent = response.ok ? "Passwort wurde aktualisiert." : payload.error || "Passwort konnte nicht gesetzt werden.";
          if (response.ok) els.profilePassword.value = "";
        })
        .catch(() => {
          els.profilePasswordMessage.textContent = "Backend nicht erreichbar.";
        });
    }
    saveState();
    renderAll();
    if (!newPassword) els.profileDialog.close();
  });

  els.logoutButton.addEventListener("click", async () => {
    await apiFetch("./api/auth/logout", { method: "POST" }).catch(() => {});
    authToken = "";
    localStorage.removeItem(authTokenKey);
    state.account = null;
    state.view = "home";
    state.adminUsers = [];
    state.auditEntries = [];
    document.body.classList.remove("is-owner");
    els.profileDialog.close();
    showAuthDialog("Du wurdest ausgeloggt.");
  });

  els.navItems.forEach((button) => {
    button.addEventListener("click", async () => {
      if (button.dataset.view === "admin" && !canManageAccounts()) return;
      state.view = button.dataset.view;
      state.threadLimit = threadPageSize;
      if (state.view === "admin") await loadAdminUsers();
      renderNav();
      renderAdminPanel();
      renderMembersPanel();
      renderChatPanel();
      renderWikiPanel();
      renderApplicationsPanel();
      renderNotificationsPanel();
      renderThreads();
    });
  });
}

function renderNav() {
  els.navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
}

async function boot() {
  bindEvents();
  if (!(await requireLogin())) return;
  await loadState();
  renderThreadFormOptions();
  renderAll();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js?v=34").catch(() => {});
  }

  setInterval(async () => {
    if (!backendAvailable || !authToken || state.view === "admin") return;
    const activeElement = document.activeElement;
    if (activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName)) return;
    await loadState();
    if (!canManageAccounts() && state.view === "admin") {
      state.view = "home";
      state.adminUsers = [];
      state.auditEntries = [];
    }
    renderAll();
  }, 7000);
}

boot();

