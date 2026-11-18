# HA Community Icons

**HA Community Icons** adds a custom SVG icon set to Home Assistant. Its icon
prefix is `haci:`, for example `haci:car-trailer`.

- Repository: <https://github.com/patrykss/ha-community-icons>
- Author: [@patrykss](https://github.com/patrykss)
- Domain: `haci`

## Installation

### HACS / Home Assistant Marketplace

1. Open HACS (or the Home Assistant Marketplace in versions where it is built in).
2. Add a custom repository using:
   `https://github.com/patrykss/ha-community-icons`
3. Select **Integration** as the repository category/type.
4. Install **HA Community Icons**.
5. Restart Home Assistant.
6. Open **Settings → Devices & services → Add integration**.
7. Search for **HA Community Icons** and add it.
8. Refresh the Home Assistant page (hard refresh if the icon is not immediately visible).

### Manual installation

1. Copy `custom_components/haci` into your Home Assistant
   `config/custom_components/` directory.
2. Restart Home Assistant.
3. Open **Settings → Devices & services → Add integration**.
4. Search for **HA Community Icons** and add it.
5. Refresh the browser.

## Usage

Use the icon identifier anywhere Home Assistant accepts an icon:

```yaml
icon: haci:car-trailer
```

For example, in a dashboard card:

```yaml
type: tile
entity: sensor.example
icon: haci:car-trailer
name: Przyczepa
```

## Adding another SVG icon

The example icon is:

`custom_components/haci/www/icons/car-trailer.svg`

To add another icon, for example `camper.svg`:

1. Create `custom_components/haci/www/icons/camper.svg`.
2. Use a valid SVG with a `viewBox` and at least one `<path>` element with a `d` attribute.
3. Name the file using lowercase letters, numbers and hyphens. The filename (without `.svg`) becomes the icon name.
4. Commit and push the file to GitHub.
5. Update the integration through HACS/Marketplace, or copy the new file manually.
6. Refresh Home Assistant. If the icon remains cached, restart Home Assistant and hard-refresh the browser.

Then use:

```yaml
icon: haci:camper
```

### Minimal SVG template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M3 3h18v18H3z"/>
</svg>
```

### SVG rules

- Prefer a `viewBox="0 0 24 24"` so icons align with standard HA icons.
- Use one or more `<path d="...">` elements.
- The integration combines all path data into one icon path.
- Use `fill="currentColor"` semantics: do not hard-code a fill colour if the icon should follow the active Home Assistant theme.
- Avoid embedded raster images, external references, scripts, filters, masks, CSS and SVG features other than path geometry. They are not part of the iconset format.
- Keep the SVG paths inside the viewBox and use a square viewBox for predictable sizing.

## How it works

The integration serves its bundled `www` directory at `/haci` and registers
`www/iconset.js` as an extra Home Assistant frontend module. The module
registers the `haci` icon set through Home Assistant's `window.customIconsets`
API. When the frontend requests `haci:car-trailer`, the module loads
`/haci/icons/car-trailer.svg`, extracts its path data and returns it to HA.

The icon files are loaded on demand and cached in the browser for the current
page session. A missing or invalid icon is reported in the browser console.

## Repository layout

```text
ha-community-icons/
├── .github/
│   └── workflows/
│       └── validate.yml
├── custom_components/
│   └── haci/
│       ├── __init__.py
│       ├── config_flow.py
│       ├── const.py
│       ├── manifest.json
│       └── www/
│           ├── iconset.js
│           └── icons/
│               └── car-trailer.svg
├── hacs.json
├── LICENSE
└── README.md
```

## Development notes

- Bump `version` in `custom_components/haci/manifest.json` when publishing a release.
- The repository is prepared as a HACS/Marketplace custom integration repository.
- Custom integrations are community-maintained and are not part of Home Assistant Core.
