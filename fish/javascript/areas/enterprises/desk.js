var desk = {
    initialize() {
        // investments
        vendor.add_item(enterprises.vendor, {
            data: {
                parent: "enterprise_investments_section",
                id: "stocks_unlock",
                classes: ["enterprise_investment"],
                header: {
                    bold: "Stocks Unlock",
                    regular: ""
                },
                text: "Unlock the stocks section.",
                on_click: function() {
                    $("#stocks_section")
                        .fadeIn();
                    enterprises.desk_data.stocks = true;

                    vendor.remove_item(enterprises.vendor, "stocks_unlock", enterprises.check_empty);

                    stocks.initialize();
                    stocks.update_desk_display();
                }
            }
        });
        vendor.add_item(enterprises.vendor, {
            data: {
                parent: "enterprise_investments_section",
                id: "research_unlock",
                classes: ["enterprise_investment"],
                header: {
                    bold: "Research Unlock",
                    regular: ""
                },
                text: "Unlock the research section.",
                on_click: function() {
                    $("#research_section")
                        .fadeIn();
                    enterprises.desk_data.research = true;
                    research.theories_per_second = 1;

                    vendor.remove_item(enterprises.vendor, "research_unlock", enterprises.check_empty);
                }
            }
        });
    },

    load() {
        let parent = $("<div>")
            .attr("id", "desk_section")
            .appendTo($("#left"));
        $("<div>")
            .attr("id", "desk_art")
            .addClass("pre")
            .html("  _______________________________________________________________________________________________________________________________<br>"
                + " /  ___________________________________________________________________________________________________________________________  \\<br>"
                + "/  /                                                                                                                           \\  \\<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "| |                                                                                                                             | |<br>"
                + "\\  \\___________________________________________________________________________________________________________________________/  /<br>"
                + " \\_______________________________________________________________________________________________________________________________/")
            .appendTo(parent);

        // header
        let header_section = $("<div>")
            .attr("id", "header_section")
            .addClass("desk_section absolute")
            .hide()
            .fadeIn()
            .appendTo(parent);
        buttons.create({
            parent: "header_section",
            id: "office",
            text: "Back to your office",
            on_click: function() {
                $("#desk_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        office.load();
                    });
            }
        });
        let header = $("<div>")
            .attr("id", "balance_header")
            .addClass("desk_section centered bold absolute")
            .text("Balance")
            .appendTo(header_section);
        $("<div>")
            .addClass("divider")
            .appendTo(header);
        let money = $("<span>")
            .attr("id", "balance_counter")
            .addClass("desk_section centered absolute")
            .text("$")
            .appendTo(header_section);
        $("<span>")
            .attr("id", "money_count")
            .text("0")
            .appendTo(money);
        $("<span>")
            .attr("id", "money_difference")
            .appendTo(money);

        // designer
        let designer_section = $("<div>")
            .attr("id", "designer_section")
            .addClass("desk_section absolute")
            .hide()
            .appendTo(parent);
        if (enterprises.desk_data.designer != null) {
            $(designer_section)
                .fadeIn();
        }
        $("<div>")
            .attr("id", "designer_art")
            .addClass("pre absolute")
            .html("  ___________________________________<br>"
                + " /                                   \\<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + "|                                     |<br>"
                + " \\___________________________________/")
            .appendTo(designer_section);
        let designer_content = $("<div>")
            .attr("id", "designer_content")
            .addClass("centered absolute")
            .appendTo(designer_section);
        let designer_header = $("<div>")
            .attr("id", "designer_header")
            .addClass("bold")
            .text("Research Update Card")
            .appendTo(designer_content);
        $("<div>")
            .addClass("divider")
            .appendTo(designer_header);
        $("<div>")
            .attr("id", "designer_text")
            .html("Hey boss, we finished that 'designer' project you wanted us to work on. Come on down to the lab any time and we'll set you up designing your own fish!<br><br>"
                + "- Tim, Research Department")
            .appendTo(designer_content);
        buttons.create({
            parent: "designer_content",
            id: "designer",
            text: "Go to designer lab",
            on_click: function() {
                $("#desk_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        designer.load();
                    });
            }
        });

        // research
        let research_section = $("<div>")
            .attr("id", "research_section")
            .attr("display", "Research")
            .addClass("desk_section before absolute")
            .hide()
            .appendTo(parent);
        if (enterprises.desk_data.research != null) {
            $(research_section)
                .fadeIn();
        }
        let research_theories = $("<div>")
            .attr("id", "research_theories")
            .text("Research Theories: §")
            .appendTo(research_section);
        $("<span>")
            .attr("id", "research_theories_count")
            .text(main.stringify(resources.research_theories.count))
            .appendTo(research_theories);
        $("<span>")
            .attr("id", "research_theory_difference")
            .hide()
            .appendTo(research_theories);
        let research_header = $("<div>")
            .attr("id", "research_header")
            .addClass("centered bold absolute")
            .text("Projects")
            .appendTo(research_section);
        $("<div>")
            .addClass("divider")
            .appendTo(research_header);
        $("<div>")
            .attr("id", "research_content")
            .appendTo(research_section);
        vendor.update(enterprises.research_vendor);
        vendor.redraw_shown(enterprises.research_vendor);

        // investments
        $("<div>")
            .attr("id", "enterprise_investments_section")
            .attr("display", "Investments")
            .addClass("desk_section before absolute")
            .hide()
            .fadeIn()
            .appendTo(parent);
        vendor.update(enterprises.vendor);
        vendor.redraw_shown(enterprises.vendor);

        // payroll
        let payroll_section = $("<div>")
            .attr("id", "payroll_section")
            .attr("display", "Payroll & Workers")
            .addClass("desk_section before absolute")
            .hide()
            .fadeIn()
            .appendTo(parent);
        let payroll_content = $("<div>")
            .attr("id", "payroll_content")
            .addClass("absolute")
            .appendTo(payroll_section);
        let payroll_header = $("<div>")
            .attr("id", "payroll_header")
            .addClass("centered bold payroll_margin")
            .text("Payroll Overview")
            .appendTo(payroll_content);
        $("<div>")
            .addClass("divider")
            .appendTo(payroll_header);
        let payroll_sales = $("<div>")
            .addClass("payroll_left")
            .text("Sales: ")
            .appendTo(payroll_content);
        $("<span>")
            .text(workers.payroll.sales + "%")
            .appendTo(payroll_sales);
        let payroll_workers = $("<div>")
            .addClass("payroll_right")
            .text("Workers: ")
            .appendTo(payroll_content);
        $("<span>")
            .text(workers.payroll.workers + "%")
            .appendTo(payroll_workers);
        let payroll_transit = $("<div>")
            .addClass("payroll_left payroll_margin")
            .text("Transit: ")
            .appendTo(payroll_content);
        $("<span>")
            .text(workers.payroll.transit + "%")
            .appendTo(payroll_transit);
        let payroll_marketing = $("<div>")
            .addClass("payroll_right")
            .text("Marketing: ")
            .appendTo(payroll_content);
        $("<span>")
            .text(workers.payroll.marketing + "%")
            .appendTo(payroll_marketing);
        $("<div>")
            .addClass("divider")
            .appendTo(payroll_content);
        let payroll_efficiency = $("<div>")
            .attr("id", "payroll_efficiency")
            .text("Efficiency: ")
            .appendTo(payroll_content);
        $("<span>")
            .text(workers.payroll.efficiency + "%")
            .appendTo(payroll_efficiency);
        buttons.create({
            parent: "payroll_section",
            classes: ["absolute"],
            id: "worker_edit",
            text: "Edit Payroll & Workers",
            breaks: 0,
            on_click() {
                $("#desk_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        workers.load();
                    });
            }
        });

        // newspaper
        let newspaper_section = $("<div>")
            .attr("id", "newspaper_section")
            .addClass("desk_section absolute")
            .hide()
            .fadeIn()
            .appendTo(parent);
        $("<div>")
            .attr("id", "newspaper_art")
            .addClass("pre")
            .html("     _________________________________<br>"
                + "    /                                 \\<br>"
                + "   |                                   |<br>"
                + "   |                                   |<br>"
                + "   |                                   |<br>"
                + "   |                                   |<br>"
                + "   |                                   |<br>"
                + "   |                                   |<br>"
                + "   |                                   |<br>"
                + " __|                                   |<br>"
                + "/  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|  |                                   |<br>"
                + "|__|___________________________________|<br>"
                + "(______________________________________)")
            .appendTo(newspaper_section);
        let newspaper_content = $("<div>")
            .attr("id", "newspaper_content")
            .addClass("absolute")
            .appendTo(newspaper_section);
        let newspaper_header = $("<div>")
            .attr("id", "newspaper_header")
            .addClass("centered bold")
            .text("~~~ The Miami Bulletin ~~~")
            .appendTo(newspaper_content);
        $("<div>")
            .addClass("divider")
            .appendTo(newspaper_header);
        $("<div>")
            .attr("id", "market_share_section")
            .addClass("absolute block")
            .appendTo(newspaper_content);
        $("<div>")
            .attr("id", "insignificant_news_section")
            .addClass("absolute block")
            .appendTo(newspaper_content);
        $("<div>")
            .attr("id", "news_divider")
            .addClass("absolute")
            .appendTo(newspaper_content);
        newspaper.load();

        // stocks
        let stocks_section = $("<div>")
            .attr("id", "stocks_section")
            .attr("display", "Stocks")
            .addClass("desk_section before absolute")
            .hide()
            .appendTo(parent);
        if (enterprises.desk_data.stocks != null) {
            $(stocks_section)
                .fadeIn();
        }
        let stocks_content = $("<div>")
            .attr("id", "stocks_content")
            .addClass("absolute")
            .appendTo(stocks_section);
        let stocks_header = $("<div>")
            .addClass("centered bold")
            .text("Highest Grossing Stocks")
            .appendTo(stocks_content);
        $("<div>")
            .addClass("divider")
            .appendTo(stocks_header);
        $("<div>")
            .attr("id", "stocks_display")
            .addClass("absolute")
            .appendTo(stocks_content);
        buttons.create({
            parent: "stocks_section",
            id: "view_portfolio",
            classes: ["absolute"],
            text: "View Your Portfolio",
            breaks: 0,
            on_click() {
                $("#desk_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        stocks.load();
                    });
            }
        });
        stocks.update_desk_display();

        desk.check_empty();

        research.theory_difference = 0;

        enterprises.current_view = "desk";
    },

    check_empty() {
        let investments = $("#enterprise_investments_section");
        if (investments.children().length == 0) {
            $("<div>")
                .attr("id", "enterprise_no_investments")
                .addClass("centered")
                .text("No investments available!")
                .hide()
                .fadeIn()
                .appendTo(investments);
        }

        let research = $("#research_content");
        if (research.children().length == 0) {
            $("<div>")
                .attr("id", "no_projects")
                .addClass("centered")
                .text("No projects available!")
                .hide()
                .fadeIn()
                .appendTo(research);
        }
    }
}