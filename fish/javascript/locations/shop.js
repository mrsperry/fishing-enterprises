var shop = {
    internal: "shop",

    buttons: {
        sell_fish: {
            data: {
                parent: "above_section",
                id: "sell_fish",
                text: function() {
                    return "Sell fish ($" + shop.fish_value(false) + ")";
                },
                on_click: function() {
                    shop.sell_fish();
                },
                disabled: function() { 
                    return shop.fish_value(false) == 0; 
                }, 
            }
        },
        buy_fuel: {
            condition: function() {
                return !$("#reef_button")
                    .is(":hidden");
            },
            data: {
                parent: "misc_section",
                id: "buy_fuel",
                text: "Fuel ($5)",
                on_click: function() {
                    shop.purchase_item(resources.fuel, true);
                },
                disabled: function() {
                    let fuel = resources.fuel;
                    return resources.money.count < 5 || fuel.count == fuel.max;
                }
            }
        }
    },

    initialize() {
        locations.switch_area(this);

        let parent = $("#resource_buttons");
        $("<div>")
            .attr("id", "above_section")
            .appendTo(parent);

        let names = ["Bait", "Tackle", "Misc"];
        for (let name of names) {
            $("<div>")
                .attr("id", name.toLowerCase() + "_section")
                .attr("display", name)
                .addClass("before")
                .addClass("section")
                .appendTo(parent);
        }
        $("#tackle_section")
            .addClass("section_center")
        $("#misc_section")
            .addClass("section_right")

        for (let index in this.buttons) {
            let item = this.buttons[index];
            if (this.check_button(item)) {
                let element = $("#" + item.data.parent);
                if ($(element)
                    .is(":hidden")) {
                    $(element)
                        .fadeIn();
                }

                item.data["classes"] = ["button"];
                buttons.create(item.data);
            }
        }

        this.check_empty();
    },

    update() {
        for (let id in this.buttons) {
            let item = this.buttons[id];
            if ($("#" + item.data.id + "_button").length == 1) {
                $("#" + item.data.id + "_button")
                    .prop("disabled", item.data.disabled);
            } else {
                if (this.check_button(item)) {
                    item.data["classes"] = ["button"];
                    buttons.create(item.data);
                }
            }
        }

        this.check_empty();
    },

    unload() {

    },

    update_money(value) {
        resources.money.count += value;

        if (value > 0) {
            resources.money.total += value;
        }

        counters.update();
        this.update();
    },

    fish_value(reset) {
        let amount = 0;
        for (let index in resources.fish) {
            let fish = resources.fish[index];
            if (fish.count != null) {
                amount += fish.count * fish.price;

                if (reset) {
                    fish.count = 0;
                }
            }
        }

        counters.update();

        return amount;
    },

    sell_fish() {
        this.update_money(this.fish_value(true));

        $("#sell_fish_button")
            .text("Sell fish ($0)");
    },

    purchase_item(item) {
        let element = $("#" + item.internal);
        let parent = $(element)
            .parent();
        if ($(parent)
                .attr("id") == "tackle_counters") {
            $(".tackle")
                .fadeIn();
        }

        if (item.count == null) {
            item.count = 0;
            item.total = 0;

            $(element)
                .fadeIn();
        }

        if (item.count < item.max) {
            if (++item.count == item.max) {
                counters.show_max(item);
            }
            item.total++;

            this.update_money(-item.price);
            counters.update();
        } else {
            counters.show_max(item);
        }
    },

    purchase_area(name) {
        $("#" + name + "_button")
            .fadeIn();

        let area = window[name];
        let data = area.purchased;

        shop.remove_item(name + "_unlock");
        shop.update_money(-data.price);

        for (let item of data.buttons) {
            shop.add_item(item.resource, item.parent);
        }

        area.purchase();
    },

    add_item(item, section) {
        shop.buttons[item.internal] = {
            data: {
                parent: section + "_section",
                id: item.internal,
                text: item.display + " ($" + item.price + ")",
                on_click: function() {
                    shop.purchase_item(item);
                },
                disabled: function() {
                    return resources.money.count < item.price || item.count == item.max;
                }
            }
        }
        
        let element = $("#no_sale_" + section);
        $(element)
            .fadeOut(400, (function() { 
                $(element)
                    .remove();
            }));
    },

    add_auto_buy(item, price) {
        let id = item.internal + "_auto_buy"
        this.buttons[id] = {
            data: {
                parent: "misc_section",
                id: id,
                text: "Auto buy " + item.display + " ($" + main.stringify(price) + ")",
                on_click: function() {
                    counters.set_auto_buy(item);
                    shop.remove_item(id);
                    resources.money.count -= price;
                },
                disabled: function() {
                    return resources.money.count < price;
                }
            }
        }
    },

    remove_item(id) {
        buttons.remove(id);
        this.buttons[id].removed = true;
        this.buttons[id].data.disabled = true;
    },

    check_button(item) {
        // check if the button is removed
        if (item.removed == null || !item.removed) {
            // check the item's display condition
            if (item.condition == null || item.condition()) {
                return true;
            }
        }

        return false;
    },

    check_empty() {
        let ids = ["bait", "tackle", "misc"]
        for (let id of ids) {
            let parent = $("#" + id + "_section");
            if ($(parent).children().length == 0) {
                $("<p>")
                    .attr("id", "no_sale_" + id)
                    .addClass("no_sale")
                    .text("Nothing for sale!")
                    .appendTo(parent);
            }
        }
    }
}