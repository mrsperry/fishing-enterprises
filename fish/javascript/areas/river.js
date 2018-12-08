var river = {
    internal: "river",

    river_troll: true,
    queue_change: false,

    initialize() {
        this.state = new fishing.state([
            resources.fish.salmon,
            resources.fish.trout,
            resources.fish.pike
        ]);
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

    create_buttons() {
        if (this.queue_change) {
            this.river_troll = false;
        }

        if (this.river_troll) {
            buttons.create({
                parent: "resource_buttons",
                id: "river_troll",
                text: "Talk to the River Troll",
                on_click: function() {
                    river.queue_change = true;
                    // todo: river troll text

                    buttons.remove("river_troll");
                }
            });
        } else {
            fishing.create_buttons();
        }
    },

    get_auto_buys() {
        return {
            internal: river.internal,
            auto_buys: [
                {
                    resource: resources.bait.worms,
                    price: 100
                },
                {
                    resource: resources.bait.minnows,
                    price: 100
                }
            ]
        };
    }
}