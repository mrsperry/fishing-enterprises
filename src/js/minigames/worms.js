class worms {
    static is_playing = false;

    static swap_state() {
        worms.is_playing = !worms.is_playing;

        // Reset game data
        worms.count = 0;
        worms.grid = [];

        if (worms.is_playing) {
            // Add minigame CSS
            css.load(["minigames/worms"]);

            // Set the forage for worms button text
            $("#forage-for-worms-button")
                .text("Back to the water");
            // Hide the fishing buttons
            const cast_out = $("#cast-out-button")
                .fadeOut(400, () => {
                    cast_out.prop("disabled", false);
                });
            $("#reel-in-button")
                .fadeOut();

            const art = $("#area-art")
                .fadeOut(400, () => {
                    art.text(art_data.get("worm_game", "background"));

                    // Create the worm grid
                    const grid = $("<div>")
                        .attr("id", "worm-grid")
                        .addClass("flex")
                        .hide()
                        .fadeIn()
                        .appendTo(art);
                    // Populate the grid
                    for (let index = 0; index < 9; index++) {
                        // Set the initial state of all grid elements
                        worms.grid[index] = false;

                        // Create the grid cell
                        $("<div>")
                            .attr("id", "worm-cell-" + (index + 1))
                            .addClass("grid-cell flex")
                            .appendTo(grid);
                    }

                    art.fadeIn();

                    // Set the update interval
                    worms.interval = window.setInterval(worms.update, 500);
                });
        } else {
            const art = $("#area-art")
                .fadeOut(400, () => {
                    // Reset the forage for worms button text
                    $("#forage-for-worms-button")
                        .text("Forage for worms");
                    // Show the fishing buttons
                    $("#cast-out-button")
                        .fadeIn();
                    // Set opacity to the default disabled opacity then reset the value
                    const reel_in = $("#reel-in-button")
                        .fadeTo(400, 0.4, () => reel_in.attr("style", ""));

                    // Reset area art
                    art.text(art_data.get("areas", "lake"))
                        .hide()
                        .fadeIn();

                    // Remove the grid
                    $("#worm-grid").remove();

                    // Remove minigame CSS
                    css.remove(["minigames/worms"]);
                });

            // Clear the update interval
            window.clearInterval(worms.interval);
        }
    }

    static update() {
        // Loop through all currently displayed worms
        for (let worm of $(".worm-spawn")) {
            worm = $(worm);
            let texture = parseInt(worm.attr("texture"), 10);
            let timer = parseInt(worm.attr("texture-timer"), 10);

            if (timer == 0) {
                // Swap the texture
                texture += texture == 1 ? 1 : -1;
                
                // Set the texture
                worm.attr("texture", texture);
                worm.attr("texture-timer", utils.random(1, 3));
                worm.html(art_data.get("worm_game", "state-" + texture));
            } else {
                // Count the texture timer down
                worm.attr("texture-timer", --timer);
            }
        }

        // Check if a worm should be added to the grid
        if (worms.count < 5) {
            // Increase the worm count
            worms.count++;

            // Find an empty cell to put a worm
            let index;
            do {
                index = utils.random(0, 8);
            } while (worms.grid[index] == true);
            // Mark this cell as taken
            worms.grid[index] = true;

            // Get the current worm data
            const data = worms.get_worm_data();

            // Get the current worm cell
            const cell = $("#worm-cell-" + (index + 1));

            $("<div>")
                // Set the current texture for this worm
                .attr("texture", 1)
                // Set the current texture timer of this worm
                .attr("texture-timer", utils.random(1, 3))
                .addClass("worm-spawn no-select")
                // Rotate the worm randomly
                .css("transform", "rotate(" + utils.random(0, 360) + "deg)")
                // Create a random minor offset of the X and Y
                .css("margin", utils.random(-20, 20) + "px 0px 0px " + utils.random(-20, 20) + "px")
                .html(art_data.get("worm_game", "state-1"))
                .click((event) => {
                    // Check if the max amount of worms is being held
                    if (data.count != data.max) {
                        floaters.create(event.pageX - 7, event.pageY, "+1", floaters.types.standard);

                        const counter = $("#worms-count")
                            .text(++data.count);

                        // Check if this is the first worm caught
                        if (data.caught != true) {
                            data.caught = true;
                            
                            // Fade in elements
                            $("#bait-counters")
                                .css("visibility", "visible")
                                .hide()
                                .fadeIn();
                            counter.parent().fadeIn();
                        }

                        // Check if the maximum number of worms has been reached
                        if (data.count == data.max) {
                            counter.css("opacity", 0.5);
                            $("#worms-max")
                                .show();
                        }

                        // Get this worm element
                        const worm = $(cell.children(".worm-spawn")[0]);

                        worm.fadeOut(400, () => {
                            // Decrement the number of visible worms
                            worms.count--;

                            // Reset this cell's state
                            worms.grid[index] = false;

                            worm.remove();
                        });

                        // Remove on click events so a worm cannot be collected twice
                        worm.off("click");
                    } else {
                        // Write a failure message
                        messenger.write("You cannot hold any more worms!");
                    }
                })
                .hide()
                .fadeIn()
                .appendTo(cell);
        }
    }

    static get_worm_data() {
        return fishing_data.get_bait("worms");
    }
}