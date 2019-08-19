class settings {
    static map = {};

    // Set default settings
    static initialize() {
        // Theme to light
        settings.set("theme", 0);
        // Auto save interval to 10 minutes
        settings.set("auto-save-interval", 10);
        // Dev tools to disabled
        settings.set("dev-tools", false);
    }

    static set(key, value) {
        settings.map[key] = value;
    }

    static get(key) {
        return settings.map[key];
    }
}