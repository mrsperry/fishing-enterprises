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
        }
    };
}