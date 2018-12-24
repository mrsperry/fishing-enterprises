var reef = {
    internal: "reef",
    display: "Reef",
    ocean: true,
    workers: {
        license: "Tear-Resistant Nets",
        description: "Smaller net meshes mean they can be reinforced to combat sharp coral",
        min: 10,
        check: "spear_fishing"
    },
    purchased: {
        price: 850,
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

    load() {
        fishing.create_buttons();
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