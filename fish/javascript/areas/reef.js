var reef = {
    internal: "reef",
    display: "Reef",
    ocean: true,
    purchased: {
        price: 0,
        buttons: [
            {
                resource: resources.bait.mussels,
                parent: "bait"
            },
            {
                resource: resources.tackle.spoon_lure,
                parent: "tackle"
            }
        ]
    },

    initialize() {
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
        this.unlocked = true;
    },

    get_auto_buys() {
        return {
            internal: reef.internal,
            auto_buys: [
                {
                    resource: resources.fuel,
                    price: 500
                },
                {
                    resource: resources.bait.insects,
                    price: 300
                },
                {
                    resource: resources.tackle.bobber,
                    price: 400
                }
            ]
        };
    }
}