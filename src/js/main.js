class Main {
    static async initialize() {
        Debug.initialize();
        await Modules.initialize();

        Modules.loadView("menus/main-menu", false);
    }

    static startGame() {
        Modules.loadView("footer", true);
        Modules.loadView("fishing", false);
    }

    static loadSettings() {
        Modules.loadView("menus/settings-menu", true);
    }
}