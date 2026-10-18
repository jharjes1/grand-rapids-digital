
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");
  
    const currentPage = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach(link => {
      if (link.dataset.nav === currentPage) link.classList.add("active");
    });
  
    const menuButton = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    if (menuButton && navbar) {
      menuButton.addEventListener("click", () => {
        navbar.classList.toggle("menu-open");
        menuButton.textContent = navbar.classList.contains("menu-open") ? "CLOSE" : "MENU";
      });
    }
  
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .12});
    revealItems.forEach(item => observer.observe(item));
  
    const projectButtons = document.querySelectorAll("[data-project]");
    const serviceSelect = document.querySelector("#serviceSelect");
    projectButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (serviceSelect) serviceSelect.value = button.dataset.project;
        document.querySelector("#projectForm")?.scrollIntoView({behavior:"smooth"});
      });
    });
  
    const form = document.querySelector("#projectForm");
    const formMessage = document.querySelector("#formMessage");
    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        const data = new FormData(form);
        const name = data.get("name") || "";
        const email = data.get("email") || "";
        const service = data.get("service") || "New Project";
        const budget = data.get("budget") || "Not specified";
        const message = data.get("message") || "";
        const subject = encodeURIComponent(`Grand Rapids Digital Project: ${service}`);
        const body = encodeURIComponent(
  `Name: ${name}
  
  Email: ${email}
  
  Service: ${service}
  
  Budget: ${budget}
  
  Project:
  ${message}`
        );
        window.location.href = `mailto:jamesharjes78@gmail.com?subject=${subject}&body=${body}`;
        if (formMessage) formMessage.textContent = "Opening your email client.";
      });
    }
  
    const terminal = document.querySelector("#terminalOverlay");
    const terminalTrigger = document.querySelector("#terminalTrigger");
    const terminalClose = document.querySelector("#closeTerminal");
    let clicks = 0;
    let timer;
    if (terminalTrigger && terminal) {
      terminalTrigger.addEventListener("click", () => {
        clicks++;
        clearTimeout(timer);
        timer = setTimeout(() => clicks = 0, 1400);
        if (clicks >= 5) {
          terminal.classList.add("active");
          clicks = 0;
        }
      });
    }
    if (terminalClose && terminal) {
      terminalClose.addEventListener("click", () => terminal.classList.remove("active"));
      terminal.addEventListener("click", e => {
        if (e.target === terminal) terminal.classList.remove("active");
      });
    }
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && terminal) terminal.classList.remove("active");
    });
  });
  