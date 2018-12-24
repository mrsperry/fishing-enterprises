var lake = {
    internal: "lake",
    display: "Lake",
    workers: {
        license: "Local Group Control",
        description: "Send out \"influencers\" to spread false rumors about specific lakes to free them for your workers",
        check: "river"
    },
    purchased: {
        price: 100
    },

    initialize() {
        this.state = new fishing.state([
            resources.bait.minnows,
            resources.fish.bass,
            resources.fish.sturgeon,
            resources.fish.chub
        ]);
    },

    update() {
        if (resources.bait.worms.caught) {
            fishing.update(this.state);

            // cancel fishing if you have no worms
            if (resources.bait.worms.count == 0 && this.state.is_fishing) {
                fishing.toggle_state(this.state);

                messenger.write_message("won't catch much without any worms...", true);
            }
        }
    },

    load() {
        this.create_buttons();
    },

    unload() {
        fishing.unload(this.state);
    },

    create_buttons() {
        buttons.create({
            parent: "resource_buttons",
            id: "forage_for_worms",
            text: "Forage for worms",
            on_click: function() {
                fishing.catch(resources.bait.worms, true);
                $("#cast_out_line_button")
                    .prop("disabled", false);
                lake.show_buttons = true;
            },
            disabled: function() {
                return resources.bait.worms.count == resources.bait.worms.max;
            }
        });

        fishing.create_buttons();

        // only display fishing options if worms have been caught
        if (this.show_buttons != null && this.show_buttons) {
            $("#fishing_buttons")
                .fadeIn();
        } else {
            $("#fishing_buttons")
                .hide();
        }
    }
}