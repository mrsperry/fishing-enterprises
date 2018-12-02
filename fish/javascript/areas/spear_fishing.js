var spear_fishing = {
    internal: "spear_fishing",
    ocean: true,

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
        areas.switch_area(this);

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

    unload() {
        fishing.unload(this.state);
    },

    purchase() {
        shop.add_auto_buy(resources.bait.mussels, 400);
        shop.add_auto_buy(resources.tackle.spoon_lure, 600);
    }
}