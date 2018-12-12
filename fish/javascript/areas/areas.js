var areas = {
    list: [
        "shop",
        "lake",
        "river",
        "pier",
        "reef",
        "spear_fishing",
        "deep_sea"
    ],

    initialize() {
        for (let index of this.list) {
            let item = window[index];

            let area = window[index];
            buttons.create({
                parent: "area_selector",
                id: index,
                text: item.display,
                hide: true,
                on_click: function() {
                    areas.switch_area(area);
                }
            });

            if (index != "shop" && index != "lake" && index != "reef") {
                shop.buttons[index + "_unlock"] = {
                    condition: function() {
                        return !$("#" + item.unlock + "_button")
                            .is(":hidden");
                    },
                    data: {
                        parent: "misc_section",
                        id: index + "_unlock",
                        text: item.license + " ($" + area.purchased.price + ")",
                        on_click: function() {
                            shop.purchase_area(index);
                        },
                        disabled: function() {
                            return resources.money.count <= window[index].purchased.price
                                // disable the pier until the river troll has been talked to
                                || (index == "pier" ? !river.queue_change : false);
                        }
                    }
                }
            }

            if (index != "shop" && index != "lake") {
                shop.add_auto_buy_items(area.get_auto_buys());
                for (let button of area.purchased.buttons) {
                    shop.add_item(index, button.resource, button.parent);
                }
            }

            if (index != "shop") {
                area.initialize();
            }
        }
    },

    switch_area(area) {
        $("#resource_buttons")
            .empty();
    
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

        area.load();
        this.current_area = area;
    },

    set_unlocked(area) {
        window[area].unlocked = true;

        $("#" + area + "_button")
            .fadeIn();
    },

    get_header(area) {
        let item = window[area];

        let count = 0;
        if (item.state != null) {
            for (let fish of item.state.fish) {
                if (fish.internal != "minnows") {
                    if (fish.caught != null && fish.caught) {
                        count++;
                    }
                }
            }
        }

        let max = 0;
        if (item.state != null) {
            max = item.state.fish.length;

            if (area == "lake") {
                max--;
            }
        }

        if (count == max) {
            $("#" + area + "_header_count")
                .css("opacity", 0.4);
        }

        return " (" + count + "/" + max + ")";
    }
}