var enterprises = {
    initialize() {
        main.remove_elements(["resource_counters", "resource_buttons", "area_selector"]);

        this.vendor = vendor.create(3);
        this.research_vendor = vendor.create(3);

        stocks.initialize();
        for (let index = 1; index < 4; index++) {
            stocks.create_stock(index);
        }

        this.load_desk();
    },

    load_desk() {
        main.remove_elements(["office_section"]);

        let parent = $("<div>")
            .attr("id", "desk_section")
            .appendTo($(".left"));
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
        $("<div>")
            .attr("id", "office_button_section")
            .addClass("desk_section")
            .appendTo(parent);
        buttons.create({
            parent: "office_button_section",
            id: "office",
            text: "Back to your office",
            on_click: function() {
                enterprises.load_office();
            }
        });
        let header = $("<div>")
            .attr("id", "balance_header")
            .addClass("desk_section")
            .text("Balance")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(header);
        let money = $("<span>")
            .attr("id", "balance_counter")
            .addClass("desk_section")
            .text("$")
            .appendTo(parent);
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
            .addClass("desk_section")
            .hide()
            .appendTo(parent);
        $("<div>")
            .attr("id", "designer_art")
            .addClass("pre")
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
            .addClass("centered")
            .appendTo(designer_section);
        let designer_header = $("<div>")
            .attr("id", "designer_header")
            .text("Research Update Card")
            .appendTo(designer_content);
        $("<div>")
            .addClass("divider")
            .appendTo(designer_header);
        $("<div>")
            .attr("id", "designer_text")
            .html("Hey boss, we finished that 'designer' project you wanted us to work on. Come on down to the lab any time and we'll set you up designing your own fish!<br><br>"
                + "- Tim, Research Department<br><br>"
                + "<>< <>< <><")
            .appendTo(designer_content);

        // research
        let research_section = $("<div>")
            .attr("id", "research_section")
            .attr("display", "Research")
            .addClass("desk_section before")
            .hide()
            .appendTo(parent);
        let research_points = $("<div>")
            .attr("id", "research_points")
            .addClass("centered")
            .text("Research Points")
            .appendTo(research_section);
        $("<span>")
            .attr("id", "research_points_per_second")
            .text(" (0/s): ")
            .appendTo(research_points);
        $("<span>")
            .attr("id", "research_points_count")
            .text(resources.research_points.count)
            .appendTo(research_points);
        let research_header = $("<div>")
            .attr("id", "research_header")
            .addClass("centered bold")
            .text("Projects")
            .appendTo(research_section);
        $("<div>")
            .addClass("divider")
            .appendTo(research_header);
        $("<div>")
            .attr("id", "research_content")
            .appendTo(research_section);

        let progress_function = (parent) => {
            $(parent)
                .css("background-color", "transparent");

            let element = $("<div>")
                .attr("progress", 3)
                .addClass("progress")
                .css("top", $(parent).position().top + 6)
                .css("left", $(parent).position().left + 6)
                .appendTo($(parent));
            $(element)
                .animate(
                    { "width": "295px" },
                    $(element).attr("progress") * 1000,
                    "linear",
                    function() {
                        buttons.remove($(parent).attr("id").replace("_button", ""), enterprises.update_research);
                    }
                );
        }
        vendor.add_item(this.research_vendor, {
            data: {
                parent: "research_content",
                id: "designer_research",
                classes: ["enterprise_investment"],
                text: "hello test",
                on_click: function() {
                    progress_function($(this));
                }
            }
        });
        vendor.update(this.research_vendor);

        // investments
        $("<div>")
            .attr("id", "investments_section")
            .attr("display", "Investments")
            .addClass("desk_section before")
            .appendTo(parent);
        vendor.add_item(this.vendor, {
            data: {
                parent: "investments_section",
                id: "newspaper_unlock",
                classes: ["enterprise_investment"],
                header: {
                    bold: "Newspaper Promotion",
                    regular: "(Free!)"
                },
                text: "A local newspaper bulletin is running a campaign to get more readers. For you that means free papers!",
                on_click: function() {
                    $("#newspaper_section")
                        .fadeIn();
                    vendor.remove_item(enterprises.vendor, "newspaper_unlock", enterprises.check_empty);
                }
            }
        });
        vendor.add_item(this.vendor, {
            data: {
                parent: "investments_section",
                id: "designer_unlock",
                classes: ["enterprise_investment"],
                header: {
                    bold: "Designer Unlock",
                    regular: ""
                },
                text: "Unlock the designer section.",
                on_click: function() {
                    $("#designer_section")
                        .fadeIn();
                    vendor.remove_item(enterprises.vendor, "designer_unlock", enterprises.check_empty);
                }
            }
        });
        vendor.add_item(this.vendor, {
            data: {
                parent: "investments_section",
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
                    vendor.remove_item(enterprises.vendor, "stocks_unlock", enterprises.check_empty);
                }
            }
        });
        vendor.add_item(this.vendor, {
            data: {
                parent: "investments_section",
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
                    vendor.remove_item(enterprises.vendor, "research_unlock", enterprises.check_empty);
                }
            }
        });
        vendor.update(this.vendor);

        // payroll
        let payroll_section = $("<div>")
            .attr("id", "payroll_section")
            .attr("display", "Payroll & Workers")
            .addClass("desk_section before")
            .appendTo(parent);
        let payroll_content = $("<div>")
            .attr("id", "payroll_content")
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
            .text("Sales: ")
            .appendTo(payroll_content);
        $("<span>")
            .text("0%")
            .appendTo(payroll_sales);
        let payroll_workers = $("<div>")
            .text("Workers: ")
            .appendTo(payroll_content);
        $("<span>")
            .text("0%")
            .appendTo(payroll_workers);
        let payroll_marketing = $("<div>")
            .text("Marketing: ")
            .appendTo(payroll_content);
        $("<span>")
            .text("0%")
            .appendTo(payroll_marketing);
        let payroll_transportation = $("<div>")
            .addClass("payroll_margin")
            .text("Transportation: ")
            .appendTo(payroll_content);
        $("<span>")
            .text("0%")
            .appendTo(payroll_transportation);
        $("<div>")
            .addClass("divider")
            .appendTo(payroll_content);
        buttons.create({
            parent: "payroll_section",
            id: "payroll_edit",
            classes: ["payroll_button"],
            text: "Edit Payroll",
            breaks: 0
        });
        buttons.create({
            parent: "payroll_section",
            classes: ["payroll_button"],
            id: "worker_edit",
            text: "Edit Workers",
            breaks: 0
        });

        // newspaper
        let newspaper_section = $("<div>")
            .attr("id", "newspaper_section")
            .addClass("desk_section")
            .hide()
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
            .appendTo(newspaper_section);
        let newspaper_header = $("<div>")
            .attr("id", "newspaper_header")
            .text("~~~ The Miami Bulletin ~~~")
            .appendTo(newspaper_content);
        $("<div>")
            .addClass("divider")
            .appendTo(newspaper_header);
        $("<div>")
            .attr("id", "insignificant_news_section")
            .appendTo(newspaper_content);
        $("<div>")
            .attr("id", "significant_news_section")
            .appendTo(newspaper_content);
        $("<div>")
            .attr("id", "news_divider")
            .appendTo(newspaper_content);

        // stocks
        let stocks_section = $("<div>")
            .attr("id", "stocks_section")
            .attr("display", "Stocks")
            .addClass("desk_section before")
            .hide()
            .appendTo(parent);
        let stocks_content = $("<div>")
            .attr("id", "stocks_content")
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
            .appendTo(stocks_content);
        buttons.create({
            parent: "stocks_section",
            id: "view_portfolio",
            text: "View Your Portfolio",
            breaks: 0
        });
        stocks.update_display();
    },

    load_office() {
        main.remove_elements(["desk_section"]);
        let parent = $("<div>")
            .attr("id", "office_section")
            .addClass("pre")
            .html("                                            ______________________________________________________________________________________<br>"
                + "                                         __/|                                                                                     |<br>"
                + "                                      __/   |                                                                                     |<br>"
                + "                                   __/      |                                                                                     |<br>"
                + "                                __/         |                                                                                     |<br>"
                + "                             __/            |                                                                                     |<br>"
                + "                          __/               |                                                                                     |<br>"
                + "                       __/                  |                                                                                     |<br>"
                + "                    __/                     |                                                                                     |<br>"
                + "                 __/                        |                                                                                     |<br>"
                + "              __/                           |                                                                                     |<br>"
                + "           __/                              |                                                                                     |<br>"
                + "        __/                                 |                                                                                     |<br>"
                + "     __/                                    |                                                                                     |<br>"
                + "  __/                                       |                                                                                     |<br>"
                + " /                                          |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |                                                                                     |<br>"
                + "|                                           |_____________________________________________________________________________________|<br>"
                + "|                                        __/<br>"
                + "|                                     __/<br>"
                + "|                                  __/<br>"
                + "|                               __/<br>"
                + "|                            __/<br>"
                + "|                         __/<br>"
                + "|                      __/<br>"
                + "|                   __/<br>"
                + "|                __/<br>"
                + "|             __/<br>"
                + "|          __/<br>"
                + "|       __/<br>"
                + "|    __/<br>"
                + "| __/<br>"
                + "|/")
            .appendTo($(".left"));
        $("<div>")
            .attr("id", "office_desk")
            .addClass("pre")
            .html(" ___                                                      ___<br>"
                + "|   \\___                                              ___/   |<br>"
                + "|       \\___                                      ___/       |<br>"
                + "|           \\____________________________________/   ____    |<br>"
                + "|                    ___   _____   ___              |[][]|   |<br>"
                + "|                   |   | |     | |   |           _ |[][]| _ |<br>"
                + "|                   |___| |_____| |   |          ( \\|====|/ )|<br>"
                + "|             ____ ____    _____  |___|           \\________/ |<br>"
                + "|___         |    |    |  |     |  ___                    ___|<br>"
                + "|   \\___     |    |    |  |     | |   |               ___/   |<br>"
                + "|    __ \\___ |____|____|  |_____| |___|           ___/ __    |<br>"
                + "|   |  \\___ \\____________________________________/ ___/  |   |<br>"
                + "|   |      \\      __________________________      /      |   |<br>"
                + "|   |___    |    /                          \\    |    ___|   |<br>"
                + "|   |   \\___|   |                            |   |___/   |   |<br>"
                + "|   |       |   |____________________________|   |       |   |<br>"
                + "|   |       |   |                            |   |       |   |<br>"
                + "|   |       |   |                            |   |       |   |<br>"
                + "|___|       |   |                            |   |       |___|<br>"
                + "            |   |                            |   |<br>"
                + "            |___|                            |___|<br>")
            .appendTo(parent);
        $("<div>")
            .attr("id", "office_chair")
            .addClass("pre")
            .html(" ____________________<br>"
                + "(____________________)<br>"
                + "|  ________________  |<br>"
                + "| |                | |<br>"
                + "| |  ()        ()  | |<br>"
                + "| |                | |<br>"
                + "| |  ()        ()  | |<br>"
                + "|_|________________|_|")
            .click(function() {
                enterprises.load_desk();
            })
            .appendTo(parent);
        $("<div>")
            .attr("id", "office_computer")
            .addClass("pre")
            .html(" _______________<br>"
                + "|               |<br>"
                + "|               |<br>"
                + "|       @       |<br>"
                + "|               |<br>"
                + "|_______ _______|<br>"
                + "       _|_<br>"
                + "      /___\\")
            .appendTo(parent);
    },

    update_research() {
        enterprises.check_empty();
    },

    check_empty() {
        let investments = $("#investments_section");
        if (investments.children().length == 0) {
            $("<div>")
                .attr("id", "no_investments")
                .text("No investments available!")
                .appendTo(investments);
        }

        let research = $("#research_content");
        if (research.children().length == 0) {
            $("<div>")
                .attr("id", "no_projects")
                .text("No projects available!")
                .appendTo(research);
        }
    }
}