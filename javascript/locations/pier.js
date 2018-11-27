var pier = {
    internal: "pier",

    initialize() {
        main.switch_area(this);

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
        $("#pier_button")
            .fadeIn();

        shop.remove_item("pier_unlock");
        shop.update_money(-500);
        shop.add_item(resources.bait.insects, "bait");
        shop.add_item(resources.tackle.bobber, "tackle");

        boat.initialize();
    }
}