var stocks = {
    initialize() {
        // initialize the list of stocks
        this.stock_list = [];
    },

    update() {

    },

    update_display() {
        let parent = $("#stocks_display");

        // find three stocks with the highest point change
        let stock_list = $.merge([], this.stock_list);
        let list = [];
        while (list.length != 3) {
            // current highest index
            let highest = 0;

            // loop through the stocks
            for (let index = 0; index < stock_list.length; index++) {
                // check if this stocks point change is higher
                if (stock_list[index].points.change > stock_list[highest].points.change) {
                    // set the current index as the highest
                    highest = index;
                }
            }

            // add the highest to the display list
            list.push(stock_list[highest]);
            // remove the index from the list
            stock_list.splice(highest, 1);
        }

        // create the stock elements
        for (let stock of list) {
            let stock_header = $("<div>")
                .addClass("centered bold stock_item")
                .text(stock.name)
                .appendTo(parent);
            $("<div>")
                .addClass("divider")
                .appendTo(stock_header);
            $("<div>")
                .addClass("centered")
                .text("Amount Available: " + stock.amount)
                .appendTo(parent);
            $("<div>")
                .addClass("centered")
                .text("Price per Unit: " + stock.price)
                .appendTo(parent);
            $("<div>")
                .addClass("centered")
                .text("Point Change: " + (stock.points.change >= 0 ? "+" : "-") + stock.points.change)
                .appendTo(parent);
        }
    },

    create_stock(volatility) {
        let stock = {
            volatility: volatility,
            name: this.get_name(),
            amount: this.get_amount(volatility),
            price: this.get_price(volatility),
            points: this.get_points(volatility)
        };

        console.log(stock);
        this.stock_list.push(stock);
    },

    get_name() {
        // get a random format to replace
        let format;
        switch (main.random(1, 4)) {
            case 1:
                format = "XXX";
                break;
            case 2:
                format = "XXXX";
                break;
            case 3:
                format = "XXX-#";
                break;
            case 4:
                format = "XXX+#";
                break;
            case 5:
                format = "X-###";
                break;
            case 6:
                format = "X~###";
                break;
        }

        // loop through the format
        let name = "";
        for (let index = 0; index < format.length; index++) {
            let char = format[index];
            
            if (char == "X") {
                // replace 'X' with a random uppercase character
                name += String.fromCharCode(main.random(65, 90));
            } else if (char == "#") {
                // replace '#' with a random number
                name += main.random(0, 9);
            } else {
                // ignore other characters and add them to the name
                name += char;
            }
        }

        return name;
    },

    get_amount(volatility) {
        // generates a number (5-750) to add to the initial 30
        // higher numbers are expected at higher volatility
        return 30 + main.random(5 * volatility, (5 * (volatility * main.random(10, 50))));
    },

    get_price(volatility) {
        // generates a number (5-45) to add to the initial 5
        // lower numbers are expected at higher volatility
        return 5 + (main.random(5, 15) * (4 - volatility));
    },

    get_points(volatility) {
        let points = {
            // the latest point change
            change: main.random(1, 10),
            // where the points start
            start: 10
        };

        // find a point to end at
        // lower volatility means that point is closer to the start
        do {
            points.end = main.random(10 - (volatility * 2), 10 + (volatility * 2));
        } while (points.end == 10);

        // set the time to live
        // lower volatility has longer life
        points.time_to_live = main.random(20, 20 * (4 - volatility));

        return points;
    }
}