var stocks = {
    initialize() {
        this.buttons = [];

        this.stock_id = 0;
        this.stock_list = [];
        this.invested = [];
        this.expected_return = 0.45;

        for (let index = 0; index < 15; index++) {
            this.create_stock(main.random(1, 3));
        }

        enterprises.stocks_interval = window.setInterval(this.update, 15000);
    },

    load() {
        enterprises.current_view = "stocks";

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

        for (let text of ["Name", "Amount", "Price", "Change"]) {
            $("<th>")
                .addClass("stocks_table_header")
                .text(text)
                .appendTo(table);
            $("<th>")
                .addClass("stocks_table_header")
                .text(text)
                .appendTo(table_right);
        }
        for (let index = 0; index < 40; index++) {
            $(this.get_empty_row("stocks"))
                .appendTo(index < 20 ? table_right : table);
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
        for (let title of ["Name", "Amount", "Value", "Change"]) {
            $("<th>")
                .addClass("invested_table_header")
                .text(title)
                .appendTo(invested_table);
        }
        for (let index = 0; index < 24; index++) {
            $(this.get_empty_row("invested"))
                .appendTo(invested_table);
        }

        // selected stock
        let selected_stock = $("<div>")
            .attr("id", "selected_stock")
            .appendTo(parent);
        $("<div>")
            .attr("id", "selected_stock_header")
            .addClass("centered bold")
            .text("Selected Stock")
            .appendTo(selected_stock);
        $("<div>")
            .addClass("divider")
            .appendTo(selected_stock);
        $("<div>")
            .attr("id", "no_stock_selected")
            .addClass("centered")
            .text("No stock selected!")
            .appendTo(selected_stock);
        $("<div>")
            .attr("id", "selected_stock_content")
            .hide()
            .appendTo(selected_stock);

        this.update();
    },

    update() {
        let stock_removal = [];
        let invested_removal = [];

        for (let index = 0; index < stocks.stock_list.length; index++) {
            let stock = stocks.stock_list[index];

            let points = stock.points;
            if (points.actual <= points.hover) {
                points.change = main.random(1, 7);

                if (main.random(1, 3) == 1) {
                    points.change *= -1;
                }
            } else {
                points.change = -main.random(1, 10);
            }

            points.history.push(points.actual);
            if (points.history.length == 11) {
                points.history.splice(0, 1);
            }

            let total = points.actual + points.change;
            if (total > 10) {
                points.change -= total % 10;
            } else if (total < -10) {
                points.change += total % 10;
            }
            points.actual = points.change;
            
            let price = stock.price;
            price.actual = Math.round(price.initial * (1.0 + (points.actual / 10)));

            if (price.actual <= 0 || stock.amount == 0) {
                stock_removal.push(index);
            }

            if (stocks.invested.includes(stock) && stock.purchased == 0) {
                invested_removal.push(index);
            }

            stocks.update_selected_stock(stock);
        }

        for (let index of stock_removal.reverse()) {
            stocks.stock_list.splice(index, 1);
        }
        for (let index of invested_removal.reverse()) {
            stocks.invested.splice(index, 1);
        }

        let difference = 40 - stocks.stock_list.length;
        for (let add = 0; add < (difference > 3 ? main.random(1, 3) : difference); add++) {
            stocks.create_stock(main.random(1, 3));
        }

        if (enterprises.current_view == "stocks") {
            let update_table = (array, index, invested) => {
                let update_row = (element) => {
                    $(element)
                        .replaceWith(stocks.get_empty_row(invested ? "invested" : "stocks"));
                        
                    let stock = invested ? stocks.invested[index] : stocks.stock_list[index];
                    if (stock != null) {
                        stocks.create_stock_display(stock, invested);
                    }

                    update_table(array, index + 1, invested);
                }

                let parent = array[index];
                if ($(parent).hasClass((invested ? "invested" : "stocks") + "_table_row_empty")) {
                    $(parent)
                        .fadeOut(0, function() {
                            update_row($(this));
                        });
                } else {
                    $(parent)
                        .fadeOut(25, function() {
                            update_row($(this));
                        });
                }
            }
            update_table($.merge($(".stocks_table_row"), $(".stocks_table_row_empty")), 0, false);
            update_table($.merge($(".invested_table_row"), $(".invested_table_row_empty")), 0, true);
        }
    },

    update_display() {
        $("#stocks_balance")
            .text("$" + main.stringify(resources.money.count));
        
        for (let options of this.buttons) {
            $("#" + options.id + "_button")
                .prop("disabled", options.disabled);
        }
    },

    update_desk_display() {
        if (enterprises.stocks_interval == null) {
            return;
        }
        
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
                .text("Price per Unit: $" + stock.price.actual)
                .appendTo(parent);
            $("<div>")
                .addClass("centered")
                .text("Point Change: " + (stock.points.change >= 0 ? "+" : "") + stock.points.change)
                .appendTo(parent);
        }
    },

    update_stock(stock) {
        for (let prefix of ["stock_", "invested_"]) {
            let id = "#" + prefix + stock.id;

            $(id)
                .fadeOut(200, function() {
                    $(this)
                        .fadeIn(200);

                    $(id + "_amount")
                        .text(main.stringify(stock.amount));
                    $(id + "_purchased")
                        .text(main.stringify(stock.purchased));
                    $(id + "_value")
                        .text("$" + main.stringify(stock.price.actual * stock.purchased));
                });
        }

        this.update_selected_stock(stock);
    },

    update_selected_stock(stock) {
        if (this.selected_stock != null) {
            if (this.selected_stock.name == stock.name) {
                $("#buy_max_stock_button")
                    .text("Buy Max ($" + main.stringify(stock.amount * stock.price.actual) + ")");
                if (stock.purchased != null) {
                    $("#sell_max_stock_button")
                        .text("Sell All ($" + main.stringify(stock.purchased * stock.price.actual) + ")");
                }
            }
        }
    },

    create_stock_display(stock, invested) {
        let parent = invested ? $(".invested_table_row_empty")[0] : $(".stocks_table_row_empty")[0];

        $(parent)
            .attr("id", (invested ? "invested_" : "stock_") + stock.id)
            .removeClass(invested ? "invested_table_row_empty" : "stocks_table_row_empty")
            .addClass(invested ? "invested_table_row" : "stocks_table_row")
            .click(function() {
                stocks.check_selected_stock(stock);
            })
            .hover(function() {
                stocks.highlight_sibling_stocks(stock, true);
            }, function() {
                stocks.highlight_sibling_stocks(stock, false);
            })
            .hide()
            .fadeIn(400)
            .empty();
        let prefix = (invested ? "invested_" : "stock_") + stock.id + "_";
        let clazz = invested ? "stocks_table_data" : "invested_table_data";
        $("<td>")
            .attr("id", prefix + "name")
            .addClass(clazz)
            .text(stock.name)
            .appendTo(parent);
        $("<td>")
            .attr("id", prefix + (invested ? "purchased" : "amount"))
            .addClass(clazz)
            .text(main.stringify(invested ? stock.purchased : stock.amount))
            .appendTo(parent);
        $("<td>")
            .attr("id", prefix + (invested ? "value" : "price"))
            .addClass(clazz)
            .text("$" + (invested ? main.stringify(stock.price.actual * stock.purchased) : (main.stringify(stock.price.actual) + ".00")))
            .appendTo(parent);
        let above_zero = stock.points.change > 0;
        $("<td>")
            .attr("id", prefix + "change")
            .addClass(clazz + " stock_" + (above_zero ? "positive" : "negative"))
            .text((above_zero ? "+" : "") + stock.points.change)
            .appendTo(parent);
    },

    check_selected_stock(stock) {
        let parent = $("#selected_stock_content");
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
    },

    select_stock(stock) {
        this.selected_stock = stock;

        $("#selected_stock_header")
            .text("Selected Stock: " + stock.name);
            
        let parent = $("#selected_stock_content")
            .fadeIn();
        
        let buttons_section = $("#selected_stock_buttons_section");
        if ($(buttons_section).length == 0) {
            buttons_section = $("<div>")
                .attr("id", "selected_stock_buttons_section")
                .appendTo(parent);
            let buy_header = $("<div>")
                .attr("id", "stock_buy_header")
                .addClass("centered bold")
                .text("Buy Stock")
                .appendTo(buttons_section);
            $("<div>")
                .addClass("divider")
                .appendTo(buy_header);
            $("<div>")
                .attr("id", "buy_selected_stock_buttons")
                .appendTo(buttons_section);
            let sell_header = $("<div>")
                .attr("id", "stock_sell_header")
                .addClass("centered bold")
                .text("Sell Stock")
                .appendTo(buttons_section);
            $("<div>")
                .addClass("divider")
                .appendTo(sell_header);
            $("<div>")
                .attr("id", "sell_selected_stock_buttons")
                .appendTo(buttons_section);
            
            $("<div>")
                .attr("id", "stocks_divider")
                .appendTo(parent);

            let graph_section = $("<div>")
                .attr("id", "selected_graph_section")
                .appendTo(parent);
            let graph_header = $("<div>")
                .addClass("centered bold")
                .text("Recent Change History")
                .appendTo(graph_section);
            $("<div>")
                .addClass("divider")
                .appendTo(graph_header);
        }

        stocks.buttons = [
            buttons.create({
                parent: "buy_selected_stock_buttons",
                id: "buy_one_stock",
                classes: ["stock_purchase_button"],
                text: "Buy 1 ($" + main.stringify(stock.price.actual) + ")",
                breaks: 0,
                disabled: function() {
                    return stock.price.actual > resources.money.count
                        || stock.amount == 0;
                },
                on_click: function() {
                    stocks.buy_stock(stock, 1);
                }
            }).options,
            buttons.create({
                parent: "buy_selected_stock_buttons",
                id: "buy_ten_stock",
                classes: ["stock_purchase_button"],
                text: "Buy 10 ($" + main.stringify(stock.price.actual * 10) + ")",
                breaks: 0,
                disabled: function() {
                    return (stock.price.actual * 10) > resources.money.count
                        || stock.amount < 10;
                },
                on_click: function() {
                    stocks.buy_stock(stock, 10);
                }
            }).options,
            buttons.create({
                parent: "buy_selected_stock_buttons",
                id: "buy_max_stock",
                classes: ["stock_purchase_button"],
                text: "Buy Max ($" + main.stringify(stock.price.actual * stock.amount) + ")",
                breaks: 0,
                disabled: function() {
                    return (stock.price.actual * stock.amount) > resources.money.count
                        || stock.amount == 0;
                },
                on_click: function() {
                    stocks.buy_stock(stock, stock.amount);
                }
            }).options,
            buttons.create({
                parent: "sell_selected_stock_buttons",
                id: "sell_one_stock",
                classes: ["stock_purchase_button"],
                text: "Sell 1 ($" + main.stringify(stock.price.actual) + ")",
                breaks: 0,
                disabled: function() {
                    return stock.purchased == null || stock.purchased == 0;
                },
                on_click: function() {
                    stocks.sell_stock(stock, 1);
                }
            }).options,
            buttons.create({
                parent: "sell_selected_stock_buttons",
                id: "sell_ten_stock",
                classes: ["stock_purchase_button"],
                text: "Sell 10 ($" + main.stringify(stock.price.actual * 10) + ")",
                breaks: 0,
                disabled: function() {
                    return stock.purchased == null || stock.purchased < 10;
                },
                on_click: function() {
                    stocks.sell_stock(stock, 10);
                }
            }).options,
            buttons.create({
                parent: "sell_selected_stock_buttons",
                id: "sell_max_stock",
                classes: ["stock_purchase_button"],
                text: "Sell All ($" + main.stringify(stock.price.actual * (stock.purchased == null ? 0 : stock.purchased)) + ")",
                breaks: 0,
                disabled: function() {
                    return stock.purchased == null || stock.purchased == 0;
                },
                on_click: function() {
                    stocks.sell_stock(stock, stock.purchased);
                }
            }).options
        ];

        this.selected_stock = stock;
        this.create_selected_graph();
    },

    create_selected_graph() {
        let stock = this.selected_stock;
        if (stock == null) {
            return;
        }

        let graph_section = $("#selected_graph_section")
            .empty();

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

        let history = stock.points.history.length == 0 ? [stock.points.change] : stock.points.history;
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

    buy_stock(stock, amount) {
        if (stock.purchased == null) {
            stock.purchased = 0;
        }
        stock.purchased += amount;
        stock.amount -= amount;

        if (!this.invested.includes(stock)) {
            this.invested.push(stock);
        }

        if ($("#invested_" + stock.id).length == 0) {
            this.create_stock_display(stock, true);
        } else {
            this.update_stock(stock);
        }

        main.update_money(-stock.price.actual * amount);
    },

    sell_stock(stock, amount) {
        stock.purchased -= amount;
        stock.amount += amount;

        this.update_stock(stock);

        main.update_money(stock.price.actual * amount);
    },

    highlight_sibling_stocks(stock, highlight) {
        for (let prefix of ["stock_", "invested_"]) {
            let element = $("#" + prefix + stock.id);

            if (highlight) {
                $(element)
                    .addClass("sibling_highlight");
            } else {
                $(element)
                    .removeClass("sibling_highlight");
            }
        }
    },

    get_empty_row(clazz) {
        let row = $("<tr>")
            .addClass(clazz + "_table_row_empty")
        for (let data = 0; data < 4; data++) {
            $("<td>")
                .addClass(clazz + "_table_data")
                .appendTo(row);
        }

        return row;
    },

    create_stock(volatility) {
        let stock = {
            id: ++this.stock_id,
            volatility: volatility,
            name: this.get_name(),
            amount: this.get_amount(volatility),
            price: this.get_price(volatility),
            points: this.get_points(volatility)
        };

        this.stock_list.push(stock);

        if (this.stock_id == 1000) {
            this.stock_id = 0;
        }
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
        let initial = 15 + (main.random(5, 15) * (4 - volatility));

        return {
            initial: initial,
            actual: initial
        };
    },

    get_points(volatility) {
        return {
            // the latest point change
            change: main.random(-10, 10),
            // the actual point value
            actual: main.random(-10, 10),
            // the point at which to hover around
            // lower volatility means less variation
            hover: main.random(-8 + (volatility * 2), 8 + (volatility * 2)),
            // the point change history
            history: []
        };
    }
}