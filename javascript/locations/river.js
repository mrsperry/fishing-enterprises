var river = {
    internal: "river",
    state: null,

    river_troll: true,
    queue_change: false,

    initialize() {
        main.switch_area(this);

        if (this.queue_change) {
            this.river_troll = false;
        }

        if (this.river_troll) {
            button.create({
                parent: "resource_buttons",
                id: "river_troll",
                text: "Talk to the River Troll",
                on_click: function() {
                    river.queue_change = true;
                    // todo: river troll text

                    // unlock fly tackle
                    shop.buttons["fly_tackle"] = {
                        data: {
                            parent: "resource_buttons",
                            id: "fly_tackle",
                            text: "Fly Tackle ($2)",
                            on_click: function() {
                                shop.purchase_item(resources.tackle.fly_tackle);
                                $(".tackle")
                                    .fadeIn();
                            },
                            disabled: function() {
                                return resources.money.count < 2;
                            }
                        }
                    }
                    main.remove("river_troll");
                }
            });
        } else {
            this.create_state();
        }
    },

    update() {
        if (!this.river_troll) {
            fishing.update(this.state);
        }
    },

    unload() {
        if (!this.river_troll) {
            fishing.unload(this.state);
        }
    },

    purchase(river_button) {
        $("#river_button")
            .fadeIn();

        shop.remove_item("river_unlock");
        shop.update_money(-500);
    },

    create_state() {
        this.state = new fishing.state([
            resources.salmon,
            resources.trout,
            resources.pike
        ]);
    }
}