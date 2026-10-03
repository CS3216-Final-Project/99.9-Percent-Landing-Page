"use strict";

document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});
window.matchMedia("(max-width: 600px)").addEventListener("change", closeNavigation);

// Values follow the proposal's worked example. Every choice starts from the
// same overload; choices are alternatives, not cumulative purchases.
const scenarios = {
  initial: {
    state: "DATABASE OVERLOAD", app: "Application", appLoad: "90% load",
    dbLoad: "150% load", demand: "900 / 600 ops/s", meter: 100,
    recovered: false, cache: false, label: "THE SITUATION",
    text: "Your database is receiving more work than it can handle. Where would you invest?",
  },
  servers: {
    state: "BOTTLENECK REMAINS", app: "2 applications", appLoad: "45% load each",
    dbLoad: "150% load", demand: "900 / 600 ops/s", meter: 100,
    recovered: false, cache: false, label: "MORE SERVERS. SAME BOTTLENECK.",
    text: "Application load falls, but the database still receives 900 operations/s. Extra app servers don't increase database capacity. You've added cost without fixing this bottleneck.",
  },
  cache: {
    state: "DATABASE HAS HEADROOM", app: "Application", appLoad: "90% load",
    dbLoad: "78% load", demand: "468 / 600 ops/s", meter: 52,
    recovered: true, cache: true, label: "FEWER READS. MORE BREATHING ROOM.",
    text: "Once warm, a 60% hit rate on the 80% read workload reduces database demand to 468 operations/s. The trade-off: cache cost and warm-up time. Write-heavy traffic gets less benefit.",
  },
  database: {
    state: "DATABASE HAS HEADROOM", app: "Application", appLoad: "90% load",
    dbLoad: "90% load", demand: "900 / 1,000 ops/s", meter: 60,
    recovered: true, cache: false, label: "MORE CAPACITY. A BIGGER BILL.",
    text: "After the upgrade activates, 1,000 operations/s of capacity can handle the 900 operations/s demand. The trade-off: activation delay and a higher recurring bill. Demand itself hasn't changed.",
  },
};

const elements = {
  state: document.querySelector("#scenario-state"),
  dot: document.querySelector("#scenario-dot"),
  app: document.querySelector("#app-label"),
  appLoad: document.querySelector("#app-load"),
  dbLoad: document.querySelector("#db-load"),
  demand: document.querySelector("#db-demand"),
  meter: document.querySelector("#meter-fill"),
  db: document.querySelector("#db-node"),
  architecture: document.querySelector("#architecture"),
  cache: document.querySelector("#cache-node"),
  label: document.querySelector("#result-label"),
  text: document.querySelector("#result-text"),
};
const decisionButtons = document.querySelectorAll("[data-action]");

function showScenario(action) {
  const scenario = scenarios[action];
  elements.state.textContent = scenario.state;
  elements.dot.classList.toggle("dot-orange", !scenario.recovered);
  elements.state.style.color = scenario.recovered ? "var(--green)" : "var(--orange)";
  elements.app.textContent = scenario.app;
  elements.appLoad.textContent = scenario.appLoad;
  elements.dbLoad.textContent = scenario.dbLoad;
  elements.demand.textContent = scenario.demand;
  elements.meter.style.width = `${scenario.meter}%`;
  elements.meter.style.background = scenario.recovered
    ? "var(--green)"
    : "linear-gradient(90deg, #83ad61 66.6%, #f5a36c 66.6%)";
  elements.db.classList.toggle("recovered", scenario.recovered);
  elements.architecture.classList.toggle("has-cache", scenario.cache);
  elements.cache.setAttribute("aria-hidden", String(!scenario.cache));
  elements.label.textContent = scenario.label;
  elements.text.textContent = scenario.text;
  decisionButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.action === action));
  });
}

decisionButtons.forEach((button) => {
  button.addEventListener("click", () => showScenario(button.dataset.action));
});
document.querySelector("#reset-scenario").addEventListener("click", () => showScenario("initial"));
