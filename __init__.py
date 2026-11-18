"""HA Community Icons integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, ICONSET_URL, STATIC_URL

PLATFORMS: list[str] = []


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the integration."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Register the iconset and its static files."""
    if not hass.data.get(DOMAIN):
        static_dir = Path(__file__).parent / "www"
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(static_dir), False)]
        )
        frontend.add_extra_js_url(hass, ICONSET_URL)
        hass.data[DOMAIN] = True

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the config entry."""
    # Frontend resources are registered for the lifetime of the HA process.
    return True
