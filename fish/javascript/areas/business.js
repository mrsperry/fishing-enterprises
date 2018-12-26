var business = {
    internal: "business",
    display: "Business",
    unlock: "deep_sea",
    license: "Buy the Shop",
    purchased: {
        price: 15000
    },

    hire_worker: {
        data: {
            parent: "investments_section",
            id: "hire_worker",
            classes: ["button", "horizontal_button"],
            header: {
                bold: "Expand the workforce",
                regular: "($100)"
            },
            text: "Hire a worker to be assigned to an available area",
            on_click: function() {
                shop.update_money(-business.get_worker_cost());

                resources.workers.count += 1;
                resources.workers.total += 1;
                business.update();
            }
        }
    },

    initialize() {
        this.vendor = vendor.create(5);
        vendor.add_item(this.vendor, this.hire_worker);
    },

    update() {
        vendor.update(this.vendor);

        let workers = resources.workers.count;
        $("#workers")
            .text("Workers: " + workers);
        
        $("#fish_meta_count")
            .text(main.stringify(resources.fish_meta.count));

        for (let index of areas.fish_list) {
            let area = window[index];

            $("#" + index + "_worker_count")
                .text(area.workers.count);

            let enabled = area.workers.enabled == null ? false : area.workers.enabled;
            let min = true;
            let check = false;
            if (index != "lake") {
                if (index == "reef") {
                    min = pier.workers.count >= reef.workers.min;
                } else {
                    min = window[area.unlock].workers.count >= area.workers.min;
                }
            }
            if (index != "deep_sea") {
                let check_workers = window[area.workers.check].workers;
                check = (check_workers.count > 0
                    && check_workers.min == area.workers.count);
            }

            $("#" + index + "_worker_buttons_left")
                .children()
                    .prop("disabled", area.workers.count == 0 || !enabled || check);
            $("#" + index + "_worker_buttons_right")
                .children()
                    .prop("disabled", workers == 0 || !enabled || !min);
        }

        let worker_button = $("#hire_worker_button");
        $(worker_button)
            .prop("disabled", (business.get_worker_cost() > resources.money.count))
            .find(".button_header_extra")
                .text("($" + main.stringify(this.get_worker_cost()) + ")");
        if (resources.workers.total == 80) {
            vendor.remove_item(this.vendor, "hire_worker", this.check_empty);
        }

        for (let item of this.vendor.shown) {
            $("#" + item.data.id + "_button")
                .prop("disabled", item.data.disabled);
        }

        let element = $("#no_investments");
        if (element
            .parent()
                .children().length > 1) {
            $(element)
                .remove();
        }

        this.check_empty();
    },

    load() {
        let list = ["bait", "tackle", "misc"];
        for (let index of list) {
            $("#" + index + "_section")
                .remove();
        }

        let sections = $("#resource_buttons");
        if ($("#above_section").length == 0) {
            $("<div>")
                .attr("id", "above_section")
                .appendTo(sections);
        }

        let management = $("<div>")
            .attr("id", "management_section")
            .attr("display", "Management")
            .addClass("before")
            .addClass("section")
            .appendTo(sections);

        $("<div>")
            .attr("id", "investments_section")
            .attr("display", "Investments")
            .addClass("before")
            .addClass("section")
            .addClass("section_center")
            .addClass("section_top")
            .appendTo(sections);

        counters.create_counter(resources.fish_meta, "above_section");

        buttons.create({
            parent: "above_section",
            id: "advisor",
            text: "Financial Advisor",
            on_click: function() {
                $("#above_section")
                    .empty();

                $("#management_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
                $("#investments_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        business.load_advisor();
                    });
            }
        });

        for (let index of this.vendor.shown) {
            buttons.create(index.data);
        }

        if (resources.workers.total != 80) {
            if (!vendor.registered_item(this.vendor, "hire_worker")) {
                vendor.add_item(this.vendor, this.hire_worker);
            }
        }

        let workers = resources.workers;
        $("<div>")
            .attr("id", "workers_counter")
            .appendTo(management);
        counters.create_counter(workers, "workers_counter");
        $("<div>")
            .addClass("counter_break")
            .appendTo(management);

        for (let index of areas.fish_list) {
            let area = window[index];
            let parent = $("<div>")
                .attr("id", index + "_workers")
                .addClass("worker_area")
                .addClass("counter_header")
                .text(area.display)
                .appendTo(management);
            $("<div>")
                .addClass("counter_break")
                .appendTo(parent);
            
            $("<div>")
                .attr("id", index + "_worker_count")
                .addClass("worker_count")
                .text("0")
                .appendTo(parent);
            $("<span>")
                .attr("id", index + "_worker_buttons_left")
                .addClass("worker_buttons_left")
                .appendTo(parent);
            $("<span>")
                .attr("id", index + "_worker_buttons_right")
                .addClass("worker_buttons_right")
                .appendTo(parent);

            buttons.create({
                parent: index + "_worker_buttons_left",
                classes: ["worker_button"],
                text: "<<",
                breaks: 0,
                on_click: function() {
                    business.change_workers(index, -10);
                }
            });
            buttons.create({
                parent: index + "_worker_buttons_left",
                classes: ["worker_button"],
                text: "<",
                breaks: 0,
                on_click: function() {
                    business.change_workers(index, -1);
                }
            });
            buttons.create({
                parent: index + "_worker_buttons_right",
                classes: ["worker_button"],
                text: ">",
                breaks: 0,
                on_click: function() {
                    business.change_workers(index, 1);
                }
            });
            buttons.create({
                parent: index + "_worker_buttons_right",
                classes: ["worker_button"],
                text: ">>",
                breaks: 0,
                on_click: function() {
                    business.change_workers(index, 10);
                }
            });

            if (index != "deep_sea") {
                $("<div>")
                    .addClass("counter_break")
                    .appendTo(parent);
            }
        }

        this.update();
    },

    unload() {

    },

    purchase() {
        $("#shop_button")
            .off("click")
            .click(function() {
                areas.switch_area(business);
            });
    },

    change_workers(parent, amount) {
        let total = resources.workers.count;
        let area = window[parent];
        let workers = window[parent].workers;
        
        if (total < amount) {
            amount = total;
        } else if (amount < 0) {
            if (-workers.count > amount) {
                amount = -workers.count;
            }
            
            if (parent != "deep_sea") {
                let check = window[area.workers.check].workers;
                let min = check.min;
                if (check.count > 0) {
                    if ((workers.count + amount) < (min == null ? 0 : min)) {
                        amount += (min - (workers.count + amount));
                    }
                }
            }
        }

        area.workers.count += amount;
        resources.workers.count -= amount;

        $("#" + parent + "_worker_count")
            .text(workers.count);

        this.update();
    },

    get_worker_cost() {
        return resources.workers.total * 100;
    },
    
    check_empty() {
        let parent = $("#investments_section");
        if ($(parent)
                .children().length == 0) {
            $("<p>")
                .attr("id", "no_investments")
                .text("No investments available!")
                .addClass("no_investments")
                .appendTo(parent);
        }
    },

    load_advisor() {
        buttons.create({
            parent: "above_section",
            id: "advisor",
            text: "Management and Investments",
            on_click: function() {
                buttons.remove("advisor");

                $("#newspaper_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
                $("#stocks_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        business.load();
                    });
            }
        });

        let parent = $("#resource_buttons");
        $("<div>")
            .attr("id", "newspaper_section")
            .addClass("section")
            .text("Extra extra read all about it!")
            .appendTo(parent);
        $("<div>")
            .attr("id", "stocks_section")
            .attr("display", "Stocks")
            .addClass("section")
            .addClass("section_middle")
            .addClass("before")
            .appendTo(parent);
    }
}