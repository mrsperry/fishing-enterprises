var shop = {
    internal: "shop",

    initialize() {
        main.switch_area(this);

        let parent = $("#resource_buttons");

        // create buttons
        $("<button>")
            .attr("id", "sell_button")
            .text("Sell fish ($" + this.fish_value(false) + ")")
            .click(function() {
                shop.sell_fish();
            })
            .appendTo(parent);
        if (this.fish_value(false) == 0) {
            $(sell_button)
                .prop("disabled", true);
        }
    },

    update() {

    },

    unload() {
        
    },

    fish_value(reset) {
        let amount = 0;
        let keys = Object.keys(resources.fish);
        for (let index = 0; index < keys.length; index++) {
            let fish = resources.fish[keys[index]];
            amount += fish.count * fish.price;

            if (reset) {
                fish.count = 0;

                $("#" + fish.internal + "_count")
                    .text("0")
                    .css("opacity", 1);
            }
        }

        return amount;
    },

    sell_fish() {
        $("#money")
            .text(resources.money.count += this.fish_value(true));

        $("#sell_button")
            .text("Sell fish ($0)")
            .prop("disabled", true);
    }
}