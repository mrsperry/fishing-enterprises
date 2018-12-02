var pier = {
    internal: "pier",

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
    },

    initialize() {
        locations.switch_area(this);

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

        shop.add_auto_buy(resources.bait.guppies, 200);
        shop.add_auto_buy(resources.tackle.fly_tackle, 200);
    }
}