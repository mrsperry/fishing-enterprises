var shop = {
    internal: "shop",

    buttons: {
        sell_fish: {
            data: {
                parent: "resource_buttons",
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
        river_unlock: {
            condition: function() {
                return $("#river_button")
                    .is(":hidden");
            },
            data: {
                parent: "resource_buttons",
                id: "river_unlock",
                text: "Unlock the River ($500)",
                on_click: function() {
                    river.purchase();
                },
                disabled: function() {
                    return resources.money.count < 500;
                }
            }
        }
    },

    initialize() {
        main.switch_area(this);

        for (let index in this.buttons) {
            let item = this.buttons[index];
            // check if the button is removed
            if (item.removed == null || !item.removed) {
                // check the item's display condition
                if (item.condition == null || item.condition) {
                    button.create(item.data);
                }
            }
        }
    },

    update() {
        for (let id in this.buttons) {
            let button = this.buttons[id];
            $("#" + button.data.id + "_button")
                .prop("disabled", button.data.disabled);
        }
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
        }

        if (item.count < item.max) {
            if ($("#" + item.internal).length == 0) {
                counters.create("tackle_counters", item);
            }

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

    remove_item(id) {
        main.remove(id);
        this.buttons[id].removed = true;
    }
}