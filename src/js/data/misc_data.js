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

    static update_money(amount) {
        const money = misc_data.get("money");
        money.count += amount;
        money.difference += amount;

        // Set the money display
        $("#money-count")
            .text(utils.stringify(money.count));

        // Set the difference display
        $("#money-difference")
            .text(" (" + (money.difference >= 0 ? "+" : "-") + utils.stringify(Math.abs(money.difference)) + ")")
            // When updating, stop any animation and show the display, this creates a refresh look
            .stop()
            .show()
            .css("opacity", 1)
            .fadeOut(1200, () => {
                // Reset the difference
                money.difference = 0;
            });
    }

    static get(index) {
        return misc_data.data[index];
    }

    static get_data() {
        return misc_data.data;
    }

    static data = {
        money: {
            internal: "money",
            display: "Money",
            message: "Money often costs too much, but I doubt the fish care.",
            difference: 0
        },
        fish_meta: {
            internal: "fish_meta",
            display: "Total fish caught"
        },
        catalog: { 
            internal: "catalog",
            display: "Fishing Catalog",
            message: "A handy book that allows you to view common information on fish.",
            price: 250
        },
        boat: {
            internal: "boat",
            display: "Boat",
            message: "An older vessel that may need a few patches before setting sail.",
            price: 2000,
            fuel: {
                internal: "fuel",
                display: "Fuel",
                message: "Diesel for any length trip out on the water.",
                max: 30,
                price: 5,
                count: 0,
                total: 0
            },
            diving: {
                internal: "diving-equipment",
                display: "Diving Equipment",
                message: "An assortment of aquatic gear including oxygen tanks, a mask and a snorkel.",
                price: 1250
            },
            rods: {
                internal: "fishing-rods",
                display: "High Tension Rods",
                message: "Rods built with reinforced materials and lines, allowing you to catch the strongest of fish.",
                price: 1500
            }
        }
    };
}