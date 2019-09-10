class main {
    // Current game version
    static version = "dev-0.3";

    // Enum of all states
    static states = {
        none: 0,
        fishing: 1,
        business: 2,
        enterprise: 3
    }

    // The current game state
    static state = main.states.none;

    static initialize() {
        // Hide the messenger
        $("#top-section")
            .hide();

        // Load default settings
        settings.initialize();
        // Load default theme
        themes.initialize();
        // Load the main menu
        main_menu.initialize();

        // Initialize data
        area_data.initialize();
        art_data.initialize();
        fishing_data.initialize();
        misc_data.initialize();

        window.setTimeout(main.update, 1000);
    }

    static update() {
        // Update the time played
        let time = settings.get("time-played");
        if (++time.seconds == 60) {
            time.minutes++;
            time.seconds = 0;
        }
        if (time.minutes == 60) {
            time.hours++;
            time.minutes = 0;
        }
        // Set the time played
        $("#time-played")
            // Write the hours or nothing if they are zero
            .text((time.hours == 0 ? "" : time.hours + ":")
                // Write the minutes (pad them if hours is greater than 0)
                + (time.hours == 0 ? time.minutes : utils.pad(time.minutes)) + ":"
                // Write the seconds
                + utils.pad(time.seconds));
        settings.set("time-played", time);

        switch (main.get_state()) {
            case 1:
                fishing.update();
                break;
        }
    }

    static transition(callback) {
        const content = $("#content");
        // Fade out all content
        content.fadeOut(400, () => {
            // Remove all content
            content.empty();

            // Add any content from the callback
            if (callback != null) {
                callback();
            }

            // Fade in content
            content.fadeIn();
        });
    }

    static get_state() {
        return main.state;
    }

    static set_state(state) {
        main.state = state;
    }

    static get_version() {
        return main.version;
    }
}