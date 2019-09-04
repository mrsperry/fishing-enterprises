class fishing {
    static data = null;
    static is_fishing = false;

    static initialize(name) {
        // Create initial HTML
        if (fishing.get_data() == null) {
            fishing.create_elements(name);
            // Load fishing area CSS
            css.replace(["areas/fishing"]);
        }

        if (name == "lake") {
            // Create the forage for worms button if swapping to the lake
            new button({
                parent: "#resource-buttons",
                prepend: true,
                id: "forage-for-worms",
                text: "Forage for worms",
                show: true,
                on_click: () => {
                    // Disable fishing if its current enabled
                    if (fishing.is_fishing) {
                        fishing.swap_state();
                    }

                    // Initialize minigame
                    worms.swap_state();
                }
            });
        } else {
            // Remove the forage for worms button if swapping to a different area
            $("#forage-for-worms-button")
                .remove();
        }

        // Enable all area selector buttons that are not this area
        for (const internal in area_data.get_data()) {
            $("#" + internal + "-selector-button")
                .prop("disabled", internal == name);
        }

        // Disable fishing if enabled
        if (fishing.is_fishing) {
            fishing.swap_state();
        }
        // Set the game state
        main.set_state(main.states.fishing);
        // Set the area data
        fishing.data = area_data.get(name);
    }

    static create_elements() {
        const parent = $("#content");

        // Create the money counter
        const money = $("<div>")
            .attr("id", "money-counter")
            .text("Money: $")
            .appendTo(parent);
        $("<span>")
            .attr("id", "money-count")
            .text("0")
            .appendTo(money);
        // Create the time played counter
        $("<div>")
            .attr("id", "time-played")
            .text("0:00")
            .appendTo(parent);
        // Create the total fish caught counter
        const fish_caught = $("<div>")
            .attr("id", "total-fish-caught")
            .css("visibility", "hidden")
            .text("Total fish caught: ")
            .appendTo(parent);
        $("<span>")
            .attr("id", "total-fish-caught-count")
            .text("0")
            .appendTo(fish_caught);

        // Create the counters section
        const counters = $("<div>")
            .attr("id", "resource-counters")
            .appendTo(parent);
        // Create the art section
        $("<div>")
            .attr("id", "area-art")
            .appendTo(parent);
        // Create the buttons section
        $("<div>")
            .attr("id", "resource-buttons")
            .appendTo(parent);
        // Create the area selector
        const selector = $("<div>")
            .attr("id", "area-selector")
            .appendTo(parent);
        // Create the shop selector button
        new button({
            parent: selector,
            id: "shop-selector",
            text: "Shop"
        });

        // Create the fish counters
        const fish_counters = $("<div>")
            .attr("id", "fish-counters")
            .attr("section-header", "Fish")
            .addClass("section")
            .css("visibility", "hidden")
            .appendTo(counters);

        // Bundle up the rest of the counters so they're stacked on top of each other
        const misc = $("<div>")
            .attr("id", "misc-counters")
            .appendTo(counters);
        for (const id of ["bait", "tackle", "boat"]) {
            $("<div>")
                .attr("id", id + "-counters")
                .attr("section-header", utils.capitalize(id))
                .addClass("section")
                .css("visibility", "hidden")
                .appendTo(misc);
        }

        const create_counter = (parent, item, prepend) => {
            const counter = $("<div>")
                .addClass("counter")
                .text(item.display + ": ")
                .hide();
            if (prepend) {
                counter.prependTo(parent);
            } else {
                counter.appendTo(parent);
            }

            $("<span>")
                .attr("id", item.internal + "-count")
                .text("0")
                .appendTo(counter);
            $("<span>")
                .attr("id", item.internal + "-max")
                .addClass("counter-max")
                .text("/" + item.max)
                .hide()
                .appendTo(counter);
        }

        // Set area specific data
        let data = area_data.get_data();
        for (const name in data) {
            const settings = data[name];

            // Create this area's counter section
            const section = $("<div>")
                .attr("id", settings.internal + "-counters")
                .hide()
                .appendTo(fish_counters);

            // Create the header
            const header = $("<div>")
                .addClass("counter-header centered")
                .appendTo(section);
            if (settings.internal != "lake") {
                $("<div>")
                    .addClass("counter-break")
                    .appendTo(header);
            }
            $("<span>")
                .text(settings.display)
                .appendTo(header);
            $("<div>")
                .addClass("counter-break")
                .appendTo(header);

            // Create the fish counters
            const fish_data = settings.fish;
            for (const fish_name in fish_data) {
                const fish = fish_data[fish_name];

                // Edge case for bait caught in fishing areas
                const parent = fish.internal == "minnows" ? $("#bait-counters") : section;
                create_counter(parent, fish, false);
            }

            // Create area selector buttons
            new button({
                parent: selector,
                id: settings.internal + "-selector",
                text: settings.display,
                disabled: false,
                on_click: () => {
                    fishing.initialize(settings.internal);
                }
            });
        }

        data = fishing_data.get_data();
        for (const type in data) {
            for (const name in data[type]) {
                const item = data[type][name];

                // Edge case to prepend worms as the minnows counter has already been created
                create_counter($("#" + type + "-counters"), item, item.internal == "worms")
            }
        }

        // Create fishing buttons
        new button({
            parent: "#resource-buttons",
            id: "cast-out",
            text: "Cast out line",
            on_click: () => {
                fishing.swap_state();
            }
        });
        const reel_in_button = new button({
            parent: "#resource-buttons",
            id: "reel-in",
            text: "Reel in line",
            disabled: true,
            on_click: () => {
                fishing.swap_state();
            }
        }).get_element();

        // Stop the default fading and fade to the disabled opacity
        reel_in_button.stop().fadeTo(400, 0.4, () => { 
            // Reset opacity so it can be edited later
            reel_in_button.css("opacity", "");
        });
    }

    static update() {
        if (!fishing.is_fishing) {
            return;
        }

        // Loop through all fish in the current area
        const data = fishing.get_data();
        const fish_data = data.fish;
        for (const index of utils.shuffle(Object.keys(fish_data))) {
            const fish = fish_data[index];

            // Roll a chance to check the conditions on this fish
            if (utils.random(0, 100) < fish.chance && fishing.conditions(fish)) {
                fish.count++;
                fish.total++;

                // Update the fish counter
                const counter = $("#" + fish.internal + "-count")
                    .css("opacity", fish.count == fish.max ? "0.5" : "1.0")
                    .text(utils.stringify(fish.count));

                // Display the counter if it is hidden
                if (!fish.caught) {
                    fish.caught = true;
                    counter.parent().fadeIn();

                    // Show the unique fish message (only on first catch)
                    messenger.write(fish.display + ": " + fish.message);
                }

                // Check if the max count should be displayed
                if (fish.count == fish.max && !fish.show_max) {
                    fish.show_max = true;

                    $("#" + fish.internal + "-max")
                        .show();
                }

                // Edge case for catching bait in fishing areas
                if (fish.internal == "minnows") {
                    return;
                }

                // Update the total fish counter
                let total_caught = settings.get("total-fish-caught");
                $("#total-fish-caught-count")
                    .text(utils.stringify(++total_caught));
                settings.set("total-fish-caught", total_caught);

                // Check if this is the first fish caught in this area
                const counters = $("#" + data.internal + "-counters");
                if (counters.is(":hidden")) {
                    counters.fadeIn();
                }

                // Check if this is the first fish caught ever
                const section = $("#fish-counters");
                if (section.css("visibility") == "hidden") {
                    section.css("visibility", "visible").hide().fadeIn();
                }

                // Return so that two fish cannot be caught on the same update
                return;
            }
        }
    }

    static conditions(fish) {
        const data = fishing.get_data().fish;

        // Check if the current count is equal to the maximum number of fish
        if (fish.count == fish.max) {
            return false;
        }

        // Check if there is a prerequisite fish
        if (fish.after != null) {
            // Check if the fish has been caught
            if (!data[fish.after].caught) {
                return false;
            }
        }

        return true;
    }

    static swap_state() {
        fishing.is_fishing = !fishing.is_fishing;

        // Swap button disables
        $("#cast-out-button")
            .prop("disabled", fishing.is_fishing);
        $("#reel-in-button")
            .prop("disabled", !fishing.is_fishing);
    }

    static get_data() {
        return fishing.data;
    }
}