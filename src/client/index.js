import { formHandler } from "./scripts/app";
import "./public/styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tripForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formHandler(event);
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

export { formHandler };
