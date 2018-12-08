var areas = {
    list: {
        shop: {
            display: "Shop",
        },
        lake: {
            display: "Lake",
        },
        river: {
            display: "River",
            unlock: "lake",
            license: "Fly Fishing permit",
            purchased: {
                price: 300,
                buttons: [
                    {
                        resource: resources.bait.guppies,
                        parent: "bait"
                    },
                    {
                        resource: resources.tackle.fly_tackle,
                        parent: "tackle"
                    }
                ]
            }
        },
        pier: {
            display: "Pier",
            unlock: "river",
            license: "Pier Fishing permit",
            purchased: {
                price: 500,
                buttons: [
                    {
                        resource: resources.bait.insects,
                        parent: "bait"
                    },
                    {
                        resource: resources.tackle.bobber,
                        parent: "tackle"
                    }
                ]
            }
        },
        reef: {
            display: "Reef",
            internal: "reef",
            purchased: {
                price: 0,
                buttons: [
                    {
                        resource: resources.bait.mussels,
                        parent: "bait"
                    },
                    {
                        resource: resources.tackle.spoon_lure,
                        parent: "tackle"
                    }
                ]
            }
        },
        spear_fishing: {
            display: "Spear Fishing",
            unlock: "reef",
            license: "Spear Fishing permit",
            purchased: {
                price: 1250,
                buttons: [
                    {
                        resource: resources.bait.crustaceans,
                        parent: "bait"
                    },
                    {
                        resource: resources.bait.squid,
                        parent: "bait"
                    },
                    {
                        resource: resources.tackle.harpoon,
                        parent: "tackle"
                    }
                ]
            }
        },
        deep_sea: {
            display: "Deep Sea",
            unlock: "spear_fishing",
            license: "Deep Sea permit",
            purchased: {
                price: 2000,
                buttons: [
                    {
                        resource: resources.bait.ground_fish,
                        parent: "bait"
                    },
                    {
                        resource: resources.tackle.spinner_lure,
                        parent: "tackle"
                    }
                ]
            }
        }
    },

    initialize() {
        for (let index in this.list) {
            let item = this.list[index];

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
                        text: item.license + " ($" + this.list[index].purchased.price + ")",
                        on_click: function() {
                            shop.purchase_area(index);
                        },
                        disabled: function() {
                            return resources.money.count <= areas.list[index].purchased.price
                                // disable the pier until the river troll has been talked to
                                || (index == "pier" ? !river.queue_change : false);
                        }
                    }
                }
            }

            if (index != "shop" && index != "lake") {
                shop.add_auto_buy_items(area.get_auto_buys());
                for (let button of this.list[index].purchased.buttons) {
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

        if (area.internal == "river" || area.internal == "lake") {
            area.create_buttons();
        } else {
            if (area.internal == "shop") {
                area.initialize();
            } else {
                fishing.create_buttons();
            }
        }
        this.current_area = area;
    },

    set_unlocked(area) {
        this.list[area].unlocked = true;

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