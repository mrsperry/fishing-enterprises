class main_menu {
    static initialize() {
        // Load CSS
        css.load(["main_menu"]);

        // Create a parent element
        const parent = $("<div>")
            .attr("id", "main-menu-content")
            .appendTo($("#content"));

        // Load the banner image
        $("<img>")
            .attr("id", "banner-image")
            .attr("src", "images/banner-light.png")
            .appendTo(parent);

        // Create the header text
        const header = $("<h1>")
            .text("Fishing Enterprises")
            .appendTo(parent);
        $("<div>")
            .addClass("line-break")
            .appendTo(header);

        // Create the menu buttons
        new button({
            parent: parent,
            text: "Start Game",
            on_click: main_menu.start_game
        });
        new button({
            parent: parent,
            text: "Load Game",
            on_click: main_menu.load_game
        });
        new button({
            parent: parent,
            text: "Settings",
            on_click: settings_menu.show
        });
        new button({
            parent: parent,
            text: "About",
            on_click: about_menu.show
        });
        new button({
            parent: parent,
            text: "More Games",
            on_click: () => {
                window.open("https://mrsperry.github.io", "_blank");
            }
        });
    }

    static start_game() {
        // Fade out main menu and start the game
        main.transition(() => {
            // Load messenger
            messenger.initialize();

            fishing.initialize("lake");
            window.setInterval(main.update, 1000);

            // Fade in the bottom section
            const parent = $("#bottom-section")
                .hide()
                .fadeIn();
            // Create the footer
            $("<span>")
                .html("- <a onclick='settings_menu.show()'>Settings</a>"
                    + " | <a onclick='about_menu.show()'>About</a>"
                    + " | <a onclick='support_menu.show()'>Support me</a>"
                    + " | <a href='https://github.com/mrsperry/mrsperry.github.io/' target='_blank'>Github</a> -")
                .appendTo(parent);
        });
    }

    static load_game() {

    }
}