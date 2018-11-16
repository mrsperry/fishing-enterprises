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
                    // make sure there is tackle
                    let has_tackle = true;
                    for (let tackle of fish.tackle) {
                        if (tackle.amount > resources.tackle[tackle.type].count) {
                            has_tackle = false;
                            break;
                        }
                    }

                    // go on to the next fish if theres no bait or tackle for this one
                    if (!has_bait || !has_tackle) {
                        continue;
                    }

                    // check prerequesite fish
                    if (resources.fish[fish.after] == null || resources.fish[fish.after].caught) {
                        // check if the fish should append to bait
                        if (fishing.catch(fish, resources.bait[fish.internal] == null ? false : true)) {
                            // subtract the bait
                            for (let bait of fish.bait) {
                                resources.bait[bait.type].count -= bait.amount;
                            }
                            // subtract the tackle
                            for (let tackle of fish.tackle) {
                                resources.tackle[tackle.type].count -= tackle.amount;
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
            fishing.toggle_state(state);
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
    },

    catch(fish, is_bait) {
        if (!fish.caught) {
            // handle guppies seperately
            main.create_counter((is_bait ? "bait" : "fish") + "_counters", fish);
            
            if (fish.internal == "bass") {
                // show the fish counters if this is the first fish
                $("#fish_counters")
                    .fadeIn();
            } else if (fish.internal == "worms") {
                // show fishing buttons
                $("#fishing_buttons")
                    .fadeIn();
                // show the bait counters
                $("#bait_counters")
                    .fadeIn();
            }

            messenger.write_message(fish.message);
        }

        fish.caught = true;

        if (fish.count != fish.max) {
            let amount = main.random(1, fish.max_caught);
            if (fish.count + amount >= fish.max) {
                fish.count = fish.max;
            } else {
                fish.count += amount;
            }
            fish.total += amount;

            $("#" + fish.internal + "_count")
                .text(fish.count);

            // check this after so we don't display the message until after the max has been hit
            if (fish.count == fish.max) {
                // unlock the shop
                if (fish.internal != "worms" && fish.internal != "guppies") {
                    $("#shop_button")
                        .fadeIn();
                    $("#lake_button")
                        .fadeIn();
                }

                $("#" + fish.internal + "_count")
                    .css("opacity", 0.5);

                main.show_max(fish);
            }

            return true;
        } else {
            if (!is_bait) {
                messenger.write_message("don't have anywhere to put this fish...");
            }

            return false;
        }
    },
}