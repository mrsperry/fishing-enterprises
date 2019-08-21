class settings_menu {
    static show() {
        const popup = new modal("Settings");
        const box = popup.get_box();

        // Add color theme selection
        const theme = $("<div>")
            .addClass("modal-break")
            .text("Color theme: ")
            .appendTo(box);
        // Get the currently selected theme
        const selected = settings.get("theme");
        const colors = ["light", "dark", "blue"];
        for (const index in colors) {
            const type = colors[index];

            // Add a link
            $("<span>")
                .attr("id", "theme-select-" + type)
                .addClass(selected == type ? "bold" : "link")
                .text(type)
                .click(() => {
                    // Make sure you can't switch to the theme you're currently using
                    if (settings.get("theme") != type) {
                        // Switch the currently selected item in the menu
                        settings_menu.swap_select("theme-select-" + type, "theme-select-" + settings.get("theme"));

                        // Update CSS
                        themes.switch_theme(themes.state[type]);
                    }
                })
                .appendTo(theme);
            // Only add divider between elements
            if (index != 2) {
                settings_menu.add_divider(theme);
            }
        }

        // Add save options
        const saves = $("<div>")
            .text("Saves: ")
            .appendTo(box);
        $("<span>")
            .attr("id", "download-save")
            .addClass("link")
            .text("download save")
            .appendTo(saves);
        settings_menu.add_divider(saves);
        $("<span>")
            .attr("id", "load-save")
            .addClass("link")
            .text("load save")
            .appendTo(saves);
        settings_menu.add_divider(saves);
        $("<span>")
            .attr("id", "restart-game")
            .addClass("link")
            .text("restart game")
            .appendTo(saves);
        
        // Add auto-save options
        const auto_save = $("<div>")
            .addClass("modal-break")
            .text("Auto-save every: (")
            .appendTo(box);
        // Get the current interval
        const interval = settings.get("auto-save-interval");
        // List out interval names and actual times
        const intervals  = ["three", "3", "five", "5", "ten", "10"];
        for (let index = 0; index < intervals.length; index += 2) {
            // Get the time name
            const name = intervals[index];
            // Get the actual time
            const time = intervals[index + 1];

            $("<span>")
                .attr("id", "auto-save-" + time)
                .addClass(interval == time ? "bold" : "link")
                .text(name)
                .click(() => {
                    // Get the current time interval
                    const current = settings.get("auto-save-interval");
                    // Make sure you can't change the interval to what is already set
                    if (current != time) {
                        // Select the new time
                        settings_menu.swap_select("auto-save-" + time, "auto-save-" + current);

                        // Set the interval
                        settings.set("auto-save-interval", time);
                    }
                })
                .appendTo(auto_save);

            // Only add a divider between elements
            if (index != 4) {
                settings_menu.add_divider(auto_save);
            }
        }
        // Add the postfix
        $("<span>")
            .text(") minutes")
            .appendTo(auto_save);

        // Add dev tools options
        const dev_tools = $("<div>")
            .addClass("modal-break")
            .text("Dev tools: ")
            .appendTo(box);
        // Get the current enable state for dev tools
        const enabled = settings.get("dev-tools");
        const states = [true, false];
        for (const index in states) {
            const state = states[index];
            // Convert true/false to an ID
            const string = (state) => {
                return state ? "enabled" : "disabled";
            }

            $("<span>")
                .attr("id", "dev-tools-" + string(state))
                .addClass(state == enabled ? "bold" : "link")
                .text(string(state))
                .click(() => {
                    // Get the current enable state
                    const current_state = settings.get("dev-tools");

                    // Make sure you can't swap states when clicking the enabled state
                    if (state != current_state) {
                        // Select the new enable state
                        settings_menu.swap_select("dev-tools-" + string(state), "dev-tools-" + string(!state));

                        // Set the enable state
                        settings.set("dev-tools", !current_state);
                    }
                })
                .appendTo(dev_tools);

            // Only add dividers between content
            if (index != 1) {
                settings_menu.add_divider(dev_tools);
            }
        }

        // Add the current game version
        $("<div>")
            .addClass("modal-break")
            .text("Current version: " + main.get_version())
            .appendTo(box);

        popup.add_close_button();
    }

    static add_divider(parent) {
        $("<span>")
            .text(" | ")
            .appendTo(parent);
    }

    static swap_select(to, from) {
        $("#" + to)
            .addClass("bold")
            .removeClass("link");
        $("#" + from)
            .addClass("link")
            .removeClass("bold");
    }
}