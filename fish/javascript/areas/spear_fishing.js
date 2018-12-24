var spear_fishing = {
    internal: "spear_fishing",
    display: "Spear Fishing",
    unlock: "reef",
    license: "Spear Fishing permit",
    ocean: true,
    workers: {
        license: "Spear Wielding SCUBA Teams",
        description: "Groups of men and women given equipment to act like fish and hunt them down",
        min: 15,
        check: "deep_sea"
    },
    purchased: {
        price: 1250,
        buttons: [
            {
                resource: resources.bait.crustaceans,
                parent: "bait"
            },
            {
                resource: resources.bait.squid,
                parent: "bait"
            },
            {
                resource: resources.tackle.harpoon,
                parent: "tackle"
            }
        ]
    },

    initialize() {
        this.state = new fishing.state([
            resources.fish.lobster,
            resources.fish.grouper,
            resources.fish.tuna,
            resources.fish.swordfish,
            resources.fish.tiger_shark,
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

    get_auto_buys() {
        return {
            internal: spear_fishing.internal,
            auto_buys: [
                {
                    resource: resources.bait.mussels,
                    price: 400
                },
                {
                    resource: resources.tackle.spoon_lure,
                    price: 600
                }
            ]
        };
    }
}