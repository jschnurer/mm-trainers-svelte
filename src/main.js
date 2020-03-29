import App from './App.svelte';

const app = new App({
	target: document.body,
});

export default app;

if ("serviceWorker" in navigator && window.__settings.useServiceWorker) {
	navigator.serviceWorker.register(window.__settings.hostDir + "/service-worker.js");
}