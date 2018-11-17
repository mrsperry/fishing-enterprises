var lake = {
    internal: "lake",
    state: null,

    initialize() {
        main.switch_area(this);

        button.create({
            parent: "resource_buttons",
            id: "forage_for_worms",
            text: "Forage for worms",
            on_click: function() {
                fishing.catch(resources.bait.worms, true);
                $("#cast_out_line_button")
                    .prop("disabled", false);
            }
        });

        this.state = new fishing.state([
            resources.bait.guppies,
            resources.fish.bass,
            resources.fish.sturgeon,
            resources.fish.chub
        ]);

        // only display fishing options if worms have been caught
        if (resources.bait.worms.caught) {
            $(fishing_buttons)
                .fadeIn();
        } else {
            $(fishing_buttons)
                .hide();
        }
    },

    update() {
        if (resources.bait.worms.caught) {
            fishing.update(this.state);

            // cancel fishing if you have no worms
            if (resources.bait.worms.count == 0 && this.state.is_fishing) {
                fishing.toggle_state(this.state);

                messenger.write_message("won't catch much without any worms...");
            }
        }
    },

    unload() {
        fishing.unload(this.state);
    },
}