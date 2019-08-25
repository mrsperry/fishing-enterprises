class area_data {
    static initialize() {
        const data = area_data.get_list();

        // Fill in default fish information
        for (const area_index in data) {
            // Get the current area
            const area = data[area_index];

            for (const fish_index in area.fish) {
                // Get the current fish
                const fish = area.fish[fish_index];

                fish.count = 0;
                fish.caught = false;
                fish.show_max = false;
            }
        }
    }

    static get_list() {
        return area_data.area_list;
    }

    static get(area) {
        return area_data.area_list[area];
    }

    static area_list = {
        lake: {
            internal: "lake",
            display: "Lake",
            fish: {
                bass: {
                    internal: "bass",
                    display: "Bass",
                    message: "It's nothing special but it will sell.",
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
                    internal: "sturgeon",
                    display: "Sturgeon",
                    message: "This one thrashed wildly before submitting to your line.",
                    price: 10,
                    max: 5,
                    chance: 45,
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
                    internal: "chub",
                    display: "Chub",
                    message: "A large fish, looks to have been a fighter based on its scars.",
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
                }
            }
        },
        river: {
            internal: "river",
            display: "River",
            fish: {
                salmon: {
                    internal: "salmon",
                    display: "Salmon",
                    message: "Jumping fish going upstream are easily caught.",
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
                    internal: "trout",
                    display: "Trout",
                    message: "Calm and oily, these fish are rather uninteresting.",
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
                    internal: "crawdads",
                    display: "Crawdads",
                    message: "Also known as crayfish, these small crustacean omnivores go well with corn.",
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
                    internal: "pike",
                    display: "Pike",
                    message: "These night hunters are often caught in choppy water.",
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
                }
            }
        },
        pier: {
            internal: "pier",
            display: "Pier",
            fish: {
                redfish: {
                    internal: "redfish",
                    display: "Redfish",
                    message: "A popular catch, often used in soup.",
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
                    internal: "mackerel",
                    display: "Mackerel",
                    message: "These come in large schools, and are a tasty treat to predators.",
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
                    internal: "crabs",
                    display: "Crabs",
                    message: "They may walk sideways but they will walk sideways into your cages.",
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
                    internal: "black_drum",
                    display: "Black Drum",
                    message: "This bottom-feeder won't hesitate to fight the line.",
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
                    internal: "tarpon",
                    display: "Tarpon",
                    message: "Shiny beasts, they often jump and thrash as they are reeled in.",
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
                }
            }
        },
        reef: {
            internal: "reef",
            display: "Reef",
            fish: {
                snapper: {
                    internal: "snapper",
                    display: "Snapper",
                    message: "Even though they are common, they have been known to be aggressive.",
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
                    internal: "hogfish",
                    display: "Hogfish",
                    message: "A beautiful pig fish, if one can exist.",
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
                    internal: "moray_eel",
                    display: "Moray Eel",
                    message: "When a fish bites your heel and it looks like an eel...",
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
                    internal: "barracuda",
                    display: "Barracuda",
                    message: "Long, thin, aggressive and eager to bite anything shiny.",
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
                    internal: "lemon_shark",
                    display: "Lemon Shark",
                    message: "A sand colored shark, its meat is a delicacy to some.",
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
                }
            }
        },
        spear_fishing: {
            internal: "spear_fishing",
            display: "Spear Fishing",
            fish: {
                lobster: {
                    internal: "lobster",
                    display: "Lobster",
                    message: "Two beady eyes flanked by two large claws.",
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
                    internal: "grouper",
                    display: "Grouper",
                    message: "These large fish are often considered the bass of the sea.",
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
                    internal: "tuna",
                    display: "Tuna",
                    message: "Swift swimming fish that humans and cats seem to love.",
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
                    internal: "swordfish",
                    display: "Swordfish",
                    message: "Extremely fast and elusive with a large \"sword\" on its head.",
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
                    internal: "tiger_shark",
                    display: "Tiger Shark",
                    message: "A nocturnal hunter that will eat almost anything, including you.",
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
                }
            }
        },
        deep_sea: {
            internal: "deep_sea",
            display: "Deep Sea",
            fish: {
                whitefish: {
                    display: "Whitefish",
                    internal: "whitefish",
                    message: "These fish typically stay near the sea floor.",
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
                    internal: "lingcod",
                    display: "Lingcod",
                    message: "Voracious and ugly, they are surprisingly tasty.",
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
                    internal: "stonefish",
                    display: "Stonefish",
                    message: "Venomous fish that are commonly mistaken for rocks or coral.",
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
                    internal: "marlin",
                    display: "Marlin",
                    message: "Its a swordfish, if the swordfish had a better sword and a bigger body.",
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
                    internal: "mako_shark",
                    display: "Mako Shark",
                    message: "The fastest species of shark, it's known to rip prey apart.",
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
                    internal: "thresher_shark",
                    display: "Thresher Shark",
                    message: "These predators use their long tail to slap and stun their prey.",
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
                }
            }
        }
    };
}