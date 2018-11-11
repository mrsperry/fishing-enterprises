var fishing = {
    state: function(fish) {
        this.is_fishing = false;

        this.cast_out_message = false;
        this.reel_in_message = false;

        this.fish = fish;

        let parent = $("#resource_buttons")

        let fishing_buttons = $("<div>")
            .attr("id", "fishing_buttons")
            .appendTo(parent);
        $("<button>")
            .attr("id", "cast_out_line_button")
            .text("Cast out line")
            .click(function() {
                fishing.toggle_state(main.area.state);
            })
            .appendTo(fishing_buttons);
        $("<br>")
            .appendTo(fishing_buttons);
        $("<button>")
            .attr("id", "reel_in_line_button")
            .text("Reel in line")
            .prop("disabled", true)
            .click(function() {
                fishing.toggle_state(main.area.state);
            })
            .appendTo(fishing_buttons);
    },

    update(state) {
        if (state.is_fishing) {
            // randomize fish order so chances aren't skewed
            for (let fish of main.shuffle(state.fish)) {
                // random chance to catch the fish
                if (main.random(1, 100) <= fish.chance) {
                    // make sure there is bait
                    let has_bait = true;
                    for (let bait of fish.bait) {
                        if (bait.amount > resources.bait[bait.type].count) {
                            has_bait = false;
                            break;
                        }
                    }
                    // go on to the next fish if theres no bait for this one
                    if (!has_bait) {
                        continue;
                    }

                    // check prerequesite fish
                    if (resources.fish[fish.after] == null || resources.fish[fish.after].caught) {
                        // check if the fish should append to bait
                        if (main.catch(fish, resources.bait[fish.internal] == null ? false : true)) {
                            // subtract the bait
                            for (let bait of fish.bait) {
                                resources.bait[bait.type].count -= bait.amount;
                            }
                        }

                        return;
                    }
                }
            }
        }
    },

    unload(state) {
        if (state.is_fishing) {
            fishing.toggle_state(this);
        }
    },

    toggle_state(state) {
        $("#cast_out_line_button")
            .prop("disabled", !state.is_fishing || !(resources.bait.worms.count > 0));
        $("#reel_in_line_button")
            .prop("disabled", state.is_fishing);
        $("#forage_for_worms_button")
            .prop("disabled", !state.is_fishing);

        if (state.is_fishing && !state.reel_in_message) {
            messenger.write_message("reeling in your line is always full of tedium");
            state.reel_in_message = true;
        } else if (!state.cast_out_message) {
            messenger.write_message("you cast out your line as far as your arm permits");
            state.cast_out_message = true;
        }

        state.is_fishing = !state.is_fishing;
    }
}