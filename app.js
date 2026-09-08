const installButtons = [
  document.getElementById("installBtn"),
  document.getElementById("installBtnBottom")
].filter(Boolean);

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButtons.forEach(btn => btn.hidden = false);
});

installButtons.forEach(btn => {
  btn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButtons.forEach(b => b.hidden = true);
  });
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  installButtons.forEach(btn => btn.hidden = true);
});

document.getElementById("year").textContent = new Date().getFullYear();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./service-worker.js");

      // Check for updates whenever the app is opened.
      registration.update();

      // If a newer SW is already waiting, show the update banner immediately.
      if (registration.waiting) showUpdateBanner(registration);

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            showUpdateBanner(registration);
          }
        });
      });
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

function showUpdateBanner(registration) {
  const banner = document.getElementById("updateBanner");
  const reloadBtn = document.getElementById("reloadBtn");
  banner.hidden = false;

  reloadBtn.onclick = () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    } else {
      window.location.reload();
    }
  };
}
