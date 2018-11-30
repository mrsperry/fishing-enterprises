var river = {
    internal: "river",

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

                    shop.add_item(resources.bait.guppies, "bait");

                    let tackle = resources.tackle.fly_tackle;
                    shop.buttons["fly_tackle"] = {
                        data: {
                            parent: "tackle_section",
                            id: "fly_tackle",
                            text: "Fly Tackle ($" + tackle.price + ")",
                            on_click: function() {
                                shop.purchase_item(tackle, false);
                                $(".tackle")
                                    .fadeIn();
                            },
                            disabled: function() {
                                return resources.money.count < tackle.price || tackle.count == tackle.max;
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

    purchase() {
        $("#river_button")
            .fadeIn();

        shop.remove_item("river_unlock");
        shop.update_money(-300);
    },

    create_state() {
        this.state = new fishing.state([
            resources.fish.salmon,
            resources.fish.trout,
            resources.fish.pike
        ]);
    }
}