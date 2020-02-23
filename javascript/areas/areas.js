var areas = {
    list: [
        "shop",
        "business",
        "lake",
        "river",
        "pier",
        "reef",
        "spear_fishing",
        "deep_sea"
    ],

    fish_list: [
        "lake",
        "river",
        "pier",
        "reef",
        "spear_fishing",
        "deep_sea"
    ],

    initialize() {
        for (let index of this.list) {
            let area = window[index];
            if (index != "business") {
                buttons.create({
                    parent: "area_selector",
                    id: index,
                    text: area.display,
                    hide: true,
                    on_click: function() {
                        areas.switch_area(area);
                    }
                });
            }

            if (index != "shop" && index != "lake" && index != "reef") {
                shop.buttons[index + "_unlock"] = {
                    condition: function() {
                        return !$("#" + area.unlock + "_button")
                            .is(":hidden");
                    },
                    data: {
                        parent: "misc_section",
                        id: index + "_unlock",
                        text: area.license + " ($" + main.stringify(area.purchased.price) + ")",
                        on_click: function() {
                            shop.purchase_area(index);

                            if (index == "business") {
                                areas.switch_area(business);
                            }
                        },
                        disabled: function() {
                            let length = (index == "business" ? $("#misc_section").children().length : 0);
                            return resources.money.count <= area.purchased.price
                                // disable the pier until the river troll has been talked to
                                || (index == "pier" ? !river.queue_change : false)
                                || (index == "business" ? !(length == 1 || length == 2) : false);
                        }
                    }
                }
            }

            if (index != "shop" && index != "business" && index != "lake") {
                shop.add_auto_buy_items(area.get_auto_buys());
                for (let button of area.purchased.buttons) {
                    shop.add_item(index, button.resource, button.parent);
                }
            }

            if (index != "shop" && index != "business") {
                let area = window[index];
                area.workers.count = 0;

                if (index == "lake") {
                    area.workers.break = true;
                }

                vendor.add_item(business.vendor, {
                    condition: function() {
                        let unlocked = area.unlock == null ? true : window[area.unlock].workers.enabled;
                        if (area.unlock == null && area.internal == "reef") {
                            unlocked = pier.workers.enabled;
                        }
                        return unlocked;
                    },
                    data: {
                        parent: "investments_section",
                        id: index + "_worker_unlock",
                        classes: ["button", "horizontal_button"],
                        header: {
                            bold: area.workers.license,
                            regular: "($" + main.stringify(area.purchased.price * 10) + ")",
                        },
                        text: area.workers.description,
                        on_click: function() {
                            area.workers.enabled = true;
                            shop.update_money(-(area.purchased.price * 10));
                            vendor.remove_item(business.vendor, index + "_worker_unlock", business.check_empty);
                            business.update_workers();
                        },
                        disabled: function() {
                            let enabled;
                            if (area.internal == "lake") {
                                enabled = true;
                            } else if (area.internal == "reef") {
                                enabled = pier.workers.enabled == null ? false : pier.workers.enabled;
                            } else {
                                let workers = window[area.unlock].workers.enabled;
                                enabled = workers == null ? false : workers;
                            }

                            return resources.money.count < (area.purchased.price * 10)
                                || !enabled;
                        }
                    }
                });
            }

            area.initialize();
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
            if (typeof this.current_area.unload == "function") {
                this.current_area.unload();
            }
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