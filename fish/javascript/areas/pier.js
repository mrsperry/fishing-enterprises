var pier = {
    internal: "pier",

    initialize() {
        this.state = new fishing.state([
            resources.fish.redfish,
            resources.fish.mackerel,
            resources.fish.black_drum,
            resources.fish.tarpon
        ]);
    },

    update() {
        fishing.update(this.state);
    },

    unload() {
        fishing.unload(this.state);
    },

    purchase() {
        boat.initialize();
    },

    get_auto_buys() {
        return {
            internal: pier.internal,
            auto_buys: [
                {
                    resource: resources.bait.guppies,
                    price: 200
                },
                {
                    resource: resources.tackle.fly_tackle,
                    price: 200
                }
            ]
        };
    }
}