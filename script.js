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
    state: "Database overload", app: "App server", appLoad: "90% load",
    dbLoad: "150% load", recovered: false, label: "Where would you invest?",
    text: "Choose an upgrade to see what happens.",
  },
  servers: {
    state: "Still overloaded", app: "2 app servers", appLoad: "45% load each",
    dbLoad: "150% load", recovered: false, label: "The bottleneck stays.",
    text: "More app servers share app traffic, but the database stays overloaded. You pay more without fixing the bottleneck.",
  },
  cache: {
    state: "Room to breathe", app: "App server", appLoad: "90% load",
    dbLoad: "78% load", recovered: true, label: "Fewer reads hit the database.",
    text: "A warm read cache brings database load down to 78%. It takes time to warm up and helps reads, not writes.",
  },
  database: {
    state: "Room to breathe", app: "App server", appLoad: "90% load",
    dbLoad: "90% load", recovered: true, label: "More capacity. A bigger bill.",
    text: "A bigger database brings its load down to 90%. You gain capacity, but pay more every week.",
  },
};

const elements = {
  state: document.querySelector("#scenario-state"),
  dot: document.querySelector("#scenario-dot"),
  app: document.querySelector("#app-label"),
  appLoad: document.querySelector("#app-load"),
  dbLoad: document.querySelector("#db-load"),
  db: document.querySelector("#db-node"),
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
  elements.db.classList.toggle("recovered", scenario.recovered);
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
