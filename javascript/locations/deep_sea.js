var deep_sea = {
    internal: "deep_sea_fishing",

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
    },

    purchase() {
        $("#deep_sea_button")
            .fadeIn();

        shop.remove_item("deep_sea_unlock");
        shop.update_money(-2000);
        shop.add_item(resources.bait.ground_fish, "bait");
        shop.add_item(resources.tackle.spinnerbait, "tackle");
    }
}