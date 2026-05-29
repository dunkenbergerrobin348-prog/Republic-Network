const publicCategories = ["Alle", "Sektor", "Missionen", "Cantina", "Technik", "Archiv"];
const unitCategories = ["Alle", "Einheitsbeitrag", "Regeln", "Bewaffnung", "Funkcodes", "Mitgliederakten", "Chat"];

const units = [
  { id: "Holonet", name: "Holonet", public: true, code: "" },
  { id: "212th", name: "212th", public: false, code: "212-AX7" },
  { id: "501st", name: "501st", public: false, code: "501-VDR" },
  { id: "91st", name: "91st", public: false, code: "91-RCN" },
  { id: "Fleet Crew", name: "Fleet Crew", public: false, code: "FLT-CRW" },
  { id: "5th", name: "5th", public: false, code: "5TH-ARC" },
  { id: "Flottensicherheit", name: "Flottensicherheit", public: false, code: "SEC-5F" }
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
const ownerCode = "OWNER-ROOT";

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
  query: "",
  selectedThreadId: null,
  user: { name: "Du", bio: "Mitglied" },
  threads: [],
  access: {},
  members: {},
  chats: {},
  owners: {},
  permissions: {}
};

const storageKey = "galactic-forum-local-session-v1";
let backendAvailable = false;

const els = {
  unitTabs: document.querySelector("#unitTabs"),
  accessPanel: document.querySelector("#accessPanel"),
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
  profileInitial: document.querySelector("#profileInitial"),
  threadCount: document.querySelector("#threadCount"),
  replyCount: document.querySelector("#replyCount"),
  activeCategory: document.querySelector("#activeCategory"),
  navItems: document.querySelectorAll(".nav-item"),
  membersPanel: document.querySelector("#membersPanel"),
  chatPanel: document.querySelector("#chatPanel"),
  memberDialog: document.querySelector("#memberDialog"),
  memberForm: document.querySelector("#memberForm"),
  memberName: document.querySelector("#memberName"),
  memberSerial: document.querySelector("#memberSerial"),
  memberRank: document.querySelector("#memberRank"),
  accessDialog: document.querySelector("#accessDialog"),
  accessForm: document.querySelector("#accessForm"),
  accessTitle: document.querySelector("#accessTitle"),
  accessCopy: document.querySelector("#accessCopy"),
  accessCallsign: document.querySelector("#accessCallsign"),
  accessCode: document.querySelector("#accessCode"),
  accessError: document.querySelector("#accessError")
};

