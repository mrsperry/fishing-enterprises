class Main {
    static async initialize() {
        Debug.initialize();
        await Modules.initialize();

        Modules.loadView("menus/main-menu");
    }
}