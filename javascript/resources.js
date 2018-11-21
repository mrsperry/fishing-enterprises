var resources = {
    money: {
        message: "money often costs too much, but I doubt the fish care",
        count: 0,
        total: 0
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
        guppies: {
            display: "Guppies",
            internal: "guppies",
            message: "these would make excellent bait for larger fish",
            max_caught: 2,
            max: 10,
            chance: 60,
            after: "bass",
            bait: [
                {
                    type: "worms",
                    amount: 1
                }
            ]
        }
    },

    tackle: {
        fly_tackle: {
            display: "Fly Tackle",
            internal: "fly_tackle",
            message: "",
            price: 2,
            max: 20
        }
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
            after: "guppies",
            bait: [
                {
                    type: "worms",
                    amount: 1
                },
                {
                    type: "guppies",
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
                    amount: 3
                },
                {
                    type: "guppies",
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
            max: 7,
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
        }
    }
}