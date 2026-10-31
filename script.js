const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const authModal = document.getElementById("authModal");
const checkoutModal = document.getElementById("checkoutModal");
const authForm = document.getElementById("authForm");
const checkoutForm = document.getElementById("checkoutForm");
const toast = document.getElementById("toast");

let authMode = "register";
let selectedPlan = "Growth";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  setTimeout(() => {
    toast.classList.remove("visible");
  }, 3000);
}

function openModal(modal) {
  modal.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("visible");
  document.body.style.overflow = "";
}

function updateAuthModal() {
  const title = document.getElementById("authTitle");
  const subtitle = document.getElementById("authSubtitle");
  const nameField = document.getElementById("nameField");
  const submit = document.getElementById("authSubmit");
  const switchText = document.getElementById("switchText");
  const switchButton = document.getElementById("switchAuth");

  if (authMode === "register") {
    title.textContent = "Create your account";
    subtitle.textContent = "Start building with $100 in free cloud credits.";
    nameField.style.display = "block";
    submit.textContent = "Create account";
    switchText.textContent = "Already have an account?";
    switchButton.textContent = "Log in";
  } else {
    title.textContent = "Welcome back";
    subtitle.textContent = "Log in to access your Nimbus dashboard.";
    nameField.style.display = "none";
    submit.textContent = "Log in";
    switchText.textContent = "Don't have an account?";
    switchButton.textContent = "Create one";
  }
}

