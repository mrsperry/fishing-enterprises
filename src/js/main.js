class Main {
    static async initialize() {
        Debug.initialize();
        await Modules.initialize();

        Modules.loadView("menus/main-menu", false);
    }

    static startGame() {
        Modules.loadView("footer", true);

        $.when(Modules.loadView("fishing", false)).done(() => {
            Areas.switchTo("lake", false);
        });
    }

    static loadMenu(type) {
        Modules.loadView("menus/" + type + "-menu", true);
    }
}