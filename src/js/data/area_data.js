class area_data {
    static initialize() {
        const data = area_data.get_data();

        // Fill in default information
        for (const area_index in data) {
            // Get the current area
            const area = data[area_index];
            
            area.purchased = false;

            for (const fish_index in area.fish) {
                // Get the current fish
                const fish = area.fish[fish_index];

                fish.count = 0;
                fish.caught = false;
                fish.show_max = false;
            }
        }
    }

    static get_data() {
        return area_data.area_data;
    }

    static get(area) {
        return area_data.area_data[area];
    }

    static area_data = {
        lake: {
            internal: "lake",
            display: "Lake",
            unlocks: [
                "worms"
            ],
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
                    ],
                    catalog: {
                        name: "Micropterus dolomieu",
                        length: "15-20 inches",
                        weight: "12 pounds",
                        description: [
                            "The smallmouth bass' habitat plays a large role in determining the fish's color, ranging from brown, black, green and even yellow-brown.",
                            "Female smallmouth bass tend to be smaller than their male counterparts but can lay over 21,000 eggs at a time!"
                        ]
                    }
                },
                minnows: {
                    internal: "minnows",
                    display: "Minnows",
                    message: "Little fish that make excellent bait for larger fish.",
                    price: 1,
                    max: 20,
                    max_caught: 2,
                    chance: 60,
                    after: "bass",
                    bait: [
                        {
                            type: "worms",
                            amount: 1
                        }
                    ],
                    catalog: {
                        name: "Notropis atherinoides",
                        length: "3.5-5 inches",
                        weight: "~0.0004 ounces",
                        description: [
                            "Minnows are extremely common in ponds, lakes and rivers all over. They are small and practically worthless outside of their extensive uses in bait when catching larger fish."
                        ]
                    }
                },
                sturgeon: {
                    internal: "sturgeon",
                    display: "Sturgeon",
                    message: "This one thrashed wildly before submitting to your line.",
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
                    ],
                    catalog: {
                        name: "Acipenser fulvescens",
                        length: "6.5 feet",
                        weight: "~48 pounds",
                        description: [
                            "After the discovery of turning their roe into the now luxurious garnish caviar, their population numbers plummeted due to rampant over-fishing.",
                            "Sturgeon have incredibly long lives with males living to around 55 years and females living up to 150 years."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Squalius cephalus",
                        length: "11.8-23.6 inches",
                        weight: "9.7 pounds",
                        description: [
                            "Chub are always ready to feed and as a result are typically easy pickings for anglers. As they grow older however they become more wary of noise and visual cues.",
                            "In addition to being more wary, older chub are typically solitary creatures and are often targeted as a prize fish. In contrast, smaller chub prefer to stay in shoals near the shoreline."
                        ]
                    }
                }
            }
        },
        river: {
            internal: "river",
            display: "River",
            price: 300,
            unlocks: [
                "guppies",
                "fly_tackle",
                "cages"
            ],
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
                    ],
                    catalog: {
                        name: "Salmo salar",
                        length: "28-30 inches",
                        weight: "7.9-11.9 pounds",
                        description: [
                            "Atlantic salmon have been the target of commercial and recreational fishing for a significant amount of time due to its prevalence in cooked and raw food.",
                            "While not guaranteed, it has been proven that the majority of salmon remember where they were born and go to lay their eggs in the same spot."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Oncorhynchus mykiss",
                        length: "17.8 inches",
                        weight: "1-5 pounds",
                        description: [
                            "River dwelling rainbow trout are smaller than their lake dwelling counterparts and generally blue-green or olive green with heavy black spotting over their body.",
                            "Rainbow trout tend to eat anything they can get their mouth around and are commercially farmed for culinary purposes."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Procambarus clarkii",
                        length: "2.2-4.7 inches",
                        weight: "~1.8 ounces",
                        description: [
                            "Also known as the red swamp crayfish, this particular species is considered invasive and brings with it a host of issues. They have burrowing tendencies which can damage rice fields and local ecosystems as well as levees and storm drains.",
                            "Despite their bad reputation, they are commonly eaten by being boiled with heavy seasoning and served with sides such as potatoes or corn."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Esox lucius",
                        length: "16-22 inches",
                        weight: "2-4 pounds",
                        description: [
                            "Pike are a relatively aggressive species and can turn to cannibalism when their food supply is sparse. Otherwise they tend to sit and wait for prey to pass then quickly attack with swift movements.",
                            "They are generally considered a 'sporting' fish because of their boney flesh and quantity of 'Y-bones.'"
                        ]
                    }
                }
            }
        },
        pier: {
            internal: "pier",
            display: "Pier",
            price: 500,
            unlocks: [
                "insects",
                "bobber",
                "spoon_lure"
            ],
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
                    ],
                    catalog: {
                        name: "Sciaenops ocellatus",
                        length: "28-33 inches",
                        weight: "6-8 pounds",
                        description: [
                            "Also known as the Red Drum, they have a distinguishing spot typically located on their tail that resembles an eye. Multiple spots are not uncommon but having no spots is extremely rare.",
                            "In the early 1980s they were over-fished to near extinction and have been allowed to re-populate after numerous state and federal protections were enacted."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Scomberomorus cavalla",
                        length: "19.7-35.4 inches",
                        weight: "11-30.8 pounds",
                        description: [
                            "King mackerel are voracious carnivores and will even attack humans if they perceive them as a threat, specifically when the human is flailing or thrashing.",
                            "While they are eaten commonly, due to their high mercury content it is suggested that children and pregnant women avoid them for fear of mercury poisoning."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Metacarcinus magister",
                        length: "7.9 inches",
                        weight: "3-8 pounds",
                        description: [
                            "Nearly all types of crabs are a local delicacy where they are available. Their meat also widely ranges in flavors and textures depending on the species.",
                            "Crabs generally have large claws that are used for defence and ripping apart food."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Pogonias cromis",
                        length: "8.2-19.6 inches",
                        weight: "5-30 pounds",
                        description: [
                            "They are a member of the same family as redfish and the taste of young black drum is often indistinguishable from redfish.",
                            "All members of the drum family have the ability to make a loud drumming noise between 100Hz to 500Hz when performing mating calls."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Megalops atlanticus",
                        length: "5-7 feet",
                        weight: "~200 pounds",
                        description: [
                            "Atlantic tarpon are considered one of the great saltwater game fish, partially because of their size but also because of the fight they put up when hooked.",
                            "There are many places where you can walk onto a pier and feed the tarpon that swim around below since they feed in shallow water."
                        ]
                    }
                }
            }
        },
        reef: {
            internal: "reef",
            display: "Reef",
            price: 1000,
            unlocks: [
                "mussels",
                "crustaceans",
                "spoon_lure"
            ],
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
                    ],
                    catalog: {
                        name: "Lutjanus campechanus",
                        length: "15-24 inches",
                        weight: "~10 pounds",
                        description: [
                            "Red snapper is an extremely common food fish and is caught commercially as well as recreationally. They are typically found near oyster beds and reefs including shipwrecks and off-shore oil platforms.",
                            "Studies have shown that many red snapper that are sold are not actually red snapper and are instead imported fish of the same family."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Lachnolaimus maximus",
                        length: "1-2 feet",
                        weight: "1-4 pounds",
                        description: [
                            "Hogfish are protogynous hermaphrodites meaning they change their sex throughout their life. They start off female and as they mature they turn into males after about three years.",
                            "They are also highly regarded for their taste and food value."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Echidna catenata",
                        length: "12-18 inches",
                        weight: "30 pounds",
                        description: [
                            "A chain moray is a dark brown to black eel that has blunt teeth that are used to crush their prey.",
                            "Their common hunting tactics include hiding in holes or crevices and waiting for prey to swim past, striking out quickly by expanding their jaws."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Sphyraena barracuda",
                        length: "24-39 inches",
                        weight: "5.5-19.8 pounds",
                        description: [
                            "Great barracuda's bodies are typically large and elongated. They are aggressive predators with powerful jaws and razor sharp teeth.",
                            "They are known to follow divers and swimmers but attacks are rare. Rings and other shiny objects can be mistaken for prey however, provoking the fish to attack."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Negaprion brevirostris",
                        length: "7.9-10.2 feet",
                        weight: "~200 pounds",
                        description: [
                            "The lemon shark's yellow color is perfect camouflage for the sandy coastal habitat they live in. They are of minimal risk to humans with only 10 unprovoked bites on record and are hunted for their valuable meat and fins.",
                            "They have electroreceptors concentrated in their head to detect electrical pulses by fish allowing them to hunt nocturnally."
                        ]
                    }
                }
            }
        },
        spear_fishing: {
            internal: "spear_fishing",
            display: "Spear Fishing",
            price: 1750,
            unlocks: [
                "squid",
                "harpoon"
            ],
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
                    ],
                    catalog: {
                        name: "Homarus americanus",
                        length: "8-24 inches",
                        weight: "1-9 pounds",
                        description: [
                            "American lobsters come with two claws: the 'crusher' and the 'cutter.' The crusher claw is mainly used for crushing and the cutter claw is used for holding or tearing prey apart.",
                            "Much like crawdads, american lobsters are generally boiled or steamed. Their meat is primarily located in their claws and tails and is served with butter."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Epinephelus itajara",
                        length: "~8.2 feet",
                        weight: "~400 pounds",
                        description: [
                            "Atlantic goliath grouper are fearless and as such are considered an easy target for spear fishers. They have been known to attack divers and even large lemon sharks.",
                            "A combination of their fine meat quality and their inquisitive nature led to over-fishing and restrictions had to be put in place."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Thunnus thynnus",
                        length: "6.6-8.2 feet",
                        weight: "469-551 pounds",
                        description: [
                            "Atlantic bluefin tuna have a long history of being commercially and recreationally fished. Their prized meat is used in many dishes and they are specifically targeted for their uses in sushi and sashimi.",
                            "Due to their enormous size, speed and power as apex predators they are commonly sought after by sports fisherman."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Xiphias gladius",
                        length: "9.8 feet",
                        weight: "300-700 lbs",
                        description: [
                            "Swordfish are dangerous to hunt as they tend to panic and dive when harpooned. Although the 'sword' is normally used to slash instead of stabbing, it is entirely capable of piercing through flesh, especially with the fish's incredible speed.",
                            "They are commonly found in deeper waters but you can still use spears or harpoons when they come closer to the surface. Karamja is a popular harpooning spot for swordfish."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Galeocerdo cuvier",
                        length: "10-13 feet",
                        weight: "849-1,400 pounds",
                        description: [
                            "Tiger sharks will eat just about any prey and even human made objects such as licence plates or baseballs. They are uncommonly hunted by humans for their fins.",
                            "Although the bite rate is low they are considered one of the most dangerous species of shark and are second on the record of fatal attacks."
                        ]
                    }
                }
            }
        },
        deep_sea: {
            internal: "deep_sea",
            display: "Deep Sea",
            price: 2500,
            unlocks: [
                "ground_fish",
                "spinner_lure"
            ],
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
                    ],
                    catalog: {
                        name: "Caulolatilus princeps",
                        length: "12-15 inches",
                        weight: "7 pounds",
                        description: [
                            "Also known as banquillo, ocean whitefish tend to stay near offshore islands instead of mainland coasts.",
                            "They are sought after recreationally for their fight and commercially for their meat."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Ophiodon elongatus",
                        length: "18-30 inches",
                        weight: "~70 pounds",
                        description: [
                            "Lingcod are typically found near the sea floor and prefer rocky areas. They are fished for their meat which is commonly used in fish and chips.",
                            "Like many other fish, they eat just about anything they can fit their mouth around."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Synanceia verrucosa",
                        length: "11.8-15.7 inches",
                        weight: "5 pounds",
                        description: [
                            "Stonefish are the most venomous fish in the world. Their back is lined with 13 spikes that can pierce boot soles, each of which have two venom sacs.",
                            "The venom's effects include severe pain, shock, paralysis and tissue death. The venom can leave lasting nerve damage.",
                            "Stonefish are caught and eaten in parts of Asia and can be placed in aquariums."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Makaira nigricans",
                        length: "11-14 feet",
                        weight: "210 pounds",
                        description: [
                            "Renowned as one of the world's greatest game fish, marlin are sought after recreationally and commercially. Their size, speed, fighting spirit and meat are all incentives for both types of fishing.",
                            "Females can grow to be up to four times heavier than males with the largest on record being 1,803 pounds!"
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Isurus oxyrinchus",
                        length: "10 feet",
                        weight: "132-298 pounds",
                        description: [
                            "Shortfin mako sharks are the fastest-swimming shark species on record reaching up to 46 miles per hour. Due to their incredible speed they have been recorded jumping 30 feet out of the water.",
                            "They also have one of the largest brain to body ratios for sharks lending them superior intelligence versus other species of sharks."
                        ]
                    }
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
                    ],
                    catalog: {
                        name: "Alopias vulpinus",
                        length: "16 feet",
                        weight: "510 pounds",
                        description: [
                            "The long tail of the common thresher shark is used in a whip-like fashion to deliver incapacitating blows to its prey.",
                            "Despite their size, they are not very dangerous to humans due to relatively small teeth and a timid nature."
                        ]
                    }
                }
            }
        }
    };
}