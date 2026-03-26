let url = window.location.href;

if (url.match("/shorts/")) {
  url = url.replace("shorts/", "watch?v=");
  window.location.replace(url);
}

const shortsMarkerSelector =
  '[is-shorts], ytd-reel-shelf-renderer, ytd-shorts-lockup-view-model, a[href*="/shorts/"]';

const shortsContainerSelector =
  "ytd-rich-section-renderer, ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-reel-shelf-renderer, ytd-reel-item-renderer";

function hideShortsElement(element) {
  const container = element.closest(shortsContainerSelector);

  if (container instanceof HTMLElement) {
    container.style.setProperty("display", "none", "important");
    return;
  }

  if (element instanceof HTMLElement && element.hasAttribute("is-shorts")) {
    element.style.setProperty("display", "none", "important");
  }
}

function hideShortsIn(root) {
  if (!(root instanceof Element) && root !== document) {
    return;
  }

  if (root instanceof Element && root.matches(shortsMarkerSelector)) {
    hideShortsElement(root);
  }

  root.querySelectorAll(shortsMarkerSelector).forEach(hideShortsElement);
}

function hideInitialShortsUi() {
  hideShortsIn(document);
}

function handleMutations(mutations) {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) {
        return;
      }

      if (
        node.matches(shortsMarkerSelector) ||
        node.querySelector(shortsMarkerSelector)
      ) {
        hideShortsIn(node);
      }
    });
  });
}

const observer = new MutationObserver(handleMutations);

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hideInitialShortsUi);
} else {
  hideInitialShortsUi();
}
