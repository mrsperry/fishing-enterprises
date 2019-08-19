class themes {
    static state = {
        light: 0,
        dark: 1,
        blue: 2
    }

    static current_state = themes.state.light;

    static switch_theme(state) {
        this.current_state = state;

        let theme = "light";
        switch (state) {
            case 1:
                theme = "dark";
                break;
            case 2:
                theme = "blue";
        }

        css.load_and_remove(["themes/" + theme], ["themes/"]);
    }
}