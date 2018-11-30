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
                return !$("#pier_button")
                    .is(":hidden");
            },
            data: {
                parent: "misc_section",
                id: "buy_fuel",
                text: "Fuel ($5)",
                on_click: function() {
                    shop.purchase_item(resources.fuel);
                },
                disabled: function() {
                    let fuel = resources.fuel;
                    return resources.money.count < 5 || fuel.count == fuel.max;
                }
            }
        },
    },

    initialize() {
        main.switch_area(this);

        let parent = $("#resource_buttons");
        $("<div>")
            .attr("id", "above_section")
            .appendTo(parent);
        $("<div>")
            .attr("id", "bait_section")
            .attr("display", "Bait")
            .addClass("before")
            .addClass("section")
            .appendTo(parent);
        $("<div>")
            .attr("id", "tackle_section")
            .attr("display", "Tackle")
            .addClass("before")
            .addClass("section")
            .addClass("section_center")
            .appendTo(parent);
        $("<div>")
            .attr("id", "misc_section")
            .attr("display", "Misc")
            .addClass("before")
            .addClass("section")
            .addClass("section_right")
            .appendTo(parent);

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
                button.create(item.data);
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
                    button.create(item.data);
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
        if (item.count == null) {
            item.count = 0;
            item.total = 0;

            $("#" + item.internal)
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

        let area = window[name].purchased;

        shop.remove_item(name + "_unlock");
        shop.update_money(-area.price);

        for (let item of area.buttons) {
            shop.add_item(item.resource, item.parent);
        }

        if (name == "pier") {
            boat.initialize();
        }
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

    remove_item(id) {
        main.remove(id);
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