class Main {
    static async initialize() {
        Debug.initialize();
        await Modules.initialize();
        Messenger.initialize();

        Modules.loadView("menus/main-menu");
    }

    static startGame() {
        $.when(Modules.loadView("fishing/messenger", null, ["#main-menu-container"])).done(() => {
            Modules.loadView("fishing/misc", null, null);
            Modules.loadView("fishing/fishing", null, null);
            Modules.loadView("footer", null, null);
            
            Fishing.initialize();
            Areas.switchTo("lake");
        });
    }

    static loadMenu(type) {
        Modules.loadView("menus/" + type + "-menu", "body", null);
    }
}