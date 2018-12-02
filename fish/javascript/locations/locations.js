var locations = {
    current_area: null,
    
    areas: [
        {
            display: "Shop",
            internal: "shop"
        },
        {
            display: "Lake",
            internal: "lake"
        },
        {
            display: "River",
            internal: "river",
            unlock: "lake",
            license: "Fly Fishing permit"
        },
        {
            display: "Pier",
            internal: "pier",
            unlock: "river",
            license: "Pier Fishing permit"
        },
        {
            display: "Reef",
            internal: "reef"
        },
        {
            display: "Spear Fishing",
            internal: "spear_fishing",
            unlock: "reef",
            license: "Spear Fishing permit"
        },
        {
            display: "Deep Sea",
            internal: "deep_sea",
            unlock: "spear_fishing",
            license: "Deep Sea permit"
        }
    ],

    initialize() {
        for (let index = 0; index < this.areas.length; index++) {
            let item = this.areas[index];

            let area = window[item.internal];
            buttons.create({
                parent: "area_selector",
                id: item.internal,
                text: item.display,
                hide: true,
                on_click: function() {
                    $("#resource_buttons")
                        .empty();

                    area.initialize();
                }
            });

            if (index > 1 && item.internal != "reef") {
                shop.buttons[item.internal + "_unlock"] = {
                    condition: function() {
                        return !$("#" + item.unlock + "_button")
                            .is(":hidden");
                    },
                    data: {
                        parent: "misc_section",
                        id: item.internal + "_unlock",
                        text: item.license + " ($" + area.purchased.price + ")",
                        on_click: function() {
                            shop.purchase_area(item.internal);
                        },
                        disabled: function() {
                            return resources.money.count <= area.purchased.price
                                // disable the pier until the river troll has been talked to
                                || (item.internal == "pier" ? !river.queue_change : false);
                        }
                    }
                }
            }
        }
    },

    switch_area(area) {
        let children = $("#area_selector")
            .children();
        for (let index = 0; index < children.length; index++) {
            $(children[index])
                .prop("disabled", false);
        }

        $("#" + area.internal + "_button")
            .prop("disabled", true);

        if (this.current_area != null) {
            this.current_area.unload();
        }

        this.current_area = area;
    }
}