class fishing {
    static data = null;
    static is_fishing = false;

    static first_load = true;

    static initialize(name) {
        if (fishing.first_load) {
            // Load fishing area and shop CSS
            css.replace(["areas/fishing", "areas/shop"]);

            fishing.create_elements(name);
            fishing.data = area_data.get(name);

            fishing.first_load = false;
        }

        // Transition
        const art = $("#area-art")
            .fadeOut(400, () => {
                art.html(art_data.get("areas", name))
                    .fadeIn();

                if (fishing.get_data() == null) {
                    fishing.create_elements(name);
                }

                $("#resource-buttons")
                    .fadeIn();

                // Set the area data
                fishing.data = area_data.get(name);

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
            });

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
    }

    static create_elements() {
        const parent = $("#content");

        if (fishing.first_load) {
            // Create the money counter
            const money = $("<div>")
                .attr("id", "money-counter")
                .text("Money: $")
                .appendTo(parent);
            $("<span>")
                .attr("id", "money-count")
                .text("0")
                .appendTo(money);
            $("<span>")
                .attr("id", "money-difference")
                .hide()
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
                text: "Shop",
                hide: true,
                on_click: () => {
                    // Stop fishing if currently fishing
                    if (fishing.is_fishing) {
                        fishing.swap_state();
                    }

                    shop.initialize();
                }
            });
            $("<div>")
                .addClass("counter-break")
                .appendTo(selector);

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
                    hide: true,
                    on_click: () => {
                        // Reset shop selector if it's selected
                        $("#shop-selector-button")
                            .prop("disabled", false);

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
        }

        // Create fishing buttons
        new button({
            parent: "#resource-buttons",
            id: "cast-out",
            text: "Cast out line",
            disabled: fishing.first_load ? true : false,
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

                    // Check if the selector buttons are hidden
                    const lake = $("#lake-selector-button");
                    if (lake.is(":hidden")) {
                        // Indicate the lake has been unlocked
                        area_data.get("lake").purchased = true;
                        
                        // Show lake and shop buttons
                        lake.fadeIn();

                        $("#shop-selector-button")
                            .fadeIn();
                    }
                }

                // Subtract bait and tackle
                const subtract = (array, internal) => {
                    if (array != null) {
                        for (const item of array) {
                            let type;

                            if (item.type == "minnows") {
                                // Edge case for minnows
                                type = area_data.get("lake").fish.minnows;
                            } else {
                                // Get the current object from data
                                type = fishing_data["get_" + internal](item.type);
                            }

                            // Check if the max has been reached
                            const show_max = type.count == type.max;

                            // Subtract the amount
                            type.count -= item.amount;

                            // Set the amount in its counter
                            const counter = $("#" + item.type + "-count")
                                .text(type.count);
                            
                            // Show the counter since if its no longer maxed
                            if (show_max) {
                                counter.css("opacity", 1);
                            }
                        }
                    }
                };
                subtract(fish.bait, "bait");
                subtract(fish.tackle, "tackle");

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

        // Check the max number of fish
        if (fish.count == fish.max) {
            return false;
        }

        // Check prerequisite fish
        if (fish.after != null) {
            // Check if the fish has been caught
            if (!data[fish.after].caught) {
                return false;
            }
        }

        // Checks if there is available bait/tackle
        const check_amount = (internal) => {
            // Make sure this fish takes bait/tackle
            if (fish[internal] != null) {
                for (const item of fish[internal]) {
                    let result;
                    if (item.type == "minnows") {
                        // Edge case for minnows as they are bait handled as a fish
                        result = area_data.get("lake").fish.minnows;
                    } else {
                        // Get the current type of bait/tackle
                        result = fishing_data["get_" + internal](item.type);
                    }

                    // Check if there is enough
                    if (result.count < item.amount) {
                        return false;
                    }
                }
            }

            return true;
        };

        if (!check_amount("bait") || !check_amount("tackle")) {
            return false;
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