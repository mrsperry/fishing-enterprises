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
                let element = $("#fishing_buttons");

                if (lake.worm_game) {
                    if (lake.show_buttons) {
                        $(element)
                            .fadeIn();
                    }

                    lake.toggle_worm_game();
                } else {
                    $(element)
                        .fadeOut(400, function() {
                            lake.toggle_worm_game();
                        });
                }
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
    },

    toggle_worm_game() {
        if (this.worm_game == null || !this.worm_game) {
            this.worm_game = true;

            $("#forage_for_worms_button")
                .text("Back to the water");
            $("<div>")
                .attr("id", "worm_game_background")
                .addClass("pre absolute")
                .appendTo($("#resource_buttons"));
            
            this.worm_interval = window.setInterval(this.worm_game_update, 500);
        } else {
            this.worm_game = false;
            this.worm_count = 0;
            this.worm_grid = [];

            $("#forage_for_worms_button")
                .text("Forage for worms");
            main.remove_elements(["worm_game_background"]);
            
            window.clearInterval(this.worm_interval);
        }
    },

    worm_game_update() {
        if (lake.worm_count == null) {
            lake.worm_count = 0;
            lake.worm_grid = [];
        }
        
        if (lake.worm_count < 5) {
            let index;
            do {
                index = main.random(0, 15);
            } while (lake.worm_grid[index] == true);
            lake.worm_grid[index] = true;

            let left = 35 + ((index % 4) * 85);
            let top = 10 + ((Math.floor(index / 4)) * 100);

            let spawn = $("<div>")
                .addClass("worm_spawn absolute no_select")
                .css("left", left + "px")
                .css("top", top + "px")
                .css("transform", "rotate(" + main.random(0, 360) + "deg)")
                .click(function() {
                    if (resources.bait.worms.count != resources.bait.worms.max) {
                        lake.worm_count -= 1;
                        lake.show_buttons = true;
                        lake.worm_grid[index] = false;

                        fishing.catch(resources.bait.worms, true);

                        $(this)
                            .off("click")
                            .remove();
                    } else {
                        messenger.write_message("You can't hold any more worms!");
                    }
                })
                .hide()
                .fadeIn()
                .appendTo($("#worm_game_background"));
            floaters.register_element(spawn, "+1 Worm", () => {
                return resources.bait.worms.count != resources.bait.worms.max;
            });

            lake.worm_count += 1;
        }

        let art_1 = 
              "   ___<br>"
            + "  /___\\<br>"
            + " |_____|<br>"
            + " | ____|<br>"
            + "  \\ ____\\<br>"
            + "   \\ ____\\<br>"
            + "    |_____|<br>"
            + "    |_____|<br>"
            + "    |_____|<br>"
            + "   /____ /<br>"
            + "  |_____|<br>"
            + " /____ /<br>"
            + "|_____|<br>"
            + " \\___/";
        let art_2 = 
              "    ____<br>"
            + "   /____\\<br>"
            + "  /____ /<br>"
            + " |_____|<br>"
            + "  \\ ____\\<br>"
            + "   \\ ____\\<br>"
            + "    |_____|<br>"
            + "    |_____|<br>"
            + "    |_____|<br>"
            + "     \\ ___\\<br>"
            + "      |____|<br>"
            + "     /___ /<br>"
            + "    |____|<br>"
            + "    \\___/";

        for (let element of $(".worm_spawn")) {
            $(element)
                .html(main.random(0, 1) == 0 ? art_1 : art_2);
        }
    }
}