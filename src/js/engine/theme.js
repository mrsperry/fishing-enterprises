class Theme {
    static swapTheme(theme) {
        if (Theme.currentTheme == theme) {
            return;
        }

        Theme.currentTheme = theme;
        Modules.clearElements(".temp-css");
        Modules.loadCSS("themes/" + theme);

        // Update the settings menu
        for (const element of $("#settings-color-theme .modal-active")) {
            $(element).removeClass("modal-active");
        }

        $("#settings-color-theme-" + theme)
            .addClass("modal-active");

        // Update the main menu logo
        $("#main-menu-logo")
            .attr("src", "src/images/banner-" + theme + ".png");
    }
}