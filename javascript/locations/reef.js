var reef = {
    internal: "reef",
    
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

        shop.remove_item("reef_unlock");
        shop.update_money(-850);
        shop.add_item(resources.bait.mussels, true);
        shop.add_item(resources.tackle.spoon_lure, false);
    }
}