async function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    state.user = parsed.user || state.user;
    state.access = parsed.access || {};
  }

  try {
    const response = await fetch("./api/state", { cache: "no-store" });
    if (response.ok) {
      const payload = await response.json();
      const shared = payload.state;
      backendAvailable = true;
      state.threads = shared?.threads || seedThreads;
      state.members = shared?.members || {};
      state.chats = shared?.chats || {};
      state.owners = shared?.owners || {};
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
    state.members = parsed.members || {};
    state.chats = parsed.chats || {};
    state.owners = parsed.owners || {};
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
      members: state.members,
      chats: state.chats,
      owners: state.owners,
      permissions: state.permissions
    })
  );

  if (!backendAvailable) return;

  fetch("./api/state", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      threads: state.threads,
      members: state.members,
      chats: state.chats,
      owners: state.owners,
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
  return Boolean(unit?.public || state.access[unitId]);
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

function getChatMessages(unitId = state.activeUnit) {
  return state.chats[unitId] || [];
}

function setMembers(unitId, members) {
  state.members[unitId] = members;
  saveState();
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

function clearSeedData() {
  state.threads = state.threads.filter((thread) => !seedThreadTitles.has(thread.title));
  saveState();
  renderAll();
}

function rankLabel(rank) {
  return `${rank.name} (${rank.code})`;
}

function normalizeName(value) {
  return value.trim().toLowerCase();
}

function isOwner(unitId = state.activeUnit) {
  return Boolean(state.owners[unitId]?.includes(normalizeName(state.user.name)));
}

function getUserPermissions(unitId = state.activeUnit) {
  if (isOwner(unitId)) return { records: true, promote: true, rights: true };
  return state.permissions[unitId]?.[normalizeName(state.user.name)] || { records: false, promote: false, rights: false };
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
        thread.unit,
        thread.author,
        thread.tags.join(" "),
        thread.replies.map((reply) => reply.body).join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

function renderUnitTabs() {
  els.unitTabs.innerHTML = units
    .map((unit) => {
      const active = unit.id === state.activeUnit ? " active" : "";
      const locked = !hasAccess(unit.id) ? " locked" : "";
      const marker = unit.public || hasAccess(unit.id) ? "" : " <span>LOCK</span>";
      return `<button class="unit-tab${active}${locked}" data-unit="${unit.id}">${unit.name}${marker}</button>`;
    })
    .join("");
}

function renderAccessPanel() {
  const unit = getUnit(state.activeUnit);
  const access = state.access[state.activeUnit];
  if (unit.public) {
    els.accessPanel.innerHTML = `<strong>Offener Holonet-Kanal</strong><span>Einheitsbereiche erfordern eine Registerpruefung.</span>`;
    return;
  }
  els.accessPanel.innerHTML = `<strong>${escapeHtml(unit.name)} Zugriff bestaetigt</strong><span>${escapeHtml(access.callsign)} - Register ${escapeHtml(access.code)}</span>`;
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
  if (state.activeUnit !== "Holonet" && (state.category === "Mitgliederakten" || state.category === "Chat")) {
    renderStats([]);
    els.threadList.innerHTML = "";
    return;
  }

  const threads = getFilteredThreads();
  renderStats(threads);

  if (!threads.length) {
    els.threadList.innerHTML = `<div class="empty-state">Keine passenden Transmissionen in ${escapeHtml(state.activeUnit)} gefunden.</div>`;
    return;
  }

  els.threadList.innerHTML = threads
    .map(
      (thread) => `
        <article class="thread-card" data-thread-id="${thread.id}">
          <header>
            <div>
              <h3>${escapeHtml(thread.title)}</h3>
              <div class="meta-row">
                <span>${escapeHtml(thread.unit)}</span>
                <span>${escapeHtml(thread.category)}</span>
                <span>${escapeHtml(thread.author)}</span>
                <span>${formatTime(thread.createdAt)}</span>
              </div>
            </div>
            <button class="ghost-icon-button save-button" data-action="save" aria-label="Merken">${thread.saved ? "+" : "-"}</button>
          </header>
          <p>${escapeHtml(thread.body)}</p>
          <div class="tag-row">
            ${thread.tags.map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="action-row">
            <button class="chip-button ${thread.liked ? "liked" : ""}" data-action="like">Signal ${thread.likes}</button>
            <button class="chip-button" data-action="open">Antworten ${thread.replies.length}</button>
            ${isOwner() ? `<button class="chip-button danger" data-action="delete">Loeschen</button>` : ""}
          </div>
        </article>
      `
    )
    .join("");
}

function renderMembersPanel() {
  if (state.activeUnit === "Holonet" || state.category !== "Mitgliederakten") {
    els.membersPanel.innerHTML = "";
    return;
  }

  const members = getMembers();
  const rankMap = Object.fromEntries(getFlatRanks(state.activeUnit).map((rank) => [rank.code, rank]));
  const rights = getUserPermissions();
  const permissionMap = state.permissions[state.activeUnit] || {};

  els.membersPanel.innerHTML = `
    <div class="members-header">
      <div>
        <strong>${escapeHtml(state.activeUnit)} Mitgliederliste</strong>
        <span>${members.length} aktive Personalakten - ${isOwner() ? "Owner-Konsole aktiv" : "Rechte: Akten " + (rights.records ? "ja" : "nein") + ", Rang " + (rights.promote ? "ja" : "nein")}</span>
      </div>
      ${canManageRecords() ? `<button class="chip-button" id="addMemberButton" type="button">Akte +</button>` : ""}
    </div>
    ${
      isOwner() && members.length
        ? `<section class="rights-panel">
            <strong>Rechteverwaltung</strong>
            <button class="chip-button danger" id="clearSeedDataButton" type="button">Testdaten bereinigen</button>
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
      members.length
        ? `<div class="member-grid">
            ${members
              .map((member) => {
                const rank = rankMap[member.rankCode] || getFlatRanks(state.activeUnit).at(-1);
                return `
                  <article class="member-card" data-member-id="${member.id}">
                    <header>
                      <div>
                        <h3>${escapeHtml(member.name)}</h3>
                        <span>${escapeHtml(member.serial)} - ${escapeHtml(rankLabel(rank))}</span>
                      </div>
                    </header>
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
                    <div class="action-row">
                      ${canPromoteMembers() ? `<button class="chip-button" data-member-action="promote" type="button">Befoerdern</button>` : ""}
                      ${canPromoteMembers() ? `<button class="chip-button" data-member-action="demote" type="button">Degradieren</button>` : ""}
                      ${canManageRecords() ? `<button class="chip-button danger" data-member-action="delete" type="button">Akte loeschen</button>` : ""}
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>`
        : `<div class="empty-state">Noch keine Personalakten fuer diese Einheit.</div>`
    }
  `;
}

function renderChatPanel() {
  if (state.activeUnit === "Holonet" || state.category !== "Chat") {
    els.chatPanel.innerHTML = "";
    return;
  }

  const messages = getChatMessages();
  els.chatPanel.innerHTML = `
    <div class="chat-header">
      <div>
        <strong>${escapeHtml(state.activeUnit)} Einheitschat</strong>
        <span>Interner RP-Funkkanal</span>
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

function renderDetail() {
  const thread = state.threads.find((item) => item.id === state.selectedThreadId);
  if (!thread) return;

  els.detailTitle.textContent = thread.title;
  els.detailMeta.innerHTML = `
    <span>${escapeHtml(thread.unit)}</span>
    <span>${escapeHtml(thread.category)}</span>
    <span>${escapeHtml(thread.author)}</span>
    <span>${formatTime(thread.createdAt)}</span>
    <span>Signal ${thread.likes}</span>
  `;
  els.detailBody.textContent = thread.body;
  els.saveThreadButton.textContent = thread.saved ? "+" : "-";
  els.replyStack.innerHTML = thread.replies.length
    ? thread.replies
        .map(
          (reply) => `
            <div class="reply">
              <strong>${escapeHtml(reply.author)} - ${formatTime(reply.createdAt)}</strong>
              <p>${escapeHtml(reply.body)}</p>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state">Noch keine Antworten im Sektor.</div>`;
}

function renderAll() {
  renderUnitTabs();
  renderAccessPanel();
  renderTabs();
  renderNav();
  renderMembersPanel();
  renderChatPanel();
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
    return { ...member, rankCode: ranks[nextIndex].code };
  });
  setMembers(state.activeUnit, members);
  renderMembersPanel();
}

function bindEvents() {
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
    renderThreadFormOptions();
    renderAll();
  });

  els.accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const unit = getUnit(state.pendingUnit);
    const code = els.accessCode.value.trim().toUpperCase();
    const callsign = els.accessCallsign.value.trim();

    if (!unit || (code !== unit.code && code !== ownerCode)) {
      els.accessError.textContent = "Register abgelehnt: Kennung gehoert nicht zu dieser Einheit.";
      return;
    }

    state.access[unit.id] = { callsign, code: code === ownerCode ? "OWNER" : code, approvedAt: Date.now() };
    if (code === ownerCode) {
      state.owners[unit.id] ||= [];
      const ownerName = normalizeName(callsign);
      if (!state.owners[unit.id].includes(ownerName)) state.owners[unit.id].push(ownerName);
    }
    state.user.name = callsign;
    state.user.bio = code === ownerCode ? `${unit.name} Owner` : unit.name;
    state.activeUnit = unit.id;
    state.category = "Alle";
    saveState();
    els.accessDialog.close();
    renderThreadFormOptions();
    renderAll();
  });

  els.membersPanel.addEventListener("click", (event) => {
    if (event.target.closest("#clearSeedDataButton")) {
      if (!isOwner()) return;
      clearSeedData();
      return;
    }

    if (event.target.closest("#addMemberButton")) {
      if (!canManageRecords()) return;
      renderMemberRankOptions();
      els.memberForm.reset();
      els.memberDialog.showModal();
      return;
    }

    const actionButton = event.target.closest("[data-member-action]");
    if (!actionButton) return;
    const card = event.target.closest(".member-card");
    if (actionButton.dataset.memberAction === "delete") {
      if (!canManageRecords()) return;
      deleteMember(card.dataset.memberId);
      return;
    }
    if (!canPromoteMembers()) return;
    const direction = actionButton.dataset.memberAction === "promote" ? -1 : 1;
    changeMemberRank(card.dataset.memberId, direction);
  });

  els.membersPanel.addEventListener("change", (event) => {
    const rightsCheckbox = event.target.closest('input[type="checkbox"][data-right]');
    if (rightsCheckbox) {
      if (!isOwner()) return;
      const row = event.target.closest(".rights-row");
      setPermission(state.activeUnit, row.dataset.rightsName, rightsCheckbox.dataset.right, rightsCheckbox.checked);
      renderMembersPanel();
      return;
    }

    const checkbox = event.target.closest('input[type="checkbox"][data-training]');
    if (!checkbox) return;
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

  els.memberForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageRecords()) return;
    const members = getMembers();
    members.unshift({
      id: crypto.randomUUID(),
      name: els.memberName.value.trim(),
      serial: els.memberSerial.value.trim(),
      rankCode: els.memberRank.value,
      trainings: trainingTemplates.map((name) => ({ name, done: false })),
      createdAt: Date.now()
    });
    setMembers(state.activeUnit, members);
    els.memberDialog.close();
    renderMembersPanel();
  });

  els.tabs.addEventListener("click", (event) => {
    const button = event.target.closest(".tab");
    if (!button) return;
    state.category = button.dataset.category;
    renderThreadFormOptions();
    renderTabs();
    renderMembersPanel();
    renderChatPanel();
    renderThreads();
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderThreads();
  });

  els.threadList.addEventListener("click", (event) => {
    const card = event.target.closest(".thread-card");
    if (!card) return;
    const action = event.target.closest("button")?.dataset.action;
    const threadId = card.dataset.threadId;

    if (action === "like") {
      updateThread(threadId, (thread) => {
        thread.liked = !thread.liked;
        thread.likes += thread.liked ? 1 : -1;
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
      if (!isOwner()) return;
      deleteThread(threadId);
      return;
    }

    openThread(threadId);
  });

  els.newThreadButton.addEventListener("click", () => {
    if (state.activeUnit !== "Holonet" && state.category === "Mitgliederakten") {
      if (!canManageRecords()) return;
      renderMemberRankOptions();
      els.memberForm.reset();
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
      thread.replies.push({
        id: crypto.randomUUID(),
        author: state.user.name,
        body: els.replyBody.value.trim(),
        createdAt: Date.now()
      });
      return thread;
    });
    els.replyForm.reset();
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
    saveState();
    renderAll();
    els.profileDialog.close();
  });

  els.navItems.forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      renderNav();
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
  await loadState();
  renderThreadFormOptions();
  renderAll();
  bindEvents();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js?v=13").catch(() => {});
  }
}

boot();
