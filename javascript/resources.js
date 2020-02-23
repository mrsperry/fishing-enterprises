var resources = {
    money: {
        internal: "money",
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

    workers: {
        display: "Workers",
        internal: "workers",
        message: "",
        price: 1000,
        count: 0,
        total: 0,
        max: 10,
        show_max: true
    },

    fish_meta: {
        internal: "fish_meta",
        display: "Total fish caught",
        count: 0
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
            message: "writhing around in the mud, these would make good bait",
            max_caught: 3,
            price: 1,
            max: 30
        },
        minnows: {
            display: "Minnows",
            internal: "minnows",
            message: "these would make excellent bait for larger fish",
            max_caught: 2,
            max: 20,
            price: 1,
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
            message: "small fish to catch big fish",
            price: 2,
            max: 20
        },
        insects: {
            display: "Insects",
            internal: "insects",
            message: "the nastier the critter, the tastier it is",
            price: 3,
            max: 20
        },
        mussels: {
            display: "Mussels",
            internal: "mussels",
            message: "hard shells protect their squishy and edible interior",
            price: 4,
            max: 20
        },
        crustaceans: {
            display: "Crustaceans",
            internal: "crustaceans",
            message: "all manner of shrimp and krill fill the bucket",
            price: 5,
            max: 15
        },
        squid: {
            display: "Squid",
            internal: "squid",
            message: "tentacled, translucent, smelly and yet perfect bait",
            price: 6,
            max: 15
        },
        ground_fish: {
            display: "Ground Fish",
            internal: "ground_fish",
            message: "various fish guts and meat compiled for large hunters",
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
        cages: {
            display: "Cages",
            internal: "cages",
            message: "",
            price: 4,
            max: 20
        },
        bobber: {
            display: "Bobber",
            internal: "bobber",
            message: "",
            price: 6,
            max: 15
        },
        spoon_lure: {
            display: "Spoon Lure",
            internal: "spoon_lure",
            message: "",
            price: 8,
            max: 15
        },
        harpoon: {
            display: "Harpoon",
            internal: "harpoon",
            message: "",
            price: 10,
            max: 10
        },
        spinner_lure: {
            display: "Spinner Lure",
            internal: "spinner_lure",
            message: "",
            price: 12,
            max: 5
        },
    },

    fish: {
        // lake fish
        bass: {
            display: "Bass",
            internal: "bass",
            message: "nothing special but it will sell",
            header: true,
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
            message: "jumping fish going upstream are easily caught",
            header: true,
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
            message: "calm and oily, these fish are rather uninteresting",
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
        crawdads: {
            display: "Crawdads",
            internal: "crawdads",
            message: "also known as crayfish, these small crustacean omnivores go well with corn",
            price: 15,
            max: 5,
            chance: 40,
            after: "trout",
            tackle: [
                {
                    type: "cages",
                    amount: 1
                }
            ]
        },
        pike: {
            display: "Pike",
            internal: "pike",
            message: "these night hunters are often caught in choppy water",
            price: 20,
            max: 3,
            chance: 30,
            after: "crawdads",
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
            message: "a popular catch, often used in soup",
            header: true,
            price: 25,
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
            message: "these come in large schools, and are a tasty treat to predators",
            price: 30,
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
        crabs: {
            display: "Crabs",
            internal: "crabs",
            message: "they may walk sideways but they will walk sideways into your cages",
            price: 30,
            max: 5,
            chance: 40,
            after: "mackerel",
            tackle: [
                {
                    type: "cages",
                    amount: 1
                }
            ]
        },
        black_drum: {
            display: "Black Drum",
            internal: "black_drum",
            message: "this bottomfeeder won't hesistate to fight the line",
            price: 35,
            max: 3,
            chance: 30,
            after: "crabs",
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
            message: "shiny beasts, they often jump and thrash as they are reeled in",
            price: 45,
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
            message: "even though they are common, they have been known to be aggressive",
            header: true,
            price: 45,
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
            message: "a beautiful pig fish, if one can exist",
            price: 50,
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
            message: "when a fish bites your heel and it looks like an eel...",
            price: 55,
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
            message: "long, thin, aggressive and eager to bite anything shiny",
            price: 70,
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
            message: "a sand colored shark, its meat is a delicacy to some",
            price: 80,
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
                    type: "spinner_lure",
                    amount: 1
                }
            ]
        },
        // spearfishing fish
        lobster: {
            display: "Lobster",
            internal: "lobster",
            message: "two beady eyes flanked by two large claws",
            header: true,
            price: 60,
            max: 10,
            chance: 60,
            tackle: [
                {
                    type: "cages",
                    amount: 1
                }
            ]
        },
        grouper: {
            display: "Grouper",
            internal: "grouper",
            message: "these large fish are often considered the bass of the sea",
            price: 65,
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
            message: "swift swimming fish that humans and cats seem to love",
            price: 70,
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
            message: "extremely fast and elusive with a large \"sword\" on its head",
            price: 80,
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
            message: "a nocturnal hunter that will eat almost anything, including you",
            price: 100,
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
            message: "these fish typically stay near the sea floor",
            header: true,
            price: 70,
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
            message: "voracious and ugly, they are surprisingly tasty",
            price: 75,
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
                    type: "spinner_lure",
                    amount: 1
                }
            ]
        },
        stonefish: {
            display: "Stonefish",
            internal: "stonefish",
            message: "venomous fish that are commonly mistaken for rocks or coral",
            price: 80,
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
                    type: "spinner_lure",
                    amount: 1
                }
            ]
        },
        marlin: {
            display: "Marlin",
            internal: "marlin",
            message: "it's a swordfish, if the swordfish had a better sword and a bigger body",
            price: 100,
            max: 3,
            chance: 15,
            after: "stonefish",
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
                    type: "spinner_lure",
                    amount: 1
                }
            ]
        },
        mako_shark: {
            display: "Mako Shark",
            internal: "mako_shark",
            message: "the fastest species of shark, it's known to rip prey apart",
            price: 125,
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
                    type: "spinner_lure",
                    amount: 1
                }
            ]
        },
        thresher_shark: {
            display: "Thresher Shark",
            internal: "thresher_shark",
            message: "these predators use their long tail to slap and stun their prey",
            price: 175,
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
                    type: "spinner_lure",
                    amount: 1
                }
            ]
        },
    }
}