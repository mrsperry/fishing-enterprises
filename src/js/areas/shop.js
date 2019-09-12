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
        
                // Create the fishing license clickable
                const license = $("<div>")
                    .attr("id", "area-license")
                    .addClass("art")
                    .html(art_data.get("shop", "license"))
                    .appendTo(art);
                $("<div>")
                    .attr("id", "area-license-decor")
                    .addClass("art")
                    .text(art_data.get("shop", "license-decor"))
                    .appendTo(license);

                // Create bait clickables
                const parent = $("<div>")
                    .attr("id", "bait-item-holder")
                    .addClass("art")
                    .appendTo(art);

                // Loop through all bait
                const data = fishing_data.get_data();
                for (const internal in data.bait) {
                    const bait = data.bait[internal];

                    const bait_art = $("<div>")
                        .addClass("shop-item flex flex-justify-center")
                        .text(art_data.get("shop", "can"))
                        .hover(() => {
                            $("#" + bait.internal + "-tooltip")
                                .stop()
                                .fadeIn();
                        }, () => {
                            $("#" + bait.internal + "-tooltip")
                                .stop()
                                .fadeOut();
                        })
                        .appendTo(parent);
                    $("<div>")
                        .attr("id", bait.internal + "-decor")
                        .addClass("shop-item-decor")
                        .html(art_data.get("shop", bait.internal + "-decor"))
                        .appendTo(bait_art);
                    $("<div>")
                        .attr("id", bait.internal + "-tooltip")
                        .addClass("tooltip")
                        .text(bait.display + " ($" + bait.price + ")")
                        .hide()
                        .appendTo(bait_art);
                }
            });
    }
}