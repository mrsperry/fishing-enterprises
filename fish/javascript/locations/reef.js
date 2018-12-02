var reef = {
    internal: "reef",
    ocean: true,

    initialize() {
        main.switch_area(this);

        this.state = new fishing.state([
            resources.fish.snapper,
            resources.fish.hogfish,
            resources.fish.moray_eel,
            resources.fish.barracuda,
            resources.fish.lemon_shark
        ]);
    },

    update() {
        fishing.update(this.state);
    },

    unload() {
        fishing.unload(this.state);
    },

    purchase() {
        $("#reef_button")
            .fadeIn();

        shop.add_item(resources.bait.mussels, "bait");
        shop.add_item(resources.tackle.spoon_lure, "tackle");

        shop.add_auto_buy(resources.fuel, 500);
        shop.add_auto_buy(resources.bait.insects, 300);
        shop.add_auto_buy(resources.tackle.bobber, 400);
    }
}