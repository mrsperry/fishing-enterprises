class Main {
    static async initialize() {
        Debug.initialize();
        await Modules.initialize();

        Modules.loadView("menus/main-menu", false);
    }

    static startGame() {
        Modules.loadView("fishing", false);
    }
}