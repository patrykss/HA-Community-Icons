/**
 * HA Community Icons
 * Exposes SVG files from /haci/icons as the Home Assistant "haci:" icon set.
 *
 * SVG files must contain one or more <path d="..."> elements and a viewBox.
 */
(() => {
  const ICON_BASE = "/haci/icons/";
  const cache = new Map();

  async function getIcon(name) {
    // Icon names are filenames without the .svg extension.
    if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) {
      throw new Error(`[haci] Invalid icon name: ${name}`);
    }

    if (!cache.has(name)) {
      const request = fetch(`${ICON_BASE}${encodeURIComponent(name)}.svg`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`[haci] Icon "${name}" not found (${response.status})`);
          }
          return response.text();
        })
        .then((source) => {
          const document = new DOMParser().parseFromString(source, "image/svg+xml");
          if (document.querySelector("parsererror")) {
            throw new Error(`[haci] Invalid SVG for icon "${name}"`);
          }

          const svg = document.documentElement;
          const paths = [...svg.querySelectorAll("path")]
            .map((path) => path.getAttribute("d"))
            .filter(Boolean);

          if (!paths.length) {
            throw new Error(`[haci] SVG "${name}" must contain at least one path with d`);
          }

          return {
            path: paths.join(" "),
            viewBox: svg.getAttribute("viewBox") || "0 0 24 24",
          };
        });

      cache.set(name, request);
    }

    try {
      return await cache.get(name);
    } catch (error) {
      cache.delete(name);
      throw error;
    }
  }

  window.customIconsets = window.customIconsets || {};
  window.customIconsets.haci = getIcon;
})();
