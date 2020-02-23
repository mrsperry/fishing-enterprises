var opportunities = {
    names: {
        male: [
            // regular names - five per row
            // A
            "Aiden", "Austin", "Alex", "Anthony", "Aaron",
            "Andrew", "Austin", "Adam", "Alan", "Amir",
            // B
            "Ben", "Brandon", "Bucky", "Blake", "Brian",
            "Bruce", "Brad", "Barry", "Brent", "Bradly",
            "Brendan", "Bryce", "Bill", "Bobby", "Brock",
            // C
            "Caden", "Chris", "Carter", "Charles", "Connor",
            "Cameron", "Colton", "Chase", "Cooper",
            // D
            "Daniel", "David", "Diego", "Dylan", "Dean",
            "Derek", "Douglas", "Dale", "Dennis", "Dustin",
            "Dexter", "Donald", "Davis",
            // E
            "Evan", "Ethan", "Eric", "Edward", "Elias",
            "Elliot", "Eugene", "Easton", "Eduardo", "Enzo",
            "Emanuel", "Edison",
            // F
            "Frank", "Fred", "Finn", "Francis", "Fernando",
            "Felix", "Francisco", "Frederick", "Fabio",
            // G
            "Gabe", "George", "Grant", "Greg", "Gavin",
            "Giovanni", "Graham", "Gale", "Gilbert", "Gustavo",
            "Glenn", "Gus", "Gareth",
            // H
            "Hunter", "Henry", "Holden", "Harry", "Harrison",
            "Hector", "Harold", "Hugh", "Harvey", "Hank",
            "Hudson", "Harley",
            // I
            "Isaac", "Ian", "Ivan", "Isaiah", "Igor",
            "Ishmael", "Ike", "Iban",
            // J
            "Josh", "Jared", "Jack", "Jason", "Juan",
            "James", "Jordan", "Jose", "Justin", "John",
            "Javier",
            // K
            "Kendrick", "Kayden", "Kevin", "Kyle", "Kenneth",
            "Keegan", "Keith", "Kirk", "Keanu", "Kobe",
            // L
            "Liam", "Lucas", "Logan", "Luke", "Leo",
            "Luis", "Landon", "Lorenzo",
            // M
            "Mike", "Michael", "Micah", "Mark", "Miles",
            "Matt", "Max", "Marcus",
            // N
            "Noah", "Nate", "Nolan", "Nick", "Noel",
            "Nolan", "Neil", "Nico", "Nigel", "Nelson",
            "Norman", "Niles",
            // O
            "Oliver", "Owen", "Oscar", "Odis", "Omar",
            "Otto", "Obadiah", "Octavius", "Olaf", "Osmond",
            // P
            "Peter", "Parker", "Patrick", "Preston", "Paul",
            "Philip", "Pedro", "Pablo", "Perry", "Pierre",
            // Q
            "Quincy", "Quinton",
            // R
            "Ryan", "Robert", "Roman", "Rowan", "Richard",
            "Ray", "Ronald", "Reese", "Russel", "Roy",
            "Ralph", "Raul",
            // S
            "Samuel", "Sebastian", "Steven", "Sevadus", "Sean",
            "Seth", "Simon", "Shane", "Santiago", "Stan",
            "Sergio",
            // T
            "Tim", "Tyler", "Tucker", "Tristan", "Thomas",
            "Travis", "Todd", "Tony", "Theo", "Tom",
            // U
            "Uri",
            // V
            "Vincent", "Victor", "Vladimir", "Virgil",
            // W
            "William", "Weston", "Wesley", "Walter", "Wayne",
            "Wade", "Warren", "Winston", "Wally", "Watson",
            "Willy", "Warner", "Wagner",
            // X
            "Xander", "Xavier", "Xenos", "Xerxes",
            // Y
            "Yuri", "Yusef", "York", "Yavin", "Yuma",
            // Z
            "Zach", "Zayden", "Zion", "Zane", "Zander",
            // not regular names
            "Bob the Builder",
            "Pewdiepie",
            "Wyatt",
            "St. Nicholas",
            "Peter Parker",
            "Ulysses"
        ],
        female: [
            // regular names
            // A
            "Ava", "Amanda", "Amber", "Abagail", "Alexis",
            "Andrea", "Ana", "Alyssa", "Amelia", "Allison",
            "Audrey", "Alice", "Amy", "Ariana", "Angela",
            // B
            "Brittany", "Bailey", "Barbara", "Beth", "Brooke",
            "Brenda", "Bianca", "Belle", "Becky", "Brianna",
            "Bridget",
            // C
            "Chloe", "Carol", "Courtney", "Charlotte", "Catherine",
            "Cynthia", "Claire", "Cassandra", "Christina", "Camille",
            "Claudia", "Crystal", "Casey", "Carmen", "Carry",
            // D
            "Danielle", "Daisy", "Diana", "Denise", "Dawn",
            "Deborah", "Dakota", "Daphne", "Dorothy", "Debbie",
            "Darlene",
            // E
            "Elizabeth", "Emily", "Emma", "Evelyn", "Ella",
            "Erin", "Erica", "Eve", "Elena", "Eleanor",
            "Ellen", "Erika", "Eliza", "Emilia",
            // F
            "Faith", "Fiona", "Felicity", "Francesca", "Florence",
            "Faye", "Felicia", "Fay", "Fran", "Fern",
            // G
            "Grace", "Gabriella", "Giselle", "Gloria", "Gina",
            "Gwen", "Guinevere", "Gertrude", "Glenda", "Guiliana",
            "Ginny",
            // H
            "Hayley", "Hope", "Heather", "Holly", "Harper",
            "Helen", "Hazel", "Halle", "Hannah", "Hillary",
            "Harriet", "Helga", "Heidi",
            // I
            "Isabella", "Iris", "Ivy", "Irene", "Ilsa",
            "Ida", "Irma", "Ivana",
            // J
            "Jessica", "Jennifer", "Jordan", "Jasmine", "Julia",
            "Joy", "Jane", "Jenna", "Jacqueline", "Jamie",
            "Jocelyn", "Janet", "Josephine", "Joan", "Judith",
            "Jade",
            // K
            "Kayla", "Kim", "Katherine", "Kelly", "Kate",
            "Katie", "Karen", "Kylie", "Kiara", "Kaylee",
            "Kendra", "Karla",
            // L
            "Lily", "Lisa", "Lynn", "Leah", "Laura",
            "Layla", "Lucy", "Linda", "Leslie", "Louise",
            "Lacy", "Lindsey", "Lilith", "Lorraine",
            // M
            "Maria", "Michelle", "Mia", "Melissa", "Mary",
            "Madison", "Megan", "Mariah", "Mercy", "Molly",
            "Madeline", "Melanie", "May", "Mallory", "Meredith",
            "Maggie", "Mandy",
            // N
            "Nicole", "Natalie", "Naomi", "Nancy", "Natasha",
            "Nova", "Nadia", "Nina",
            // O
            "Olivia", "Ophelia", "Oriana", "Oprah", "Opal",
            "Orva",
            // P
            "Penelope", "Pamela", "Pandora", "Paige", "Payton",
            "Phoebe", "Priscilla", "Piper", "Portia", "Paula",
            "Prudence", "Peggy", "Petra",
            // Q
            "Quinn", "Queen",
            // R
            "Rachel", "Rebecca", "Ruth", "Riley", "Renee",
            "Rae", "Rita", "Roxanne", "Ramona", "Ruby",
            // S
            "Sarah", "Samantha", "Sophia", "Stephanie", "Shiloh",
            "Sara", "Savannah", "Sasha", "Stella", "Sierra",
            "Sharon", "Scarlett", "Stacy",
            // T
            "Taylor", "Tiffany", "Trinity", "Teresa", "Tatiana",
            "Theresa", "Tessy", "Tammy", "Tori", "Tabitha",
            // U
            "Ursula", "Ursa",
            // V
            "Vanessa", "Victoria", "Veronica", "Valerie", "Violet", 
            "Virginia",
            // W
            "Willow", "Wendy", "Wanda",
            // X
            "Xena", "Xenia",
            // Y
            "Yasmin", "Yara",
            // Z
            "Zoe", "Zia", "Zora",
            // not regular names
            "Zelda",
            "Padme",
            "Elsa"
        ]
    },

    situations: {
        burned_house: {
            header: "Housing Crisis",
            description: "One of your workers, {name}, needs money for temporary housing after {gender-1} home burned down.",
            moral_actions: {
                give_small_money: {
                    header: "A small donation",
                    text: "Sympathize with {gender-1} situation and give {gender-2} a small sum of money.",
                    cost: 500,
                    ending: {
                        text: "{name} gives you a quick {gender-5} followed by a genuine thanks.",
                        morality: 5
                    }
                },
                give_big_money: {
                    header: "Offer considerable help",
                    text: "You look out for family, and your employees are the closest thing you've got.",
                    cost: 5000,
                    ending: {
                        text: "{name} drops to {gender-1} knees in thanks and happily takes the money.",
                        morality: 15
                    }
                },
                apologize: {
                    header: "Apologize",
                    text: "Say you're sorry, but your financials aren't secure enough to help out.",
                    ending: {
                        text: "{name} smiles sadly but informs you {gender-3}'ll reach out to family that may help."
                    }
                },
                advice: {
                    header: "Offer some advice",
                    text: "Console and comfort {gender-2} in {gender-1} time of need.",
                    condition: function() {
                        return opportunities.morality > 10;
                    },
                    ending: {
                        text: "After listening to your advice, {name} is inspired to turn {gender-1} situation around.",
                        morality: 15
                    }
                },
                promotion: {
                    header: "Promote {gender-2}",
                    text: "Quietly promote {gender-2} to a suitable position.",
                    condition: function() {
                        return opportunities.morality > 25;  
                    },
                    ending: {
                        text: "A few weeks after {gender-1} promotion, {name} brings in a considerable haul.",
                        morality: 5,
                        payout: 1000
                    }
                }
            },
            immoral_actions: {
                ignore: {
                    header: "Walk away",
                    text: "You can't be bothered by other's misfortune.",
                    ending: {
                        text: "You turn your back and walk away. {name} sighs in defeat and tries {gender-1} co-workers.",
                        morality: -5
                    }
                },
                berate: {
                    header: "Insult {gender-2}",
                    text: "Berate {gender-2} for bringing {gender-1} situation to you instead of working.",
                    condition: function() {
                        return resources.workers.total > 0;
                    },
                    ending: {
                        text: "Shocked and upset, {name} decides to leave your employment.",
                        morality: -10,
                        workers: 1
                    }
                },     
                mock: {
                    header: "Mock {gender-2}",
                    text: "Let {gender-2} know it was {gender-1} fault.",
                    condition: function() {
                        return opportunities.morality < -5 && resources.workers.total > 0;
                    },
                    ending: {
                        text: "After slinging insults and profanities at {name}, you decide {gender-3} no longer works for you.",
                        morality: -15,
                        workers: 1
                    }
                },
                exploit: {
                    header: "Exploit the situation",
                    text: "{name} said {gender-3} only needed a little money. Surely {gender-3} doesn't need all of it.",
                    condition: function() {
                        return opportunities.morality < -30 && resources.workers.total > 0;
                    },
                    ending: {
                        text: "You convince {name} the fishing market is booming and {gender-3} should invest in you. They become homeless soon after.",
                        morality: -15,
                        workers: 1,
                        payout: 2500
                    }
                }
            }
        },
        thief: {
            header: "The Book Thief",
            description: "After a routine internal audit, it comes to your attention that an accountant has been skimming money from your business.",
            moral_actions: {
                ignore: {
                    header: "Ignore it",
                    text: "{name} knows about the audit. No need to press further.",
                    ending: {
                        text: "Your prediction was correct, {name} stopped stealing from you."
                    }
                },
                talk: {
                    header: "Talk with {gender-2}",
                    text: "Everyone can be reasoned with, even those caught in the act.",
                    ending: {
                        text: "You sit down with {name} and talk the situation out. {name} says {gender-3}'s been going through a hard time but will return the money.",
                        morality: 5,
                        payout: 250
                    }
                },
                warn: {
                    header: "Verbal warning",
                    text: "The amount of money taken was insignificant to your operations.",
                    cost: 100,
                    condition: function() {
                        return opportunities.morality > 25;
                    },
                    ending: {
                        text: "The {gender-4} responsible, {name}, apologizes and takes a few days off to clear {gender-1} head."
                    }
                },
                punish: {
                    header: "Severe punishment",
                    text: "Some time off without pay and a demotion will right the wrong.",
                    cost: 250,
                    condition: function() {
                        return opportunities.morality > -25;
                    },
                    ending: {
                        text: "You force {name} to take an unpaid three week vacation and move {gender-2} back to the mail room.",
                        morality: 5
                    }
                },
                fire: {
                    header: "Fire {gender-2}",
                    text: "Thieves have no place in your business.",
                    cost: 500,
                    condition: function() {
                        return resources.workers.count > 0;
                    },
                    ending: {
                        text: "You call {name} into your office. You tell {gender-2} that you cannot allow {gender-2} to continue working with you.",
                        workers: 1
                    }
                },
                charges: {
                    header: "Call your lawyer",
                    text: "This behavior is unaceptable and you wish to make that clear.",
                    cost: 1000,
                    ending: {
                        text: "{name} can't afford {gender-1} own lawyer and breaks down when {gender-3} ends up with prison time.",
                        workers: 1
                    }
                }
            },
            immoral_actions: {
                threaten: {
                    header: "Verbally threaten",
                    text: "Make your stance on theft clear to {name}.",
                    ending: {
                        text: "You say you'll take everything: {gender-1} job, {gender-1} house, even {gender-1} dog. {name} cleans up {gender-1} act immediately.",
                        morality: -5
                    }
                },
                trick: {
                    header: "Trick {gender-2}",
                    text: "Decieve {gender-2} to get your money back, with interest.",
                    condition: function() {
                        return opportunities.morality < -10;
                    },
                    ending: {
                        text: "You tell {name} there won't be any reprecussions if the money is returned. After you get the cash, you fire him.",
                        morality: -10,
                        workers: 1,
                        payout: 500
                    }
                },
                blackmail: {
                    header: "Backmail {gender-2}",
                    text: "Only one other person knows of the skimming. Maybe you can both profit?",
                    condition: function() {
                        return opportunities.morality < -50;
                    },
                    ending: {
                        text: "The two of you approach {name} with a proposition: comply and cut you in, or find a new job.",
                        morality: -15,
                        payout: 2500
                    }
                },
                kill: {
                    header: "Take {gender-2} out",
                    text: "You know a guy that knows a guy. Maybe they can solve your issue?",
                    condition: function() {
                        return opportunities.morality < -70;
                    },
                    ending: {
                        text: "It happens after a late shift. Quick and painless, your man finds your money -- and someone else's too!",
                        morality: -20,
                        payout: 5000
                    }
                }
            }
        },
        espionage: {
            header: "Commercial Espionage",
            description: "{name} is a former manager at your biggest competitor. For the right price, {gender-3} can reveal their business plans.",
            moral_actions: {
                decline: {
                    header: "Decline the offer",
                    text: "You run a legitimate and moral establishment and want nothing to do with this {gender-4}.",
                    ending: {
                        text: "{name} is never seen by you again.",
                        morality: 5
                    }
                },
                scold: {
                    header: "Scold {gender-2}",
                    text: "What {gender-3} proposes is highly illegal, it's about time someone told {gender-2}.",
                    ending: {
                        text: "You meet up with {name} and give him a verbal beating. Seems like {name} just wanted some quick cash and didn't have much.",
                    }
                },
                report: {
                    header: "Report {gender-2} to the police",
                    text: "These kinds of people deserve justice. It could happen to any company, including yours.",
                    condition: function() {
                        return opportunities.morality > 5;
                    },
                    ending: {
                        text: "After a few days, police arrest {name} and charges are soon filed against {gender-2}.",
                        morality: 10
                    }
                },
                /*hire: {
                    header: "Hire {gender-2}",
                    text: "Past mistakes can be forgiven if the person is willing to move on.",
                    ending: {
                        text: "You take {name} under your wing and explain the value of trust and forgiveness to {gender-3}.",
                        morality: 5
                    }
                },*/
            },
            immoral_actions: {
                accept: {
                    header: "Accept the offer",
                    text: "Wheres the harm in knowing what other people are doing?",
                    cost: "500",
                    condition: function() {
                        return opportunities.morality < 0;
                    },
                    ending: {
                        text: "You talk with {name} and it seems {gender-2} information is correct. You adjust your business strategy accordingly.",
                        morality: -10,
                        payout: 1000
                    }
                },
                no_pay: {
                    header: "Accept without pay",
                    text: "You can hear what {gender-3} has to say without giving anything up.",
                    ending: {
                        text: "Turns out {name} has next to nothing. Your intuition tells you {gender-3} isn't far off though.",
                        morality: -10,
                        payout: 250
                    }
                },
                blackmail: {
                    header: "Backmail {gender-2}",
                    text: "{name} knows the police are looking for {gender-2}. It would be a shame if you helped their search.",
                    condition: function() {
                        return opportunities.morality < -25;
                    },
                    ending: {
                        text: "You tell {name} to talk or get caught. {name} spills everything and you leave to verify the information.",
                        morality: -10,
                        payout: 1000
                    }
                },
                kidnap: {
                    header: "Kidnap {gender-2}",
                    text: "This is a time sensitive matter and you can't afford to wait for answers.",
                    condition: function() {
                        return resources.workers.count > 0 && opportunities.morality < -50;
                    },
                    ending: {
                        text: "After picking {name} forcefully off the street you get the answers you were looking for.",
                        morality: -15,
                        workers: 1,
                        payout: 2000
                    }
                }
            }
        },
        video_game: {
            header: "Video Game Avenues",
            description: "A software developer, {name}, is inspired by your business's success and {gender-3} has some grand plans for an online fishing game.",
            moral_actions: {
                interest: {
                    header: "Express your interest",
                    text: "You don't know much about video games but {gender-3} seems enthusiastic.",
                    ending: {
                        text: "{name} appreciates your interest and you spend a few hours talking over various subjects.",
                    }
                },
                copyright: {
                    header: "Send a takedown notice",
                    text: "{name} has no right to be using your business and intellectual property in {gender-1} game without your permission.",
                    ending: {
                        text: "You tell your lawyer to draw up a DMCA notice and send it to {gender-2}. {name} complies and stops development."
                    }
                },
                tour: {
                    header: "Offer a tour",
                    text: "Its not often people are interested in your business. Why not give {gender-2} something to remember?",
                    ending: {
                        text: "{name} is thrilled by your offer and spends a day with your employees viewing the various on-goings of your operations.",
                        morality: 5
                    }
                },
                advice: {
                    header: "Give business insights",
                    text: "While you don't know much about video games, your marketing background is considerable.",
                    ending: {
                        text: "You talk for hours about marketing strategy and modelling. {name} listens intently and when you're done {gender-3} thanks you for the advice.",
                        morality: 5
                    }
                },
                small_fund: {
                    header: "Offer light funding",
                    text: "This {gender-4} is clearly capable financially however you'd like to show your support.",
                    cost: 500,
                    condition: function() {
                        return opportunities.morality > 0;
                    },
                    ending: {
                        text: "You publicly donate to the {gender-4}s studio. The game was a considerable success and {name} remembered your help!",
                        morality: 5,
                        payout: 750
                    }
                },
                big_fund: {
                    header: "Offer significant money",
                    text: "You truly believe in {name} and {gender-1} ideas. You want to have your name right along {gender-2}.",
                    cost: 2000,
                    condition: function() {
                        return opportunities.morality > 30;
                    },
                    ending: {
                        text: "After the game was finished it became a huge success drawing players from multiple continents. Your investment payed off quite well.",
                        morality: 10,
                        payout: 6000
                    }
                }
            },
            immoral_actions: {
                bad_advice: {
                    header: "Misguide {gender-2}",
                    text: "You don't want {gender-1} game to be a bust and reflect poorly on the company.",
                    condition: function() {
                        return opportunities.morality < 0;
                    },
                    ending: {
                        text: "You convince {name} to stop his development. Who would want to play a fishing game anyway?",
                        morality: -5
                    }
                },
                steal_idea: {
                    header: "Steal his idea",
                    text: "After all it is your business. You can outsource the code writing to get your version out first.",
                    condition: function() {
                        return opportunities.morality < -10;
                    },
                    ending: {
                        text: "Although it was cheap to produce, the outsourced workers did a terrible job. At least you made a little money.",
                        morality: -10,
                        payout: 250
                    }
                }
            }
        },
        harassment: {
            header: "Workplace Misconduct",
            description: "A trusted employee, {name}, storms into your office demanding {gender-1} co-worker be fired after {gender-3} was slapped.",
            moral_actions: {
                fire: {
                    header: "Fire {gender-1} co-worker",
                    text: "Inappropriate touching of another person in the workplace is not acceptable.",
                    condition: function() {
                        return resources.workers.count > 0;
                    },
                    ending: {
                        text: "After you fire {gender-1} co-worker, you call {name} into your office to tell {gender-2} the good news.",
                        morality: 10,
                        workers: 1
                    }
                },
                proof: {
                    header: "Ask for proof",
                    text: "You can't be firing people on a whim without any proof.",
                    ending: {
                        text: "Unfortunately no witnesses or camera feed can be found. {name} does not wish to pursue it any further when you suggest invloving the police.",
                        morality: 5
                    }
                },
                question: {
                    header: "Question her allegations",
                    text: "You've known who {gender-3} is talking about for many years. Something doesn't add up.",
                    ending: {
                        text: "You discuss the issue with {name} and the co-worker in question it appears to have been a misunderstanding between the two. After a mutual apology they go back to work.",
                    }
                }
            },
            immoral_actions: {
                ignore: {
                    header: "Ignore {gender-2}",
                    text: "You don't believe {gender-2}. Nothing like that could happen in a busy workplace.",
                    condition: function() {
                        return resources.workers.total > 0;
                    },
                    ending: {
                        text: "Appalled at your non-action, {name} decides it's time to lawyer up. Fortunately for you she quit and therefore cannot pursure charges against you.",
                        morality: -5,
                        workers: 1
                    }
                },
                refuse: {
                    header: "Refuse to help",
                    text: "It's not really your problem what happens between your co-workers. They should talk to their managers.",
                    condition: function() {
                        return resources.workers.total > 0 && opportunities.morality < 0;
                    },
                    ending: {
                        text: "{name} is disgusted that you won't help {gender-2} and leaves your employment.",
                        morality: -10,
                        workers: 1
                    }
                },
                fire_2: {
                    header: "Fire them both",
                    text: "You don't need this drama in your workplace. It's best to get rid of them both and let them work it out.",
                    condition: function() {
                        return resources.workers.total > 1;
                    },
                    ending: {
                        text: "{name} and {gender-1} co-worker are both unhappy about their severence but don't wish to cause any further disruptions.",
                        morality: -10,
                        workers: 2
                    }
                },
                pay: {
                    header: "Pay {gender-2} off",
                    text: "You and {gender-2} co-worker go way back. This needs to go away.",
                    cost: 1000,
                    ending: {
                        text: "After you give {name} the money you whip {gender-2} co-worker into shape they make it clear that this will never happen again.",
                        morality: -15
                    }
                },
            }
        }
    },

    morality: 0,

    buttons: [],

    update() {
        if (areas.current_area.internal == "business") {
            for (let button of this.buttons) {
                $("#" + button.options.id + "_button")
                    .prop("disabled", button.options.disabled == null ? false : button.options.disabled);
            }
        }
    },

    create() {
        buttons.length = 0;

        let get_random = (object) => {
            let keys = Object.keys(object);
            return keys[main.random(0, keys.length - 1)];
        }

        let result;;
        let selected;
        do {
            selected = get_random(this.situations);
            result = this.situations[selected];
        } while (this.previous == selected);
        this.previous = selected;

        let gender = main.random(0, 1) == 1;
        let names = gender ? this.names.male : this.names.female;
        let name = names[main.random(0, names.length - 1)];

        let replace = (text) => {
            text = main.replaceAll(text, "{name}", name);
            text = main.replaceAll(text, "{country}", news.minor_importers[main.random(0, news.minor_importers.length - 1)]);
            text = main.replaceAll(text, "{gender-1}", gender ? "his" : "her");
            text = main.replaceAll(text, "{gender-2}", gender ? "him" : "her");
            text = main.replaceAll(text, "{gender-3}", gender ? "he" : "she");
            text = main.replaceAll(text, "{gender-4}", gender ? "man" : "woman");
            text = main.replaceAll(text, "{gender-5}", gender ? "handshake" : "hug");
            return text;
        }
        buttons.create({
            parent: "opportunities_section",
            id: "opportunity_situation",
            classes: ["button", "horizontal_button", "situation"],
            header: {
                bold: replace(result.header),
            },
            text: replace(result.description),
            disabled: true,
            breaks: 0
        });

        $("<div>")
            .addClass("connecter")
            .text("                |\n"
                + "+---------------+---------------+\n"
                + "|                               |")
            .hide()
            .fadeIn()
            .appendTo($("#opportunities_section"));
        
        let used = [];
        let list = $.extend({}, result.moral_actions, result.immoral_actions);
        for (let index = 0; index < 2; index++) {
            let key;
            let item;
            do {
                key = get_random(list);
                item = list[key];
            } while (used.includes(key) || (item.condition != null && !item.condition()));
            used.push(key);

            let direction = "choice_" + (index % 2 == 0 ? "right" : "left");

            this.buttons.push(buttons.create({
                parent: "opportunities_section",
                id: "choice_" + index,
                classes: ["button", "horizontal_button", "choice", direction],
                header: {
                    bold: replace(item.header),
                    regular: item.cost == null ? "" : "($" + main.stringify(item.cost) + ")"
                },
                text: replace(item.text),
                breaks: 0,
                disabled: function() {
                    return item.cost == null ? false : item.cost > resources.money.count;
                },
                on_click: function() {
                    for (let element of $(".choice")) {
                        $(element)
                            .prop("disabled", true);
                    }

                    let text = "                |";
                    if (direction == "choice_left") {
                        text = "|\n" 
                            + "+---------------+\n"+ text;
                    } else if (direction == "choice_right") {
                        text = "                                |\n"
                            + "                +---------------+\n" + text;
                    }

                    $("<div>")
                        .addClass("connecter connecter_bottom")
                        .text(text)
                        .hide()
                        .fadeIn()
                        .appendTo($("#opportunities_section"));

                    let payout = item.ending.payout == null ? "" : " ($" + main.stringify(item.ending.payout) + ")";
                    let morality = item.ending.morality == null ? 0 : item.ending.morality;
                    if (morality != 0) {
                        morality = "(" + (morality >= 0 ? "+" : "") + morality + " morality)";
                    } else {
                        morality = " (No morality change)";
                    }
                    
                    buttons.create({
                        parent: "opportunities_section",
                        id: "opportunity_end",
                        classes: ["button", "horizontal_button", "situation"],
                        text: replace(item.ending.text) + payout + " " + morality,
                        disabled: true,
                        breaks: 2
                    });

                    buttons.create({
                        parent: "opportunities_section",
                        id: "continue",
                        text: "Continue",
                        breaks: 0,
                        on_click: function() {
                            $("#opportunities_section")
                                .fadeOut(400, function() {
                                    $("#opportunities_section")
                                        .empty()
                                        .fadeIn();

                                    opportunities.create();
                                });
                        }
                    });
                    
                    if (item.cost != null) {
                        shop.update_money(-item.cost);
                    }

                    if (item.ending.payout != null) {
                        shop.update_money(item.ending.payout);
                    }

                    if (item.ending.morality != null) {
                        let count = opportunities.morality + item.ending.morality;
                        if (count > 100) {
                            count = 100;
                        } else if (count < -100) {
                            count = -100;
                        }
                        opportunities.morality = count;

                        $("#morality_header")
                            .text("Morality: " + opportunities.morality);
                        $("#morality_meter")
                            .text(opportunities.get_morality_text());
                    }
                    
                    if (item.ending.workers != null) {
                        for (let index = 0; index < item.ending.workers; index++) {
                            business.remove_worker();
                        }
                    }
                }
            }));
        }
    },

    get_morality_text() {
        let result = "|";
        for (let index = -20; index <= 20; index++) {
            if (index == 0 && !(this.morality > -5 && this.morality < 5)) {
                result += "|";
                continue;
            } else {
                if (this.morality >= index * 5 && this.morality < ((index * 5) + 5)) {
                    result += "+";
                } else {
                    result += ".";
                }
            }
        }
        return result + "|";
    }
}