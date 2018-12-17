var business = {
    internal: "business",
    display: "Business",
    unlock: "deep_sea",
    license: "Buy the Shop",
    purchased: {
        price: 15000
    },

    initialize() {

    },

    update() {
        let workers = resources.workers.count;
        $("#workers")
            .text("Workers: " + workers);

        for (let index in resources.workers.areas) {
            $("#" + index + "_worker_count")
                .text(resources.workers.areas[index].workers);
            $("#" + index + "_worker_buttons_left")
                .children()
                    .prop("disabled", resources.workers.areas[index].workers == 0)
            $("#" + index + "_worker_buttons_right")
                .children()
                    .prop("disabled", workers == 0);
        }

        let worker_button = $("#hire_worker_button");
        $(worker_button)
            .text("Hire worker ($" + main.stringify(this.get_worker_cost()) + ")")
            .prop("disabled", (business.get_worker_cost() > resources.money.count));
        if (resources.workers.total == 80) {
            buttons.remove("hire_worker", this.check_empty);
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
            .appendTo(sections);

        buttons.create({
            parent: "resource_buttons",
            id: "advisor",
            classes: ["section"],
            text: "Financial Advisor",
            on_click: function() {

            }
        });

        if (resources.workers.total != 80) {
            buttons.create({
                parent: "investments_section",
                id: "hire_worker",
                classes: ["button"],
                text: "Hire worker ($" + main.stringify(this.get_worker_cost()) + ")",
                on_click: function() {
                    shop.update_money(-business.get_worker_cost());

                    resources.workers.count += 1;
                    resources.workers.total += 1;
                    business.update();
                }
            });
        }

        let workers = resources.workers;
        counters.create_counter(workers, "management_section");
        $("<div>")
            .addClass("counter_break")
            .appendTo(management);

        for (let index in workers.areas) {
            let area = workers.areas[index];
            if (area.unlocked != null && area.unlocked) {
                let parent = $("<div>")
                    .attr("id", index + "_workers")
                    .addClass("worker_area")
                    .addClass("counter_header")
                    .text(window[index].display)
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
            
        this.load();
    },

    change_workers(parent, amount) {
        let total = resources.workers.count;
        let workers = resources.workers.areas[parent].workers;
        
        if (total < amount) {
            amount = total;
        } else if (amount < 0 && (-workers > amount)) {
            amount = -workers;
        }

        resources.workers.areas[parent].workers += amount;
        resources.workers.count -= amount;

        $("#" + parent + "_worker_count")
            .text(resources.workers.areas[parent].workers);

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
                .appendTo(parent);
        }
    }
}