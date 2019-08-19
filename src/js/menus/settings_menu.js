class settings_menu {
    static show() {
        const popup = new modal("Settings");
        const box = popup.get_box();

        // Add color theme selection
        const theme = $("<div>")
            .addClass("modal-break")
            .text("Color theme: ")
            .appendTo(box);
        $("<span>")
            .attr("id", "theme-select-light")
            .addClass("bold")
            .text("light")
            .appendTo(theme);
        settings_menu.add_divider(theme);
        $("<span>")
            .attr("id", "theme-select-dark")
            .addClass("link")
            .text("dark")
            .appendTo(theme);
        settings_menu.add_divider(theme);
        $("<span>")
            .attr("id", "theme-select-blue")
            .addClass("link")
            .text("blue")
            .appendTo(theme);

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
        $("<span>")
            .attr("id", "auto-save-three")
            .addClass("link")
            .text("three")
            .appendTo(auto_save);
        settings_menu.add_divider(auto_save);
        $("<span>")
            .attr("id", "auto-save-five")
            .addClass("link")
            .text("five")
            .appendTo(auto_save);
        settings_menu.add_divider(auto_save);
        $("<span>")
            .attr("id", "auto-save-ten")
            .addClass("bold")
            .text("ten")
            .appendTo(auto_save);
        $("<span>")
            .text(") minutes")
            .appendTo(auto_save);

        // Add dev tools options
        const dev_tools = $("<div>")
            .addClass("modal-break")
            .text("Dev tools: ")
            .appendTo(box);
        $("<span>")
            .addClass("link")
            .text("enabled")
            .appendTo(dev_tools);
        settings_menu.add_divider(dev_tools);
        $("<span>")
            .addClass("bold")
            .text("disabled")
            .appendTo(dev_tools);

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
}