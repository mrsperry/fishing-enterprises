class settings {
    static map = {};

    // Set default settings
    static initialize() {
        // Theme to light
        settings.set("theme", 0);
        // Auto save interval to 10 minutes
        settings.set("auto-save-interval", 10);
        // Dev tools to disabled
        settings.set("dev-tools", false);

        // Time played
        settings.set("time-played", {
            hours: 0,
            minutes: 0,
            seconds: 0
        });
        // Total fish caught
        settings.set("total-fish-caught", 0);
    }

    static set(key, value) {
        settings.map[key] = value;
    }

    static get(key) {
        return settings.map[key];
    }

    static toggle_dev_tools(enable) {
        // Set the enable state of dev tools
        settings.set("dev-tools", enable);

        if (enable) {
            // Create the tools parent
            const parent = $("<div>")
                .attr("id", "dev-tools")
                .appendTo($("#middle-section"));

            // Additional money
            new button({
                parent: parent,
                text: "Money ($10,000)",
                on_click: () => {
                    misc_data.update_money(10000);
                }
            });
            // Regular game ticks
            new button({
                parent: parent,
                text: "Regular ticks",
                on_click: () => {
                    main.set_interval(1000);
                }
            });
            // Faster game ticks (may cause lag)
            new button({
                parent: parent,
                text: "Faster ticks",
                on_click: () => {
                    main.set_interval(250);
                }
            });
            // Max bait, tackle and fuel
            new button({
                parent: parent,
                text: "Max resources",
                on_click: () => {
                    const data = fishing_data.get_data();

                    // Loop through all bait and tackle
                    for (const type in data) {
                        for (const internal in data[type]) {
                            const item = data[type][internal];

                            // Set each items count to its max
                            while (item.count != item.max) {
                                shop.buy_consumable(item, true);
                            }
                        }
                    }

                    // Set minnows
                    const minnows = area_data.get("lake").fish.minnows;
                    minnows.caught = true;
                    while (minnows.count != minnows.max) {
                        shop.buy_consumable(minnows, true);
                    }

                    // Set fuel
                    const fuel = misc_data.get("fuel");
                    while (fuel.count != fuel.max) {
                        shop.buy_consumable(fuel, true);
                    }

                    // Unlock cast out line button if its disabled
                    if (!fishing.is_fishing) {
                        $("#cast-out-button")
                            .prop("disabled", false);
                    }
                }
            });
        } else {
            // Remove all tools
            $("#dev-tools")
                .remove();
        }
    }
}