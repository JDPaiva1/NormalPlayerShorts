let url = window.location.href;

if (url.match("/shorts/")) {
  url = url.replace("shorts/", "watch?v=");
  window.location.replace(url);
}

const injectedStyleId = "normal-player-shorts-hide-style";

function injectHideShortsStyle() {
  if (document.getElementById(injectedStyleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = injectedStyleId;
  style.textContent = `
    ytd-guide-entry-renderer[is-primary]:has(a[title="Shorts"]),
    ytd-mini-guide-entry-renderer:has(a[title="Shorts"]),
    ytd-reel-shelf-renderer,
    ytd-reel-item-renderer,
    ytd-rich-section-renderer:has([is-shorts]),
    ytd-rich-item-renderer:has([is-shorts], ytd-shorts-lockup-view-model, a[href*="/shorts/"]),
    ytd-grid-video-renderer:has([is-shorts], ytd-shorts-lockup-view-model, a[href*="/shorts/"]),
    ytd-video-renderer:has([is-shorts], ytd-shorts-lockup-view-model, a[href*="/shorts/"]),
    ytd-compact-video-renderer:has([is-shorts], ytd-shorts-lockup-view-model, a[href*="/shorts/"]) {
      display: none !important;
    }
  `;

  document.documentElement.append(style);
}

injectHideShortsStyle();
