let lake = {
    display: "lake",

    is_fishing: false,

    initialize: function() {
        main.area = this;

        main.clear();

        this.create_counters([
            "worms",
            "guppies",
            "bass",
            "sturgeon",
            "chub"
        ]);

        // create the buttons
        let content = $("#resource_buttons");
        $("<button>")
            .attr("id", "forage_for_worms_button")
            .click(function() { 
                    resources.increment_worms() 
                })
            .text("Forage for worms")
            .appendTo(content);
        $("<br>")
            .appendTo(content);
        $("<button>")
            .attr("id", "cast_out_line_button")
            .click(function() { 
                    fishing.cast_out_line()
                })
            .text("Cast out line")
            .hide()
            .appendTo(content);
        $("<br>")
            .appendTo(content);
        $("<button>")
            .attr("id", "reel_in_line_button")
            .click(function() { 
                    fishing.reel_in_line() 
                })
            .prop("disabled", true)
            .text("Reel in line")
            .hide()
            .appendTo(content);
    },

    create_counters: function(names) {
        let content = $("#resource_counters");

        for (let index = 0; index < names.length; index++) {
            let name = names[index];
            let value = name + "_count";
            let max = name + "_max";

            let parent = $("<span>")
                .attr("id", name)
                // capatalizes the first letter
                .text(name.charAt(0).toUpperCase() + name.slice(1) + ": ")
                .hide()
                .appendTo(content);
            $("<span>")
                .attr("id", value)
                .text(resources[value])
                .appendTo(parent);
            $("<span>")
                .attr("id", max)
                .text("/" + resources[max])
                .hide()
                .appendTo(parent);
            $("<br>").appendTo(content);
        }
    },

    update: function() {
        if (this.is_fishing) {
            // multipliers for catching fish, chances without bait are low
            let bass_multiplier = 1;
            let sturgeon_multiplier = 0;
            let chub_multiplier = 0;

            // set the small fish multiplier if they have bait
            if (resources.worm_count > 0) {
                bass_multiplier = 6;
            } else {
                messenger.write_message("won't catch much without worms...");
            }

            // set the medium fish multiplier if they have caught a guppies
            if (resources.worm_count > 0 && resources.guppies_count > 0) {
                sturgeon_multiplier = 3;
            }

            // set the large fish multiplier if they have caught medium fish & have small fish
            if (resources.caught_sturgeon) {
                if (resources.worm_count > 0 && resources.guppies_count > 0 && resources.bass_count) {
                    chub_multiplier = 5;
                }
            }

            // initialize the non-bait chances of catching fish
            let bass_chance = main.get_random(1, 10) * bass_multiplier;
            let sturgeon_chance = main.get_random(1, 5) * sturgeon_multiplier;
            let chub_chance = main.get_random(1, 1) * chub_multiplier;

            // start checking chances of catching fish
            let random = main.get_random(1, 100);
            if (random < chub_chance) {
                if (resources.caught_sturgeon) {
                    if (resources.chub_count < resources.chub_max) {
                        resources.increment_chub();
                        resources.decrement_worms();
                        resources.decrement_guppies();
                        resources.decrement_bass();

                        return;
                    }
                }
            } else if (random < sturgeon_chance) {
                if (resources.caught_bass) {
                    if (resources.sturgeon_count < resources.sturgeon_max) {
                        resources.increment_sturgeon();
                        resources.decrement_worms();
                        resources.decrement_guppies();

                        return;
                    }
                }
            } else if (random < bass_chance) {
                let decrement = false;

                // 50% chance to get a guppies instead of small fish
                if (main.get_random(1, 2) == 1 && resources.caught_bass) {
                    if (resources.guppies_count < resources.guppies_max) {
                        resources.increment_guppies();

                        decrement = true;
                    }
                } else {
                    if (resources.bass_count < resources.bass_max) {
                        resources.increment_bass();

                        decrement = true;
                    }
                }

                if (decrement && resources.worm_count > 0) {
                    resources.decrement_worms();
                }

                return;
            }
        }
    }
}