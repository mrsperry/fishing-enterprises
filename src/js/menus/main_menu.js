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
            .attr("src", "images/banner.png")
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
            on_click: main_menu.show_settings
        });
        new button({
            parent: parent,
            text: "About",
            on_click: main_menu.show_about
        });
    }

    static start_game() {
        // Fade out main menu and start the game
        main.transition(() => {
            fishing_area.initialize("lake");
            window.setInterval(main.update, 1000);

            // Fade in the bottom section
            const parent = $("#bottom-section")
                .hide()
                .fadeIn();
            // Create the footer
            $("<span>")
                .html("- <a onclick=''>Lights off</a>"
                    + " | <a onclick=''>Settings</a>"
                    + " | <a onclick=''>About</a>"
                    + " | <a onclick=''>Support me</a>"
                    + " | <a href='https://github.com/mrsperry/mrsperry.github.io/' target='_blank'>Github</a> -")
                .appendTo(parent);
        });
    }

    static load_game() {

    }

    static show_settings() {

    }

    static show_about() {

    }
}