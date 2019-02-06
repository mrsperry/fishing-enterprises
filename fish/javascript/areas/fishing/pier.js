var pier = {
    internal: "pier",
    display: "Pier",
    unlock: "river",
    license: "Pier Fishing permit",
    workers: {
        license: "Private Pier Allocation",
        description: "Significant purchasing of public and private piers enables greater utilization of your workers",
        min: 7,
        check: "reef"
    },
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
        this.state = new fishing.state([
            resources.fish.redfish,
            resources.fish.mackerel,
            resources.fish.crabs,
            resources.fish.black_drum,
            resources.fish.tarpon
        ]);
    },

    update() {
        fishing.update(this.state);
    },

    load() {
        fishing.create_buttons();
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
                },
                {
                    resource: resources.tackle.cages,
                    price: 400
                }
            ]
        };
    }
}