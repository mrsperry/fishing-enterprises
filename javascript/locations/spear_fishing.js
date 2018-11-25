var spear_fishing = {
    internal: "spear_fishing",

    initialize() {
        main.switch_area(this);

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
        $("#spear_fishing_button")
            .fadeIn();

        shop.remove_item("spear_fishing_unlock");
        shop.update_money(-1250);
        shop.add_item(resources.bait.crustaceans, "bait");
        shop.add_item(resources.bait.squid, "bait");
        shop.add_item(resources.tackle.harpoon, "tackle");
    }
}