class shop {
    static clickables = [
        {
            name: "shopkeeper",
            text: () => {
                return "Sell your fish (+$0)";
            },
            on_click: () => {
            }
        },
        {
            name: "catalog",
            text: "Fish Catalog ($250)",
            on_click: () => {
            }
        },
        {
            name: "license",
            decor: true,
            text: () => {
                return "River License ($300)";
            },
            on_click: () => {
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
            }
        }
    ];

    static initialize() {
        // Disable the area selector button
        $("#shop-selector-button")
            .prop("disabled", true);
        // Enable the previously disabled area selector button
        $("#" + fishing.data.internal + "-selector-button")
            .prop("disabled", false);
        // Remove fishing data as the shop isn't a fishing area
        fishing.data = null;

        // Fade out resource buttons
        $("#resource-buttons")
            .fadeOut(400, () => {
                // Load shop CSS
                css.load(["areas/shop"]);

                shop.load_elements();
            });
    }

    static load_elements() {
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
                    .click(() => shop.buy_consumable(item))
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
        for (const item of shop.clickables) {
            const holder = $("<div>")
                .attr("id", item.name + "-holder")
                .addClass("art shop-item no-select")
                .click(item.on_click)
                .appendTo(art);
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

            // Create the tooltip
            $("<div>")
                .attr("id", item.name + "-tooltip")
                .addClass("tooltip")
                .text(typeof(item.text) == "function" ? item.text() : item.text)
                .appendTo(child);
        }

        // Hide the contract until all upgrades are bought
        $("#contract-holder")
            .css("visibility", "hidden");

        // Special behavior for door hover
        $("#door-holder")
            .off("hover")
            .hover(() => {
                $("#door-decor")
                    .stop()
                    .fadeIn(200);
            }, () => {
                $("#door-decor")
                    .stop()
                    .fadeOut(200);
            });
        // Remove door tooltip
        $("#door-tooltip")
            .remove();
    }

    // Generic buy checks
    static buy(item) {
        const money = misc_data.get("money");

        // Check if the player has enough money to buy this item
        if (money.count < item.price) {
            messenger.write("You don't have enough money!");
            return false;
        }

        // Check if the player can hold this item
        if (item.count == item.max) {
            messenger.write("You can't hold any more!");
            return false;
        }

        // Check if the item's message should be displayed
        if (item.show_message != true) {
            messenger.write(item.display + ": " + item.message);
            item.show_message = true;
        }

        // Mark this item as purchased for saving
        item.purchased = true;

        // Subtract the cost of the item
        money.count -= item.price;

        // Display the new money count
        $("#money-count")
            .text(money.count);

        return true;
    }

    // Handles buying of bait or tackle
    static buy_consumable(item) {
        // Check base conditions
        if (!shop.buy(item)) {
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
    }
}