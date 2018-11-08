var lake = {
    internal: "lake",

    is_fishing: false,

    initialize() {
        main.switch_area(this);

        // initialize buttons
        let parent = $("#resource_buttons");
        $("<button>")
            .attr("id", "forage_for_worms_button")
            .text("Forage for worms")
            .click(function() {
                main.catch(resources.bait.worms, true);
                $("#cast_out_line_button")
                    .prop("disabled", false);
            })
            .fadeIn()
            .appendTo(parent);

        let fishing_buttons = $("<div>")
            .attr("id", "fishing_buttons")
            .appendTo(parent);
        $("<button>")
            .attr("id", "cast_out_line_button")
            .text("Cast out line")
            .click(function() {
                lake.toggle_fishing();
            })
            .appendTo(fishing_buttons);
        $("<br>")
            .appendTo(fishing_buttons);
        $("<button>")
            .attr("id", "reel_in_line_button")
            .text("Reel in line")
            .prop("disabled", true)
            .click(function() {
                lake.toggle_fishing();
            })
            .appendTo(fishing_buttons);

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
        if (this.is_fishing) {
            // 60% chance for a bass/guppy
            // 30% chance for a sturgeon
            // 10% chance for a chub
            // hack because we can't use goto
            while (true) {
                if (main.random(1, 100) <= 60) {
                    let decrement = false;
                    if (main.random(1, 2) == 1) {
                        decrement = main.catch(resources.fish.bass, false);
                    } else {
                        if (resources.fish.bass.caught) {
                            decrement = main.catch(resources.bait.guppies, true);
                        }
                    }

                    if (decrement) {
                        resources.bait.worms.count--;
                    }

                    break;
                } else if (main.random(1, 100) <= 30) {
                    if (resources.bait.guppies.count > 0) {
                        if (resources.fish.bass.caught) {
                            if (main.catch(resources.fish.sturgeon, false)) {
                                resources.bait.worms.count--;
                                resources.bait.guppies.count--;
                            }
                        }
                    }

                    break;
                } else if (main.random(1, 100) <= 10) {
                    if (resources.bait.worms.count > 2 && resources.bait.guppies.count > 0) {
                        if (resources.fish.sturgeon.caught) {
                            if (main.catch(resources.fish.chub, false)) {
                                resources.bait.worms.count -= 3;
                                resources.bait.guppies.count--;
                            }
                        }
                    }

                    break;
                }
            }

            let worm_count = $("#worms_count")
                .text(resources.bait.worms.count);
            if (resources.bait.worms.count != resources.bait.worms.max) {
                $(worm_count)
                    .css("opacity", 1);
            }

            let guppy_count = $("#guppies_count")
                .text(resources.bait.guppies.count);
            if (resources.bait.guppies.count != resources.bait.guppies.max) {
                $(guppy_count)
                    .css("opacity", 1);
            }

            // cancel fishing if you have no worms
            if (resources.bait.worms.count == 0) {
                this.toggle_fishing();

                messenger.write_message("won't catch much without any worms...");
            }
        }
    },

    toggle_fishing() {
        $("#cast_out_line_button")
            .prop("disabled", !this.is_fishing || !(resources.bait.worms.count > 0));
        $("#reel_in_line_button")
            .prop("disabled", this.is_fishing);
        $("#forage_for_worms_button")
            .prop("disabled", !this.is_fishing);

        this.is_fishing = !this.is_fishing;
    }
}