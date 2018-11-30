var deep_sea = {
    internal: "deep_sea",

    purchased: {
        price: 2000,
        buttons: [
            {
                resource: resources.bait.ground_fish,
                parent: "bait"
            },
            {
                resource: resources.tackle.spinnerbait,
                parent: "tackle"
            }
        ]
    },

    initialize() {
        main.switch_area(this);

        this.state = new fishing.state([
            resources.fish.whitefish,
            resources.fish.lingcod,
            resources.fish.rockfish,
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
    }
}