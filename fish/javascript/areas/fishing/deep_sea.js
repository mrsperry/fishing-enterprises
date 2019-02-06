var deep_sea = {
    internal: "deep_sea",
    display: "Deep Sea",
    unlock: "spear_fishing",
    license: "Deep Sea permit",
    ocean: true,
    workers: {
        license: "Deep Sea Barges",
        description: "Fleets of large ships to harvest the darkest corners of every ocean",
        min: 20
    },
    purchased: {
        price: 2000,
        buttons: [
            {
                resource: resources.bait.ground_fish,
                parent: "bait"
            },
            {
                resource: resources.tackle.spinner_lure,
                parent: "tackle"
            }
        ]
    },

    initialize() {
        this.state = new fishing.state([
            resources.fish.whitefish,
            resources.fish.lingcod,
            resources.fish.stonefish,
            resources.fish.marlin,
            resources.fish.mako_shark,
            resources.fish.thresher_shark
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
            internal: deep_sea.internal,
            auto_buys: [
                {
                    resource: resources.bait.crustaceans,
                    price: 500
                },
                {
                    resource: resources.bait.squid,
                    price: 600
                },
                {
                    resource: resources.bait.ground_fish,
                    price: 700
                },
                {
                    resource: resources.tackle.harpoon,
                    price: 800
                },
                {
                    resource: resources.tackle.spinner_lure,
                    price: 1000
                },
            ]
        };
    }
}