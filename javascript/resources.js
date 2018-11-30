var resources = {
    money: {
        message: "money often costs too much, but I doubt the fish care",
        count: 0,
        total: 0
    },

    fuel: {
        display: "Fuel",
        internal: "fuel",
        message: "",
        price: 5,
        count: 0,
        total: 0,
        max: 30
    },

    /* 
        breakdown of the bait/tackle/fish objects
        guppies: {
            the name displayed on the resource counter
            display: "Guppies",

            the name used in internal references and IDs
            internal: "guppies",

            the message displayed when the fish is first caught
            message: "these would make excellent bait for larger fish",

            if this fish has been caught before
            caught: false,

            if a horizontal break should be added
            break: false,

            if the max number of this fish should be displayed on the resource counters
            show_max: false,

            the max number of this fish you can catch per bait used
            max_caught: 2,

            the current amount of this fish stored; set to 0 when you sell
            count: 0,

            the total amount of this fish caught (persists when you sell fish)
            total: 0,

            the max number of this fish you can store at once
            max: 10

            the chance to catch if you have avaliable bait
            chance: 60,

            disallow catching this fish before the specified fish is caught
            after: "bass",

            all of these baits must be avaliable to catch the fish
            bait: [
                {
                    the type of bait
                    type: "worms",

                    the amount needed to catch the fish
                    amount: 1
                }
            ],

            all of these tackle must be avaliable to catch the fish
            tackle: [
                {
                    the type of tackle
                    type: "fly_tackle",

                    the amount needed to catch the fish
                    amount: 1
                }
            ]
        }
    */

    bait: {
        worms: {
            display: "Worms",
            internal: "worms",
            message: "worms writhing in the mud would make good bait",
            max_caught: 3,
            max: 30
        },
        minnows: {
            display: "Minnows",
            internal: "minnows",
            message: "these would make excellent bait for larger fish",
            max_caught: 2,
            max: 20,
            chance: 60,
            after: "bass",
            bait: [
                {
                    type: "worms",
                    amount: 1
                }
            ]
        },
        guppies: {
            display: "Guppies",
            internal: "guppies",
            message: "worms writhing in the mud would make good bait",
            price: 2,
            max: 20
        },
        insects: {
            display: "Insects",
            internal: "insects",
            message: "worms writhing in the mud would make good bait",
            price: 3,
            max: 15
        },
        mussels: {
            display: "Mussels",
            internal: "mussels",
            message: "worms writhing in the mud would make good bait",
            price: 4,
            max: 15
        },
        crustaceans: {
            display: "Crustaceans",
            internal: "crustaceans",
            message: "worms writhing in the mud would make good bait",
            price: 5,
            max: 10
        },
        squid: {
            display: "Squid",
            internal: "squid",
            message: "worms writhing in the mud would make good bait",
            price: 6,
            max: 10
        },
        ground_fish: {
            display: "Ground Fish",
            internal: "ground_fish",
            message: "worms writhing in the mud would make good bait",
            price: 7,
            max: 5
        },
    },

    tackle: {
        fly_tackle: {
            display: "Fly Tackle",
            internal: "fly_tackle",
            message: "",
            price: 2,
            max: 20
        },
        bobber: {
            display: "Bobber",
            internal: "bobber",
            message: "",
            price: 4,
            max: 15
        },
        spoon_lure: {
            display: "Spoon Lure",
            internal: "spoon_lure",
            message: "",
            price: 6,
            max: 15
        },
        harpoon: {
            display: "Harpoon",
            internal: "harpoon",
            message: "",
            price: 8,
            max: 10
        },
        spinnerbait: {
            display: "Spinnerbait",
            internal: "spinnerbait",
            message: "",
            price: 10,
            max: 5
        },
    },

    fish: {
        // lake fish
        bass: {
            display: "Bass",
            internal: "bass",
            message: "nothing special but it will sell",
            price: 5,
            max: 10,
            chance: 60,
            bait: [
                {
                    type: "worms",
                    amount: 1
                }
            ]
        },
        sturgeon: {
            display: "Sturgeon",
            internal: "sturgeon",
            message: "this one thrashed wildly before submitting to the line",
            price: 10,
            max: 5,
            chance: 45,
            after: "minnows",
            bait: [
                {
                    type: "worms",
                    amount: 1
                },
                {
                    type: "minnows",
                    amount: 1
                }
            ]
        },
        chub: {
            display: "Chub",
            internal: "chub",
            message: "a large fish, looks to have been a fighter",
            price: 15,
            max: 3,
            chance: 30,
            after: "sturgeon",
            bait: [
                {
                    type: "worms",
                    amount: 2
                },
                {
                    type: "minnows",
                    amount: 2
                }
            ]
        },
        // river fish
        salmon: {
            display: "Salmon",
            internal: "salmon",
            message: "a large fish, looks to have been a fighter",
            break: true,
            price: 10,
            max: 10,
            chance: 60,
            bait: [
                {
                    type: "worms",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "fly_tackle",
                    amount: 1
                }
            ]
        },
        trout: {
            display: "Trout",
            internal: "trout",
            message: "a large fish, looks to have been a fighter",
            price: 15,
            max: 5,
            chance: 40,
            after: "salmon",
            bait: [
                {
                    type: "minnows",
                    amount: 1
                },
                {
                    type: "guppies",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "fly_tackle",
                    amount: 1
                }
            ]
        },
        pike: {
            display: "Pike",
            internal: "pike",
            message: "a large fish, looks to have been a fighter",
            price: 20,
            max: 3,
            chance: 30,
            after: "trout",
            bait: [
                {
                    type: "guppies",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "fly_tackle",
                    amount: 1
                }
            ]
        },
        // pier fish
        redfish: {
            display: "Redfish",
            internal: "redfish",
            message: "a large fish, looks to have been a fighter",
            break: true,
            price: 15,
            max: 10,
            chance: 60,
            bait: [
                {
                    type: "insects",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "bobber",
                    amount: 1
                }
            ]
        },
        mackerel: {
            display: "Mackerel",
            internal: "mackerel",
            message: "a large fish, looks to have been a fighter",
            price: 20,
            max: 5,
            chance: 40,
            after: "redfish",
            bait: [
                {
                    type: "guppies",
                    amount: 1
                },
                {
                    type: "insects",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "bobber",
                    amount: 1
                }
            ]
        },
        black_drum: {
            display: "Black Drum",
            internal: "black_drum",
            message: "a large fish, looks to have been a fighter",
            price: 25,
            max: 3,
            chance: 30,
            after: "mackerel",
            bait: [
                {
                    type: "guppies",
                    amount: 1
                },
                {
                    type: "insects",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "bobber",
                    amount: 1
                }
            ]
        },
        tarpon: {
            display: "Tarpon",
            internal: "tarpon",
            message: "a large fish, looks to have been a fighter",
            price: 30,
            max: 1,
            chance: 5,
            after: "black_drum",
            bait: [
                {
                    type: "insects",
                    amount: 5
                }
            ],
            tackle: [
                {
                    type: "spoon_lure",
                    amount: 1
                }
            ]
        },
        // reef fish
        snapper: {
            display: "Snapper",
            internal: "snapper",
            message: "a large fish, looks to have been a fighter",
            break: true,
            price: 35,
            max: 10,
            chance: 60,
            bait: [
                {
                    type: "insects",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "bobber",
                    amount: 1
                }
            ]
        },
        hogfish: {
            display: "Hogfish",
            internal: "hogfish",
            message: "a large fish, looks to have been a fighter",
            price: 40,
            max: 7,
            chance: 40,
            after: "snapper",
            bait: [
                {
                    type: "mussels",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "spoon_lure",
                    amount: 1
                }
            ]
        },
        moray_eel: {
            display: "Moray Eel",
            internal: "moray_eel",
            message: "a large fish, looks to have been a fighter",
            price: 45,
            max: 5,
            chance: 30,
            after: "hogfish",
            bait: [
                {
                    type: "insects",
                    amount: 1
                },
                {
                    type: "mussels",
                    amount: 2
                }
            ]
        },
        barracuda: {
            display: "Barracuda",
            internal: "barracuda",
            message: "a large fish, looks to have been a fighter",
            price: 65,
            max: 3,
            chance: 10,
            after: "moray_eel",
            tackle: [
                {
                    type: "spoon_lure",
                    amount: 2
                }
            ]
        },
        lemon_shark: {
            display: "Lemon Shark",
            internal: "lemon_shark",
            message: "a large fish, looks to have been a fighter",
            price: 75,
            max: 1,
            chance: 5,
            after: "barracuda",
            bait: [
                {
                    type: "crustaceans",
                    amount: 3
                }
            ],
            tackle: [
                {
                    type: "spinnerbait",
                    amount: 1
                }
            ]
        },
        // spearfishing fish
        lobster: {
            display: "Lobster",
            internal: "lobster",
            message: "a large fish, looks to have been a fighter",
            break: true,
            price: 50,
            max: 10,
            chance: 60,
            bait: [
                {
                    type: "mussels",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "harpoon",
                    amount: 1
                }
            ]
        },
        grouper: {
            display: "Grouper",
            internal: "grouper",
            message: "a large fish, looks to have been a fighter",
            price: 55,
            max: 7,
            chance: 40,
            after: "lobster",
            bait: [
                {
                    type: "crustaceans",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "harpoon",
                    amount: 1
                }
            ]
        },
        tuna: {
            display: "Tuna",
            internal: "tuna",
            message: "a large fish, looks to have been a fighter",
            price: 60,
            max: 5,
            chance: 30,
            after: "grouper",
            bait: [
                {
                    type: "crustaceans",
                    amount: 1
                },
                {
                    type: "squid",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "harpoon",
                    amount: 1
                }
            ]
        },
        swordfish: {
            display: "Swordfish",
            internal: "swordfish",
            message: "a large fish, looks to have been a fighter",
            price: 75,
            max: 3,
            chance: 10,
            after: "tuna",
            bait: [
                {
                    type: "squid",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "harpoon",
                    amount: 2
                }
            ]
        },
        tiger_shark: {
            display: "Tiger Shark",
            internal: "tiger_shark",
            message: "a large fish, looks to have been a fighter",
            price: 90,
            max: 1,
            chance: 5,
            after: "swordfish",
            bait: [
                {
                    type: "squid",
                    amount: 3
                },
                {
                    type: "ground_fish",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "harpoon",
                    amount: 3
                }
            ]
        },
        // deep sea fish
        whitefish: {
            display: "Whitefish",
            internal: "whitefish",
            message: "a large fish, looks to have been a fighter",
            break: true,
            price: 65,
            max: 10,
            chance: 60,
            bait: [
                {
                    type: "insects",
                    amount: 3
                },
                {
                    type: "crustaceans",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "spoon_lure",
                    amount: 1
                }
            ]
        },
        lingcod: {
            display: "Lingcod",
            internal: "lingcod",
            message: "a large fish, looks to have been a fighter",
            price: 70,
            max: 7,
            chance: 40,
            after: "whitefish",
            bait: [
                {
                    type: "squid",
                    amount: 3
                }
            ],
            tackle: [
                {
                    type: "spinnerbait",
                    amount: 1
                }
            ]
        },
        rockfish: {
            display: "Rockfish",
            internal: "rockfish",
            message: "a large fish, looks to have been a fighter",
            price: 75,
            max: 5,
            chance: 30,
            after: "lingcod",
            bait: [
                {
                    type: "crustaceans",
                    amount: 3
                }
            ],
            tackle: [
                {
                    type: "spinnerbait",
                    amount: 1
                }
            ]
        },
        marlin: {
            display: "Marlin",
            internal: "marlin",
            message: "a large fish, looks to have been a fighter",
            price: 90,
            max: 3,
            chance: 15,
            after: "rockfish",
            bait: [
                {
                    type: "squid",
                    amount: 3
                },
                {
                    type: "ground_fish",
                    amount: 1
                }
            ],
            tackle: [
                {
                    type: "spinnerbait",
                    amount: 1
                }
            ]
        },
        mako_shark: {
            display: "Mako Shark",
            internal: "mako_shark",
            message: "a large fish, looks to have been a fighter",
            price: 115,
            max: 1,
            chance: 10,
            after: "marlin",
            bait: [
                {
                    type: "ground_fish",
                    amount: 3
                }
            ],
            tackle: [
                {
                    type: "spinnerbait",
                    amount: 1
                }
            ]
        },
        thresher_shark: {
            display: "Thresher Shark",
            internal: "thresher_shark",
            message: "a large fish, looks to have been a fighter",
            price: 150,
            max: 1,
            chance: 5,
            after: "mako_shark",
            bait: [
                {
                    type: "squid",
                    amount: 3,
                },
                {
                    type: "ground_fish",
                    amount: 2
                }
            ],
            tackle: [
                {
                    type: "spinnerbait",
                    amount: 1
                }
            ]
        },
    }
}