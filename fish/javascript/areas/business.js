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
        
    },

    load() {

    },

    unload() {

    },

    purchase() {
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

        this.update_workers();
    },

    change_workers(parent, amount) {
        let total = resources.workers.count;
        
        if (total < amount) {
            amount = (amount - (amount % total));
        }

        resources.workers.areas[parent].workers += amount;
        resources.workers.count -= amount;

        $("#" + parent + "_worker_count")
            .text(resources.workers.areas[parent].workers);

        this.update_workers();
    },

    update_workers() {
        let workers = resources.workers.count;
        $("#workers")
            .text("Workers: " + workers);

        for (let index in resources.workers.areas) {
            $("#" + index + "_worker_buttons_left")
                .children()
                    .prop("disabled", resources.workers.areas[index].workers == 0)
            $("#" + index + "_worker_buttons_right")
                .children()
                    .prop("disabled", workers == 0);
        }
    }
}