var fishing = {
    locked_areas: [],

    state: function(fish) {
        this.is_fishing = false;

        this.cast_out_message = false;
        this.reel_in_message = false;

        this.fish = fish;
    },

    create_buttons() {
        $("<div>")
            .attr("id", "fishing_buttons")
            .appendTo($("#resource_buttons"));
        buttons.create({
            parent: "fishing_buttons",
            id: "cast_out_line",
            text: "Cast out line",
            on_click: function() {
                fishing.toggle_state(areas.current_area.state);
            }
        });
        buttons.create({
            parent: "fishing_buttons",
            id: "reel_in_line",
            text: "Reel in line",
            disabled: true,
            on_click: function() {
                fishing.toggle_state(areas.current_area.state);
            }
        });
    },

    update(state) {
        if (state.is_fishing) {
            // randomize fish order so chances aren't skewed
            for (let fish of main.shuffle(state.fish)) {
                // random chance to catch the fish
                if (main.random(1, 100) <= fish.chance) {
                    // make sure there is bait
                    let has_bait = true;
                    if (fish.bait != null) {
                        for (let bait of fish.bait) {
                            let count = resources.bait[bait.type].count;
                            if (bait.amount > (count == null ? 0 : count)) {
                                has_bait = false;
                                break;
                            }
                        }
                    }

                    // make sure there is tackle
                    let has_tackle = true;
                    if (fish.tackle != null) {
                        for (let tackle of fish.tackle) {
                            let count = resources.tackle[tackle.type].count;
                            if (tackle.amount > (count == null ? 0 : count)) {
                                has_tackle = false;
                                break;
                            }
                        }
                    }

                    let has_fuel = true;
                    let use_fuel = false;
                    if (areas.current_area.ocean != null) {
                        has_fuel = resources.fuel.count > 0;
                        use_fuel = true;
                    }

                    // go on to the next fish if theres no bait or tackle for this one
                    if (!has_bait || !has_tackle || !has_fuel) {
                        continue;
                    }

                    // check prerequesite fish
                    if (resources.fish[fish.after] == null || resources.fish[fish.after].caught) {
                        // check if the fish should append to bait
                        if (fishing.catch(fish, resources.bait[fish.internal] == null ? false : true)
                            || (business.unlocked != null && business.unlocked)) {
                            // subtract the bait
                            if (fish.bait != null) {
                                for (let bait of fish.bait) {
                                    resources.bait[bait.type].count -= bait.amount;
                                    counters.update_counter(resources.bait[bait.type]);
                                }
                            }
                            // subtract the tackle
                            if (fish.tackle != null) {
                                for (let tackle of fish.tackle) {
                                    resources.tackle[tackle.type].count -= tackle.amount;
                                    counters.update_counter(resources.tackle[tackle.type]);
                                }
                            }
                            // subtract the fuel
                            if (use_fuel) {
                                resources.fuel.count--;
                                counters.update_counter(resources.fuel);
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
            .prop("disabled", !state.is_fishing);
        $("#reel_in_line_button")
            .prop("disabled", state.is_fishing);
        let worms = resources.bait.worms;
        $("#forage_for_worms_button")
            .prop("disabled", !state.is_fishing || (worms.count == worms.max));

        if (state.is_fishing && !state.reel_in_message) {
            messenger.write_message("reeling in your line is always full of tedium", true);
            state.reel_in_message = true;
        } else if (!state.cast_out_message) {
            messenger.write_message("you cast out your line as far as your arm permits", true);
            state.cast_out_message = true;
        }

        state.is_fishing = !state.is_fishing;
    },

    catch(fish, is_bait) {
        if (is_bait) {
            // show fishing buttons
            let fishing = $("#fishing_buttons");
            if ($(fishing)
                .is(":hidden"))
                $(fishing)
                    .fadeIn();
            // show the bait counters
            let bait = $("#bait_counters");
            if ($(bait)
                .is(":hidden"))
                $(bait)
                    .fadeIn();
        } else {
            // show the fish counters if this is the first fish
            let fish = $("#fish_counters");
            if ($(fish)
                .is(":hidden"))
                $(fish)
                    .fadeIn();
        }

        if (fish.caught == null || !fish.caught) {
            fish.caught = true;

            if (!is_bait) {
                let area = areas.current_area.internal;
                fish.area = area;
                counters.create_counter(fish, area + "_counters");
            }

            messenger.write_message(fish.display + ": " + fish.message, true);
        }

        if (fish.count == null) {
            fish.count = 0;
            fish.total = 0;
        }

        if (fish.max_caught == null) {
            fish.max_caught = 1;
        }

        let amount = main.random(1, fish.max_caught);
        if (fish.count != fish.max) {
            if (fish.count + amount >= fish.max) {
                fish.count = fish.max;
            } else {
                fish.count += amount;
            }
            fish.total += amount;

            if (!is_bait) {
                resources.fish_meta.count += amount;
            }

            // check this after so we don't display the message until after the max has been hit
            if (fish.count == fish.max) {
                // unlock the shop
                if (fish.internal != "worms" && fish.internal != "guppies") {
                    $("#shop_button")
                        .fadeIn();
                    $("#lake_button")
                        .fadeIn();
                    shop.unlocked = true;
                    lake.unlocked = true;
                }
            }

            if (fish.internal == "worms") {
                if (areas.current_area.internal == "lake") {
                    $("#forage_for_worms_button")
                        .prop("disabled", (fish.count == fish.max));
                }
            }

            counters.update_counter(fish);
            counters.update_counter(resources.fish_meta);
            shop.update_buttons();

            return true;
        } else {
            if (business.unlocked != null && business.unlocked) {
                fish.total += amount;
                if (!is_bait) {
                    resources.fish_meta.count += amount;

                    let update = true;
                    for (let index of fishing.locked_areas) {
                        if (index.area == fish.area) {
                            update = false;
                        }
                    }
                    if (update) {
                        shop.update_money(fish.price);
                    }
                }
            }
            counters.update_counter(resources.fish_meta);
            shop.update_buttons();

            return false;
        }
    },
}