document.querySelectorAll("[data-open-modal]").forEach(button => {
  button.addEventListener("click", () => {
    const modalName = button.dataset.openModal;

    if (modalName === "login") {
      authMode = "login";
      updateAuthModal();
      openModal(authModal);
    }

    if (modalName === "register") {
      authMode = "register";
      updateAuthModal();
      openModal(authModal);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
  button.addEventListener("click", () => {
    closeModal(authModal);
    closeModal(checkoutModal);
  });
});

[authModal, checkoutModal].forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.getElementById("switchAuth").addEventListener("click", () => {
  authMode = authMode === "register" ? "login" : "register";
  updateAuthModal();
});

authForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  closeModal(authModal);

  if (authMode === "register") {
    showToast(`Welcome to Nimbus${name ? `, ${name}` : ""}!`);
  } else {
    showToast(`Logged in as ${email}`);
  }

  setTimeout(() => {
    showDashboard();
  }, 700);
});

function showDashboard() {
  const dashboard = document.createElement("section");

  dashboard.className = "dashboard-overlay";
  dashboard.innerHTML = `
    <div class="dashboard-shell">
      <div class="dashboard-sidebar">
        <a class="logo" href="#">
          <span class="logo-mark">N</span>
          Nimbus
        </a>

        <nav>
          <a class="active" href="#"><span>▦</span> Overview</a>
          <a href="#"><span>◈</span> Compute</a>
          <a href="#"><span>◉</span> Databases</a>
          <a href="#"><span>▤</span> Storage</a>
          <a href="#"><span>⌁</span> Functions</a>
          <a href="#"><span>◌</span> Monitoring</a>
        </nav>

        <button class="dashboard-logout">Log out</button>
      </div>

      <div class="dashboard-main">
        <div class="dashboard-topbar">
          <div>
            <span class="dashboard-kicker">Workspace / Overview</span>
            <h1>Good morning, Alex.</h1>
          </div>
          <button class="button button-primary dashboard-deploy">+ Deploy resource</button>
        </div>

        <div class="dashboard-stats">
          <div class="dashboard-stat">
            <span>Monthly spend</span>
            <strong>$42.18</strong>
            <small class="positive">↓ 12.4% from last month</small>
          </div>
          <div class="dashboard-stat">
            <span>Active resources</span>
            <strong>8</strong>
            <small>Across 3 regions</small>
          </div>
          <div class="dashboard-stat">
            <span>Bandwidth usage</span>
            <strong>682 GB</strong>
            <small>Of 2 TB included</small>
          </div>
          <div class="dashboard-stat">
            <span>Uptime</span>
            <strong>99.99%</strong>
            <small class="positive">All systems operational</small>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="dashboard-panel resources-panel">
            <div class="panel-header">
              <div>
                <h2>Your resources</h2>
                <p>Manage your deployed infrastructure.</p>
              </div>
              <button class="text-button">View all →</button>
            </div>

            <div class="resource-row">
              <div class="resource-icon blue">▣</div>
              <div class="resource-info">
                <strong>api-production</strong>
                <span>Compute · us-east-1</span>
              </div>
              <span class="resource-status"><i></i> Running</span>
              <span class="resource-cost">$18.40</span>
            </div>

            <div class="resource-row">
              <div class="resource-icon green">⌘</div>
              <div class="resource-info">
                <strong>main-database</strong>
                <span>PostgreSQL · us-east-1</span>
              </div>
              <span class="resource-status"><i></i> Healthy</span>
              <span class="resource-cost">$15.00</span>
            </div>

            <div class="resource-row">
              <div class="resource-icon orange">◒</div>
              <div class="resource-info">
                <strong>user-assets</strong>
                <span>Object Storage · global</span>
              </div>
              <span class="resource-status"><i></i> Healthy</span>
              <span class="resource-cost">$8.78</span>
            </div>
          </div>

          <div class="dashboard-panel activity-panel">
            <div class="panel-header">
              <div>
                <h2>Activity</h2>
                <p>Recent workspace events.</p>
              </div>
            </div>

            <div class="activity-item">
              <span class="activity-dot purple-dot"></span>
              <div><strong>Deployment completed</strong><small>api-production · 8 min ago</small></div>
            </div>

            <div class="activity-item">
              <span class="activity-dot green-dot"></span>
              <div><strong>Database backup completed</strong><small>main-database · 2 hours ago</small></div>
            </div>

            <div class="activity-item">
              <span class="activity-dot orange-dot"></span>
              <div><strong>Billing threshold reached</strong><small>Monthly usage · yesterday</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(dashboard);

  const dashboardStyles = document.createElement("style");

  dashboardStyles.textContent = `
    .dashboard-overlay {
      background: var(--bg);
      inset: 0;
      overflow: auto;
      position: fixed;
      z-index: 15;
    }

    .dashboard-shell {
      display: flex;
      min-height: 100vh;
    }

    .dashboard-sidebar {
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      padding: 28px 20px;
      width: 230px;
    }

    .dashboard-sidebar nav {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 55px;
    }

    .dashboard-sidebar nav a {
      border-radius: 7px;
      color: var(--muted);
      font-size: 13px;
      padding: 11px 12px;
    }

    .dashboard-sidebar nav a span {
      display: inline-block;
      margin-right: 10px;
      width: 16px;
    }

    .dashboard-sidebar nav a.active,
    .dashboard-sidebar nav a:hover {
      background: var(--surface-soft);
      color: var(--primary);
    }

    .dashboard-logout {
      background: transparent;
      color: var(--muted);
      font-size: 13px;
      margin-top: auto;
      padding: 10px;
      text-align: left;
    }

    .dashboard-main {
      margin: auto;
      max-width: 1250px;
      padding: 48px;
      width: 100%;
    }

    .dashboard-topbar {
      align-items: end;
      display: flex;
      justify-content: space-between;
      margin-bottom: 35px;
    }

    .dashboard-kicker {
      color: var(--muted);
      font-size: 12px;
    }

    .dashboard-topbar h1 {
      font-size: 32px;
      margin-top: 6px;
    }

    .dashboard-stats {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 16px;
    }

    .dashboard-stat,
    .dashboard-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 11px;
    }

    .dashboard-stat {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .dashboard-stat span,
    .dashboard-stat small {
      color: var(--muted);
      font-size: 12px;
    }

    .dashboard-stat strong {
      font-family: "Space Grotesk", sans-serif;
      font-size: 29px;
      margin: 10px 0 4px;
    }

    .dashboard-stat .positive,
    .positive {
      color: var(--green);
    }

    .dashboard-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: 1.4fr 0.8fr;
    }

    .dashboard-panel {
      padding: 24px;
    }

    .panel-header {
      align-items: start;
      display: flex;
      justify-content: space-between;
      margin-bottom: 22px;
    }

    .panel-header h2 {
      font-size: 17px;
    }

    .panel-header p {
      color: var(--muted);
      font-size: 12px;
      margin-top: 4px;
    }

    .text-button {
      background: transparent;
      color: var(--primary);
      font-size: 12px;
    }

    .resource-row {
      align-items: center;
      border-top: 1px solid var(--border);
      display: grid;
      gap: 12px;
      grid-template-columns: 35px 1fr auto auto;
      padding: 17px 0;
    }

    .resource-icon {
      align-items: center;
      border-radius: 7px;
      display: flex;
      height: 33px;
      justify-content: center;
      width: 33px;
    }

    .resource-info {
      display: flex;
      flex-direction: column;
    }

    .resource-info strong {
      font-size: 13px;
    }

    .resource-info span,
    .resource-cost {
      color: var(--muted);
      font-size: 11px;
    }

    .resource-status {
      color: var(--green);
      font-size: 11px;
    }

    .resource-status i {
      background: var(--green);
      border-radius: 50%;
      display: inline-block;
      height: 6px;
      margin-right: 4px;
      width: 6px;
    }

    .activity-item {
      align-items: start;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 12px;
      padding: 17px 0;
    }

    .activity-item strong,
    .activity-item small {
      display: block;
    }

    .activity-item strong {
      font-size: 12px;
    }

    .activity-item small {
      color: var(--muted);
      font-size: 11px;
      margin-top: 4px;
    }

    .activity-dot {
      border-radius: 50%;
      height: 9px;
      margin-top: 5px;
      width: 9px;
    }

    .purple-dot { background: var(--primary); }
    .green-dot { background: var(--green); }
    .orange-dot { background: #e78722; }

    @media (max-width: 900px) {
      .dashboard-sidebar {
        display: none;
      }

      .dashboard-main {
        padding: 25px 18px;
      }

      .dashboard-stats,
      .dashboard-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 600px) {
      .dashboard-topbar {
        align-items: start;
        flex-direction: column;
        gap: 18px;
      }

      .dashboard-stats,
      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .resource-row {
        grid-template-columns: 35px 1fr auto;
      }

      .resource-cost {
        display: none;
      }
    }
  `;

  document.head.appendChild(dashboardStyles);

  dashboard.querySelector(".dashboard-logout").addEventListener("click", () => {
    dashboard.remove();
    showToast("You have been logged out.");
  });

  dashboard.querySelector(".dashboard-deploy").addEventListener("click", () => {
    showToast("Deployment flow opened — demo mode.");
  });
}

themeToggle.addEventListener("click", () => {
  const isDark = body.dataset.theme === "dark";

  if (isDark) {
    delete body.dataset.theme;
    themeToggle.textContent = "☾";
    localStorage.setItem("nimbus-theme", "light");
  } else {
    body.dataset.theme = "dark";
    themeToggle.textContent = "☀";
    localStorage.setItem("nimbus-theme", "dark");
  }
});

if (localStorage.getItem("nimbus-theme") === "dark") {
  body.dataset.theme = "dark";
  themeToggle.textContent = "☀";
}

document.querySelectorAll(".billing-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".billing-option").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const yearly = button.dataset.billing === "yearly";

    document.querySelectorAll(".monthly-price").forEach(price => {
      price.classList.toggle("hidden", yearly);
    });

    document.querySelectorAll(".yearly-price").forEach(price => {
      price.classList.toggle("hidden", !yearly);
    });
  });
});

document.querySelectorAll(".checkout-button").forEach(button => {
  button.addEventListener("click", () => {
    selectedPlan = button.dataset.plan;

    document.getElementById("checkoutPlan").textContent = selectedPlan;
    document.getElementById("checkoutPlanName").textContent =
      selectedPlan === "Growth"
        ? "Growth — $29/month"
        : "Scale — $99/month";

    openModal(checkoutModal);
  });
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();
  closeModal(checkoutModal);
  showToast(`Demo checkout completed for the ${selectedPlan} plan.`);
});

const computeRange = document.getElementById("computeRange");
const storageRange = document.getElementById("storageRange");
const bandwidthRange = document.getElementById("bandwidthRange");
const databaseSelect = document.getElementById("databaseSelect");

function updateCalculator() {
  const compute = Number(computeRange.value);
  const storage = Number(storageRange.value);
  const bandwidth = Number(bandwidthRange.value);
  const database = Number(databaseSelect.value);

  const total = compute * 12 + storage * 0.12 + bandwidth * 8 + database;

  document.getElementById("computeValue").textContent = compute;
  document.getElementById("storageValue").textContent = `${storage} GB`;
  document.getElementById("bandwidthValue").textContent = `${bandwidth} TB`;
  document.getElementById("totalCost").textContent = `$${total.toFixed(2)}`;
}

[computeRange, storageRange, bandwidthRange, databaseSelect].forEach(input => {
  input.addEventListener("input", updateCalculator);
});

updateCalculator();

document.getElementById("mobileMenuButton").addEventListener("click", () => {
  const links = document.querySelector(".nav-links");

  if (links.style.display === "flex") {
    links.style.display = "";
  } else {
    links.style.background = "var(--surface)";
    links.style.border = "1px solid var(--border)";
    links.style.borderRadius = "10px";
    links.style.display = "flex";
    links.style.flexDirection = "column";
    links.style.gap = "0";
    links.style.padding = "10px";
    links.style.position = "absolute";
    links.style.right = "18px";
    links.style.top = "120px";
    links.style.zIndex = "10";
  }
});
