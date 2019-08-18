class main_menu {
    static initialize() {
        // Load CSS
        css.load(["main_menu"]);

        // Create a parent element
        let parent = $("<div>")
            .attr("id", "main-menu-content")
            .appendTo($("#content"));

        // Load the banner image
        $("<img>")
            .attr("src", "images/banner.png")
            .appendTo(parent);

        // Create the header text
        let header = $("<h1>")
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
            text: "Options",
            on_click: main_menu.show_options
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
            main.set_state(main.states.fishing);
            window.setInterval(main.update, 1000);
        });
    }

    static load_game() {

    }

    static show_options() {

    }

    static show_about() {

    }
}