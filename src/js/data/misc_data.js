class misc_data {
    static initialize() {
        for (const index in misc_data.data) {
            const section = misc_data.data[index];

            // Set default values
            section.count = 0;

            if (index != "fish_meta") {
                section.total = 0;
            }
        }
    }

    static get(index) {
        return misc_data.data[index];
    }

    static data = {
        money: {
            internal: "money",
            display: "Money",
            message: "Money often costs too much, but I doubt the fish care."
        },
        fish_meta: {
            internal: "fish_meta",
            display: "Total fish caught"
        }
    };
}