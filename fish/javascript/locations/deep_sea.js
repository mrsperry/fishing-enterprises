var deep_sea = {
    internal: "deep_sea",
    ocean: true,

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
        main.switch_area(this);

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

    unload() {
        fishing.unload(this.state);
    },

    purchase() {
        shop.add_auto_buy(resources.bait.crustaceans, 500);
        shop.add_auto_buy(resources.bait.squid, 600);
        shop.add_auto_buy(resources.bait.ground_fish, 700);
        shop.add_auto_buy(resources.tackle.harpoon, 800);
        shop.add_auto_buy(resources.tackle.spinner_lure, 1000);
    }
}