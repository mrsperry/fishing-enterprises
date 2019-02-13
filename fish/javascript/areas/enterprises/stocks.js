var stocks = {
    initialize() {
        // initialize the list of stocks
        this.stock_list = [];
        this.invested = [];

        for (let index = 0; index < 40; index++) {
            this.create_stock(main.random(1, 3));
        }
    },

    load() {
        let parent = $("<div>")
            .attr("id", "stocks_section")
            .hide()
            .fadeIn()
            .appendTo($("#left"));

        // available stock list
        let table = $("<table>")
            .attr("id", "available_stocks")
            .appendTo(parent);
        let table_right = $("<table>")
            .attr("id", "available_stocks_right")
            .appendTo(parent);

        for (let text of ["Name", "Price", "Amount", "Change"]) {
            $("<th>")
                .addClass("stocks_table_header")
                .text(text)
                .appendTo(table);
            $("<th>")
                .addClass("stocks_table_header")
                .text(text)
                .appendTo(table_right);
        }
        let select_stock = (stock) => {
            let parent = $("#selected_stock_content")
            if ($(parent).children().length != 0) {
                if ($("#selected_stock_info_name").text().split(" ")[1] != stock.name) {
                    main.remove_elements(["selected_stock_graph", "graph_horizontal_divider", "graph_vertical_divider"]);

                    let select = true;
                    for (let element of $.merge($(".selected_stock_info_content"), $(".stock_purchase_button"))) {
                        $(element)
                            .fadeOut(400, function() {
                                $(this)
                                    .remove()
                                    .fadeIn();

                                if (select) {
                                    stocks.select_stock(stock);
                                    select = false;
                                }
                            });
                    }
                }
            } else {
                $("#no_stock_selected")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        stocks.select_stock(stock);
                    });
            }
        }
        for (let index = 0; index < 40; index++) {
            let stock = this.stock_list[index];
            let table_parent = index >= 20 ? table_right : table;

            if (stock != null) {
                let row = $("<tr>")
                    .addClass("stocks_table_row")
                    .click(function() {
                        select_stock(stock);
                    })
                    .appendTo(table_parent);
                $("<td>")
                    .addClass("stocks_table_data")
                    .text(stock.name)
                    .appendTo(row);
                $("<td>")
                    .addClass("stocks_table_data")
                    .text("$" + main.stringify(stock.price) + ".00")
                    .appendTo(row);
                $("<td>")
                    .addClass("stocks_table_data")
                    .text(stock.amount)
                    .appendTo(row);
                let above_zero = stock.points.change >= 0;
                $("<td>")
                    .addClass("stocks_table_data stock_" + (above_zero ? "positive" : "negative"))
                    .text((above_zero ? "+" : "") + stock.points.change)
                    .appendTo(row);
            } else {
                let row = $("<tr>")
                    .addClass("stocks_table_row_empty")
                    .appendTo(table_parent);
                for (let data = 0; data < 4; data++) {
                    $("<td>")
                        .addClass("stocks_table_data")
                        .appendTo(row);
                }
            }
        }

        $("<div>")
            .attr("id", "portfolio_divider")
            .appendTo(parent);

        buttons.create({
            parent: "stocks_section",
            id: "stocks_desk",
            text: "Back to your desk",
            on_click: function() {
                $("#stocks_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        desk.load();
                    });
            }
        });

        // portfolio
        let portfolio = $("<div>")
            .attr("id", "stocks_portfolio")
            .appendTo(parent);
        let balance = $("<div>")
            .addClass("centered bold")
            .text("Balance")
            .appendTo(portfolio);
        $("<div>")
            .addClass("divider")
            .appendTo(balance);
        $("<div>")
            .attr("id", "stocks_balance")
            .addClass("centered")
            .text("$" + main.stringify(resources.money.count))
            .appendTo(portfolio);
        let money_made = $("<div>")
            .attr("id", "stocks_income")
            .addClass("centered")
            .text("Estimated Income: $")
            .appendTo(portfolio);
        $("<span>")
            .text("0")
            .appendTo(money_made);
        let portfolio_header = $("<div>")
            .addClass("centered bold")
            .text("Your Portfolio")
            .appendTo(portfolio);
        $("<div>")
            .addClass("divider")
            .appendTo(portfolio_header);
        let invested_table = $("<table>")
            .attr("id", "invested_stocks_table")
            .appendTo(portfolio);
        for (let title of ["Name", "Amount", "Change", "Est. Worth"]) {
            $("<th>")
                .addClass("stocks_table_header")
                .text(title)
                .appendTo(invested_table);
        }
        for (let index = 0; index < 24; index++) {
            let stock = this.invested[index];
            
            if (stock != null) {
                let row = $("<tr>")
                    .addClass("stocks_table_row")
                    .appendTo(invested_table);
                $("<td>")
                    .addClass("invested_table_data")
                    .text(stock.name)
                    .appendTo(row);
                $("<td>")
                    .addClass("invested_table_data")
                    .text(stock.purchased)
                    .appendTo(row);
                $("<td>")
                    .addClass("invested_table_data")
                    .text(stock.points.change)
                    .appendTo(row);
                $("<td>")
                    .addClass("invested_table_data")
                    .appendTo(row);
            } else {
                let row = $("<tr>")
                    .addClass("stocks_table_row_empty")
                    .appendTo(invested_table);
                for (let data = 0; data < 4; data++) {
                    $("<td>")
                        .addClass("invested_table_data")
                        .appendTo(row);
                }
            }
        }

        // selected stock
        let selected_stock = $("<div>")
            .attr("id", "selected_stock")
            .appendTo(parent);
        let selected_stock_header = $("<div>")
            .addClass("centered bold")
            .text("Selected Stock")
            .appendTo(selected_stock);
        $("<div>")
            .addClass("divider")
            .appendTo(selected_stock_header);
        $("<div>")
            .attr("id", "no_stock_selected")
            .addClass("centered")
            .text("No stock selected!")
            .appendTo(selected_stock);
        $("<div>")
            .attr("id", "selected_stock_content")
            .hide()
            .appendTo(selected_stock);
    },

    update() {

    },

    update_desk_display() {
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
                .text("Point Change: " + (stock.points.change >= 0 ? "+" : "") + stock.points.change)
                .appendTo(parent);
        }
    },

    select_stock(stock) {
        let parent = $("#selected_stock_content")
            .fadeIn();
        
        let info = $("#selected_stock_info");
        let graph_section = $("#selected_graph_section");
        if ($(info).length == 0) {
            info = $("<div>")
                .attr("id", "selected_stock_info")
                .appendTo(parent);
            let stock_info_header = $("<div>")
                .addClass("centered bold")
                .text("Stock Information")
                .appendTo(info);
            $("<div>")
                .addClass("divider")
                .appendTo(stock_info_header);
            let stock_info_list = $("<div>")
                .attr("id", "selected_stock_info_list")
                .appendTo(info);
            $("<div>")
                .attr("id", "selected_stock_info_name")
                .addClass("selected_stock_info")
                .text("Name: ")
                .appendTo(stock_info_list);
            $("<div>")
                .attr("id", "selected_stock_info_price")
                .addClass("selected_stock_info")
                .text("Price: ")
                .appendTo(stock_info_list);
            $("<div>")
                .attr("id", "selected_stock_info_amount")
                .addClass("selected_stock_info")
                .text("Amount: ")
                .appendTo(stock_info_list);
            $("<div>")
                .attr("id", "selected_stock_info_change")
                .addClass("selected_stock_info")
                .text("Change: ")
                .appendTo(stock_info_list);

            let purchase_header = $("<div>")
                .attr("id", "stock_purchase_header")
                .addClass("centered bold")
                .text("Purchase Stock")
                .appendTo(info);
            $("<div>")
                .addClass("divider")
                .appendTo(purchase_header);
            $("<div>")
                .attr("id", "selected_stock_buttons")
                .appendTo(info);
            
            $("<div>")
                .attr("id", "stocks_divider")
                .appendTo(parent);

            graph_section = $("<div>")
                .attr("id", "selected_graph_section")
                .appendTo(parent);
            let graph_header = $("<div>")
                .addClass("centered bold")
                .text("Point Change History")
                .appendTo(graph_section);
            $("<div>")
                .addClass("divider")
                .appendTo(graph_header);
        }
        $("<span>")
            .attr("id", "selected_stock_name_content")
            .addClass("selected_stock_info_content")
            .text(stock.name)
            .hide()
            .fadeIn()
            .appendTo($("#selected_stock_info_name"));
        $("<span>")
            .addClass("selected_stock_info_content")
            .text("$" + main.stringify(stock.price) + ".00")
            .hide()
            .fadeIn()
            .appendTo($("#selected_stock_info_price"));
        $("<span>")
            .addClass("selected_stock_info_content")
            .text(stock.amount + " units")
            .hide()
            .fadeIn()
            .appendTo($("#selected_stock_info_amount"));
        $("<span>")
            .addClass("selected_stock_info_content")
            .text((stock.points.change >= 0 ? "+" : "") + stock.points.change + " points")
            .hide()
            .fadeIn()
            .appendTo($("#selected_stock_info_change"));

        buttons.create({
            parent: "selected_stock_buttons",
            id: "buy_one_stock",
            classes: ["stock_purchase_button"],
            text: "Buy 1 ($" + main.stringify(stock.price) + ")",
            breaks: 0,
            disabled: function() {
                return stock.price > resources.money.count
                    && stock.amount > 0;
            },
            on_click: function() {
                stocks.purchase_stock(stock, 1);
            }
        });
        buttons.create({
            parent: "selected_stock_buttons",
            id: "buy_ten_stock",
            classes: ["stock_purchase_button"],
            text: "Buy 10 ($" + main.stringify(stock.price * 10) + ")",
            breaks: 0,
            disabled: function() {
                return (stock.price * 10) > resources.money.count
                    && stock.amount >= 10;
            },
            on_click: function() {
                stocks.purchase_stock(stock, 10);
            }
        });
        buttons.create({
            parent: "selected_stock_buttons",
            id: "buy_max_stock",
            classes: ["stock_purchase_button"],
            text: "Buy Max ($" + main.stringify(stock.price * stock.amount) + ")",
            breaks: 0,
            disabled: function() {
                return (stock.price * stock.amount) > resources.money.count
                    && stock.amount > 0;
            },
            on_click: function() {
                stocks.purchase_stock(stock, stock.amount);
            }
        });

        let graph = $("<canvas>")
            .attr("id", "selected_stock_graph")
            .attr("width", 448)
            .attr("height", 199)
            .appendTo(graph_section);
        $("<div>")
            .attr("id", "graph_vertical_divider")
            .appendTo(graph_section);
        $("<div>")
            .attr("id", "graph_horizontal_divider")
            .appendTo(graph_section);

        let context = graph[0].getContext("2d");
        context.font = "normal 10pt Consolas";
        context.lineWidth = 1;
        context.strokeStyle = "#aaaaaa";
        context.fillStyle = lights.lights ? "#000000" : "#dddddd";

        context.beginPath();
        context.textAlign = "right";
        for (let index = 0; index < 7; index++) {
            let prefix = index == 3 ? "" : (index < 3 ? "+" : "");
            let y = 22 + (20 * index);

            context.fillText(prefix + (9 - (3 * index)), 25, 3 + y);

            context.moveTo(30, y);
            context.lineTo(graph.width() - 3, y);
        }
        context.textAlign = "left";
        for (let index = 0; index < 10; index++) {
            let x = 49 + (index * 42);
            let y = graph.height() - 25;

            context.fillText("#" + (index + 1), x - 8, y);

            context.moveTo(x, 12);
            context.lineTo(x, y - 18);
        }
        context.stroke();

        context.font = "normal 12pt Consolas";
        context.textAlign = "center";
        context.fillText("Update Number", (graph.width() + 30) / 2, graph.height() - 5);

        let get_coords = (index, point) => {
            return {
                x: 49 + (index * 42),
                y: 82 + Math.ceil((point > 0 ? 6.7 * -point : 6.6 * Math.abs(point)))
            }
        }

        let history = stock.points.history == null ? [stock.points.change] : stock.points.history;
        context.lineWidth = 2;
        context.strokeStyle = lights.lights ? "#000000" : "#dddddd";
        context.beginPath();
        for (let index = 0; index < history.length; index++) {
            let coords = get_coords(index, history[index]);

            if (index == 0) {
                context.moveTo(coords.x, coords.y);
            }

            context.lineTo(coords.x, coords.y);
        }
        context.stroke();

        for (let index = 0; index < history.length; index++) {
            let point = history[index];
            let coords = get_coords(index, point);

            context.beginPath();
            context.arc(coords.x, coords.y, 4, 0, Math.PI * 2, true);
            context.fill();
        }
    },

    purchase_stock() {

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