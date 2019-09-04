class fishing_data {
    static initialize() {
        // Set bait and tackle defaults
        for (const type in fishing_data.data) {
            for (const index in fishing_data.data[type]) {
                const item = fishing_data.data[type][index];

                item.count = 0;
                item.total = 0;
            }
        }
    }

    static get_bait(index) {
        return fishing_data.data.bait[index];
    }

    static get_tackle(index) {
        return fishing_data.data.tackle[index];
    }

    static get_data() {
        return fishing_data.data;
    }

    static data = {
        bait: {
            worms: {
                internal: "worms",
                display: "Worms",
                message: "Writing around in the mud, these would make good bait.",
                price: 1,
                max: 30,
                max_caught: 3
            },
            guppies: {
                internal: "guppies",
                display: "Guppies",
                message: "Small fish to catch big fish.",
                price: 2,
                max: 20
            },
            insects: {
                internal: "insects",
                display: "Insects",
                message: "The nastier the critter, the tastier it is.",
                price: 3,
                max: 20
            },
            mussels: {
                internal: "mussels",
                display: "Mussels",
                message: "Hard shells protect their squishy and edible interior.",
                price: 4,
                max: 20
            },
            crustaceans: {
                internal: "crustaceans",
                display: "Crustaceans",
                message: "All manner of shrimp and krill fill the bucket.",
                price: 5,
                max: 15
            },
            squid: {
                internal: "squid",
                display: "Squid",
                message: "Tentacled, translucent, smelly and yet perfect bait.",
                price: 6,
                max: 15
            },
            ground_fish: {
                internal: "ground_fish",
                display: "Ground Fish",
                message: "Various fish bits and guts compiled for large hunters.",
                price: 7,
                max: 5
            }
        },
        tackle: {
            fly_tackle: {
                internal: "fly_tackle",
                display: "Fly Tackle",
                message: "Brightly colored and fuzzy, used to attract River fish.",
                price: 2,
                max: 20
            },
            cages: {
                internal: "cages",
                display: "Cages",
                message: "Traps of varying sizes to catch all manner of crustaceans.",
                price: 4,
                max: 20
            },
            bobber: {
                internal: "bobber",
                display: "Bobber",
                message: "Spherical bi-colored floatation devices.",
                price: 6,
                max: 15
            },
            spoon_lure: {
                internal: "spoon_lure",
                display: "Spoon Lure",
                message: "A small lure made to resemble the shape of a fish.",
                price: 8,
                max: 15
            },
            harpoon: {
                internal: "harpoon",
                display: "Harpoon",
                message: "A manual weapon loaded with a large barb tipped spear.",
                price: 10,
                max: 10
            },
            spinner_lure: {
                internal: "spinner_lure",
                display: "Spinner Lure",
                message: "Long strands extend out of this lure, giving the impression of a squid.",
                price: 12,
                max: 5
            }
        }
    };
}