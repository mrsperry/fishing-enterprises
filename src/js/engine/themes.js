class themes {
    static state = {
        light: 0,
        dark: 1,
        blue: 2
    }

    static current_state;

    static initialize() {
        $("<link>")
            .attr("id", "css-theme")
            .attr("rel", "stylesheet")
            .attr("type", "text/css")
            .appendTo($("head"));

        themes.switch_theme(settings.get("theme"));
    }

    static switch_theme(state) {
        themes.current_state = state;

        let theme = "light";
        switch (state) {
            case 1:
                theme = "dark";
                break;
            case 2:
                theme = "blue";
        }

        settings.set("theme", theme);

        // Update the theme
        $("#css-theme")
            .attr("href", "src/css/themes/" + theme + ".css");
        // Swap the banner image if on the main menu
        $("#banner-image")
            .attr("src", "images/banner-" + theme + ".png");
    }
}