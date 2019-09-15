class shop {
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

                // Load shop art
                const art = $("#area-art")
                    .html(art_data.get("shop", "background"))
                    .hide()
                    .fadeIn();

                const data = fishing_data.get_data();

                // Create bait clickables
                const bait_parent = $("<div>")
                    .attr("id", "bait-item-holder")
                    .addClass("art")
                    .appendTo(art);

                for (const internal in data.bait) {
                    const bait = data.bait[internal];

                    // Create the bait jars
                    const bait_art = $("<div>")
                        .addClass("shop-item no-select flex flex-justify-center")
                        .html(art_data.get("shop", "jar"))
                        // Tooltip show/hide
                        .hover(() => {
                            $("#" + bait.internal + "-tooltip")
                                .stop()
                                .fadeIn();
                        }, () => {
                            $("#" + bait.internal + "-tooltip")
                                .stop()
                                .fadeOut();
                        })
                        .appendTo(bait_parent);
                    // Overlay the bait art
                    $("<div>")
                        .attr("id", bait.internal + "-decor")
                        .addClass("bait-decor")
                        .html(art_data.get("shop", bait.internal + "-decor"))
                        .appendTo(bait_art);
                    // Create the tooltip element
                    $("<div>")
                        .attr("id", bait.internal + "-tooltip")
                        .addClass("bait-tooltip")
                        .text(bait.display + " ($" + bait.price + ")")
                        .appendTo(bait_art);
                }

                // Create tackle clickables
                const tackle_parent = $("<div>")
                    .attr("id", "tackle-item-holder")
                    .addClass("art")
                    .appendTo(art);

                for (const internal in data.tackle) {
                    const tackle = data.tackle[internal];

                    // Create the tackle hooks
                    const tackle_holder = $("<div>")
                        .addClass("shop-item no-select flex flex-justify-center tackle-item")
                        .hover(() => {
                            $("#" + tackle.internal + "-tooltip")
                            .stop()
                            .fadeIn();
                        }, () => {
                            $("#" + tackle.internal + "-tooltip")
                            .stop()
                            .fadeOut();
                        })
                        .appendTo(tackle_parent);
                    
                    // Overlay the tackle art
                    $("<div>")
                        .attr("id", tackle.internal + "-decor")
                        .addClass("tackle-decor")
                        .html(art_data.get("shop", tackle.internal + "-decor"))
                        .appendTo(tackle_holder);
                    // Create the tooltip element
                    $("<div>")
                        .attr("id", tackle.internal + "-tooltip")
                        .addClass("tackle-tooltip")
                        .text(tackle.display + " ($" + tackle.price + ")")
                        .appendTo(tackle_holder);
                }

                // Create the shopkeeper clickable
                const shopkeeper_parent = $("<div>")
                    .attr("id", "shopkeeper-holder")
                    .addClass("art shop-item no-select")
                    .appendTo(art);
                const shopkeeper = $("<div>")
                    .addClass("flex flex-justify-center")
                    .text(art_data.get("shop", "shopkeeper"))
                    // Tooltip show/hide
                    .hover(() => {
                        $("#shopkeeper-tooltip")
                            .stop()
                            .fadeIn();
                    }, () => {
                        $("#shopkeeper-tooltip")
                            .stop()
                            .fadeOut();
                    })
                    .appendTo(shopkeeper_parent);
                $("<div>")
                    .attr("id", "shopkeeper-tooltip")
                    .addClass("tooltip")
                    .text("Sell your fish (+$0)")
                    .appendTo(shopkeeper);

                // Create the catalog clickable
                const catalog_parent = $("<div>")
                    .attr("id", "catalog-holder")
                    .addClass("art shop-item no-select")
                    .appendTo(art);
                const catalog = $("<div>")
                    .addClass("flex flex-justify-center")
                    .text(art_data.get("shop", "catalog"))
                    // Tooltip show/hide
                    .hover(() => {
                        $("#catalog-tooltip")
                            .stop()
                            .fadeIn();
                    }, () => {
                        $("#catalog-tooltip")
                            .stop()
                            .fadeOut();
                    })
                    .appendTo(catalog_parent);
                $("<div>")
                    .attr("id", "catalog-tooltip")
                    .addClass("tooltip")
                    .text("Fish Catalog ($250)")
                    .appendTo(catalog);
        
                // Create the fishing license clickable
                const license_parent = $("<div>")
                    .attr("id", "license-holder")
                    .addClass("art shop-item no-select")
                    .appendTo(art);
                const license = $("<div>")
                    .addClass("flex flex-centered")
                    .html(art_data.get("shop", "license"))
                    .hover(() => {
                        $("#license-tooltip")
                            .stop()
                            .fadeIn();
                    }, () => {
                        $("#license-tooltip")
                            .stop()
                            .fadeOut();
                    })
                    .appendTo(license_parent);
                $("<div>")
                    .attr("id", "license-decor")
                    .addClass("art")
                    .html(art_data.get("shop", "license-decor"))
                    .appendTo(license);
                $("<div>")
                    .attr("id", "license-tooltip")
                    .addClass("tooltip")
                    .text("River License ($300)")
                    .appendTo(license);

                // Create the shop contract clickable
                const contract_parent = $("<div>")
                    .attr("id", "contract-holder")
                    .addClass("art shop-item no-select")
                    .css("visibility", "hidden")
                    .appendTo(art);
                const contract = $("<div>")
                    .addClass("flex flex-centered")
                    .html(art_data.get("shop", "contract"))
                    .hover(() => {
                        $("#contract-tooltip")
                            .stop()
                            .fadeIn();
                    }, () => {
                        $("#contract-tooltip")
                            .stop()
                            .fadeOut();
                    })
                    .appendTo(contract_parent);
                $("<div>")
                    .attr("id", "contract-decor")
                    .addClass("art")
                    .html(art_data.get("shop", "contract-decor"))
                    .appendTo(contract);
                $("<div>")
                    .attr("id", "contract-tooltip")
                    .addClass("tooltip")
                    .text("Buy the Shop ($15,000)")
                    .appendTo(contract);

                // Create the door clickable
                const door_parent = $("<div>")
                    .attr("id", "door-holder")
                    .addClass("art shop-item no-select")
                    .appendTo(art);
                const door = $("<div>")
                    .addClass("flex flex-centered")
                    .html(art_data.get("shop", "door"))
                    .hover(() => {
                        $("#door-decor")
                            .stop()
                            .fadeIn(200);
                    }, () => {
                        $("#door-decor")
                            .stop()
                            .fadeOut(200);
                    })
                    .appendTo(door_parent);
                $("<div>")
                    .attr("id", "door-decor")
                    .addClass("art")
                    .html(art_data.get("shop", "door-decor"))
                    .hide()
                    .appendTo(door);
            });
    }
}