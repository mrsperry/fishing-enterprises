class shop {
    static clickables = {
        inside: [
            {
                name: "shopkeeper",
                text: () => {
                    const amount = utils.stringify(shop.get_fish_value(false));
                    return "Sell your fish (+$" + amount + ")";
                },
                on_click: () => {
                    const value = shop.get_fish_value(true);

                    if (value > 0) {
                        // Add the total value of all fish and reset their values
                        misc_data.update_money(value);
                    } else {
                        messenger.write("You don't have any fish to sell!");
                    }
                }
            },
            {
                name: "catalog",
                text: "Fish Catalog ($250)",
                ref: misc_data.get("catalog"),
                on_click: () => {
                    if (shop.buy(misc_data.get("catalog"), false, true)) {
                        $("#catalog-break")
                            .fadeIn();
                        $("#catalog-selector-button")
                            .fadeIn();
                        $("#catalog-holder")
                            .css("visibility", "hidden");
                    }
                }
            },
            {
                name: "license",
                decor: true,
                ref: area_data.get("pier"),
                text: () => {
                    const data = shop.get_next_area();
                    if (data != null) {
                        return data.display + " License ($" + utils.stringify(data.price) + ")";
                    }
                },
                on_click: () => {
                    const data = shop.get_next_area();

                    if (shop.buy(data, false, false)) {
                        // Show the area selector button
                        $("#" + data.internal + "-selector-button")
                            .fadeIn();

                        // Remove the license art if the last one has been purchased
                        if (shop.get_next_area() == null) {
                            // Remove the license
                            $("#license-holder")
                                .css("visibility", "hidden");
                        }

                        if (data.internal == "pier") {
                            // Reset door cursor CSS
                            $("#door-holder")
                                .css("cursor", "");
                            
                            // Remove the door lock
                            $("#door-lock")
                                .fadeOut();
                        }
                    }
                }
            },
            {
                name: "contract",
                decor: true,
                text: "Buy the Shop ($15,000)",
                on_click: () => {
                }
            },
            {
                name: "chest",
                text: () => {
                    return "Requires key";
                },
                on_click: () => {
                }
            },
            {
                name: "door",
                decor: true,
                text: "",
                on_click: () => {
                    if (area_data.get("pier").purchased) {
                        $("#area-art")
                            .fadeOut(400, () => {
                                shop.load_outside();
                            });
                    } else {
                        messenger.write("The door is locked.");
                    }
                }
            }
        ],
        outside: [
            {
                name: "door-outside",
                decor: true,
                text: "",
                on_click: () => {
                    $("#area-art")
                        .fadeOut(400, () => {
                            shop.load_inside();
                        });
                }
            },
            {
                name: "fishing-rods",
                text: "High Tension Rods ($1,500)",
                ref: misc_data.get("boat").rods,
                on_click: () => {
                    const boat = misc_data.get("boat");
                    if (boat.purchased) {
                        if (boat.diving.purchased) {
                            shop.buy_boat_part("deep_sea", boat.rods);
                        } else {
                            messenger.write("You'll want some diving experience before buying that!")
                        }
                    } else {
                        messenger.write("You'll want a boat before buying that!");
                    }
                }
            },
            {
                name: "diving-equipment",
                text: "Diving Equipment ($1,250)",
                ref: misc_data.get("boat").diving,
                on_click: () => {
                    const boat = misc_data.get("boat");
                    if (boat.purchased) {
                        shop.buy_boat_part("spear_fishing", boat.diving);
                    } else {
                        messenger.write("You'll want a boat before buying that!");
                    }
                }
            },
            {
                name: "fuel",
                text: "Fuel ($5)",
                on_click: () => {
                    if (misc_data.get("boat").purchased) {
                        shop.buy_consumable(misc_data.get("fuel"), false);
                    } else {
                        messenger.write("You'll want a boat before buying that!");
                    }
                }
            },
            {
                name: "boat",
                text: "Boat ($2,000)",
                ref: misc_data.get("boat"),
                on_click: () => {
                    shop.buy_boat_part("reef", misc_data.get("boat"));
                }
            },
        ]
    };

    static initialize() {
        // Disable the area selector button
        $("#shop-selector-button")
            .prop("disabled", true);
        // Enable the previously disabled area selector button
        $("#" + fishing.data.internal + "-selector-button")
            .prop("disabled", false);
        // Remove fishing data as the shop isn't a fishing area
        fishing.data = null;

        // Fade out any area art
        $("#area-art")
            .fadeOut();

        // Fade out resource buttons
        $("#resource-buttons")
            .fadeOut(400, () => {
                // Get rid of unnecessary buttons
                $("#resource-buttons")
                    .empty();

                shop.load_inside();
            });
    }

    static load_inside() {
        // Load shop art
        const art = $("#area-art")
            .html(art_data.get("shop", "background"))
            .hide()
            .fadeIn();

        const data = fishing_data.get_data();

        // Go through all bait and tackle
        for (const type in data) {
            const parent = $("<div>")
                .attr("id", type + "-item-holder")
                .addClass("art")
                .appendTo(art);

            for (const internal in data[type]) {
                const item = data[type][internal];

                const holder = $("<div>")
                    .addClass("shop-item no-select flex flex-justify-center")
                    .click((event) => {
                        // Check if the item was purchased
                        if (shop.buy_consumable(item, false)) {
                            // Create a floater in a random direction
                            floaters.create(event.pageX - 7, event.pageY, "+1", floaters.types.random);
                        }
                    })
                    // Tooltip show/hide
                    .hover(() => {
                        $("#" + item.internal + "-tooltip")
                            .stop()
                            .fadeIn(200);
                    }, () => {
                        $("#" + item.internal + "-tooltip")
                            .stop()
                            .fadeOut(200);
                    })
                    .appendTo(parent);

                // Add type specific data
                if (type == "bait") {
                    holder.html(art_data.get("shop", "jar"));
                } else {
                    holder.addClass("tackle-item");
                }

                // Overlay decor art
                $("<div>")
                    .attr("id", item.internal + "-decor")
                    .addClass(type + "-decor")
                    .html(art_data.get("shop", item.internal + "-decor"))
                    .appendTo(holder);
                // Create the tooltip
                $("<div>")
                    .attr("id", item.internal + "-tooltip")
                    .addClass(type + "-tooltip")
                    .text(item.display + " ($" + item.price + ")")
                    .appendTo(holder);
            }
        }

        // Create desk clickables
        shop.create_clickables(shop.clickables.inside, false);

        // Hide the contract until all upgrades are bought
        $("#contract-holder")
            .css("visibility", "hidden");
    }

    static load_outside() {
        $("#area-art")
            .text(art_data.get("shop", "outside"))
            .fadeIn();

        // Create all clickables
        shop.create_clickables(shop.clickables.outside, true);

        // Hide purchased items
    }

    static create_clickables(clickables, outside) {
        const art = $("#area-art");

        for (const item of clickables) {
            const holder = $("<div>")
                .attr("id", item.name + "-holder")
                .addClass("art shop-item no-select")
                .click(item.on_click)
                .appendTo(art);

            if (item.ref != null && item.ref.purchased) {
                holder.css("visibility", "hidden");
                continue;
            }
            
            // Create the art element
            const child = $("<div>")
                .addClass("flex flex-justify-center")
                .html(art_data.get("shop", item.name))
                // Tooltip show/hide
                .hover(() => {
                    $("#" + item.name + "-tooltip")
                        .stop()
                        .fadeIn(200);
                }, () => {
                    $("#" + item.name + "-tooltip")
                        .stop()
                        .fadeOut(200);
                })
                .appendTo(holder);

            // Create the art decoration
            if (item.decor == true) {
                $("<div>")
                    .attr("id", item.name + "-decor")
                    .addClass("art")
                    .html(art_data.get("shop", item.name + "-decor"))
                    .appendTo(child);
            }

            // Function to get the text of a tooltip
            const tooltip_text = () => {
                return typeof(item.text) == "function" ? item.text() : item.text;
            };

            // Create the tooltip
            const tooltip = $("<div>")
                .attr("id", item.name + "-tooltip")
                .addClass("tooltip")
                .text(tooltip_text())
                .appendTo(child);

            // Update the tooltip text whenever its holder is clicked
            holder.click(() => {
                tooltip.text(tooltip_text());
            });

            // Display the door lock f the prerequisites are not met
            if (item.name == "door" && !area_data.get("pier").purchased) {
                $("<div>")
                    .attr("id", "door-lock")
                    .text(art_data.get("shop", "door-lock"))
                    .appendTo(holder);

                holder.css("cursor", "default");
            }
        }

        // Special behavior for door hover
        const door_name = outside ? "door-outside" : "door";
        $("#" + door_name + "-holder")
            .off("hover")
            .hover(() => {
                // Don't fade in if the door is locked
                if (door_name == "door" && area_data.get("pier").purchased) {
                    $("#" + door_name + "-decor")
                        .stop()
                        .fadeIn(200);
                }
            }, () => {
                $("#" + door_name + "-decor")
                    .stop()
                    .fadeOut(200);
            });
        
        // Hide the door arrow
        $("#" + door_name + "-decor")
            .hide();
        // Remove door tooltip
        $("#" + door_name + "-tooltip")
            .remove();
    }

    // Generic buy checks
    static buy(item, free, message) {
        if (!free) {
            const money = misc_data.get("money");

            // Check if the player has enough money to buy this item
            if (money.count < item.price) {
                messenger.write("You don't have enough money!");
                return false;
            }

            // Check if the player can hold this item
            if (item.count != null && item.max != null) {
                if (item.count == item.max) {
                    messenger.write("You can't hold any more!");
                    return false;
                }
            }

            // Check if the item's message should be displayed
            if (message && !item.show_message) {
                messenger.write(item.display + ": " + item.message);
                item.show_message = true;
            }

            // Subtract the cost of the item
            misc_data.update_money(-item.price);
        }

        // Mark this item as purchased for saving
        item.purchased = true;

        return true;
    }

    // Handles buying of bait or tackle
    static buy_consumable(item, free) {
        // Check base conditions
        if (!shop.buy(item, free, true)) {
            return false;
        }

        // Declare all relevant elements
        const count = $("#" + item.internal + "-count");
        const max = $("#" + item.internal + "-max");
        const holder = count.parent();
        const parent = holder.parent();

        // Check if the holder's parent is visible (applicable for tackle or if the lake was skipped)
        if (parent.css("visibility") == "hidden") {
            parent.css("visibility", "")
                .hide()
                .fadeIn();
        }

        // Check if the counter's parent is hidden
        if (holder.is(":hidden")) {
            holder.fadeIn();
        }

        // Increment and display the new count
        count.text(++item.count);

        // Check if the item's max should be shown
        if (item.count == item.max) {
            if (max.is(":hidden")) {
                max.show();
                item.show_max = true;
            }

            // Fade out the item
            count.css("opacity", 0.5);
        }

        return true;
    }

    // Handles purchasing the boat and subsequent parts
    static buy_boat_part(area, data) {
        if (!data.purchased) {
            // Check if the area can be unlocked
            if (shop.buy(data, false, true)) {
                area_data.get(area).purchased = true;

                // Hide the purchased item
                $("#" + data.internal + "-holder")
                    .css("visibility", "hidden");

                // Display the area selector button
                $("#" + area + "-selector-button")
                    .fadeIn();

                // Show the bought item in the boat counters
                if (data.internal != "boat") {
                    $("#boat-separator")
                        .fadeIn();

                    $("<div>")
                        .addClass("counter")
                        .text(data.display)
                        .hide()
                        .fadeIn()
                        .appendTo($("#boat-counters"));
                }
            }
        }
    }

    /*
     * Clickable functions
     */

    // Shopkeeper
    static get_fish_value(reset) {
        let value = 0;

        const data = area_data.get_data();

        // Find all fish
        for (const area in data) {
            for (const internal in data[area].fish) {
                const fish = data[area].fish[internal];

                // Edge case for bait
                if (internal == "minnows") {
                    continue;
                }

                // Sell the fish
                value += (fish.count * fish.price);

                if (reset) {
                    // Reset count
                    fish.count = 0;

                    // Reset counter
                    $("#" + internal + "-count")
                        .text(0)
                        .css("opacity", "");
                }
            }
        }

        return value;
    }

    // Fishing License
    static get_next_area() {
        const data = area_data.get_data();

        for (const internal in area_data.get_data()) {
            const area = data[internal];

            if (area.purchased != true) {
                // Filter out ocean areas
                if (!["reef", "spear_fishing", "deep_sea"].includes(area.internal)) {
                    return area;
                }
            }
        }

        return null;
    }
}