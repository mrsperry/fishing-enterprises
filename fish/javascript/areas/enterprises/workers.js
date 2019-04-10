let workers = {
    initialize() {
        this.payroll = {
            remaining: 100,
            sales: 0,
            workers: 0,
            transit: 0,
            marketing: 0,
            efficiency: 0
        }
        this.efficiency = {
            sales: 20,
            workers: 40,
            transit: 10,
            marketing: 30
        }
        this.oceans = {
            north_pacific: {
                workers: 0,
                life: 5
            },
            south_pacific: {
                workers: 0,
                life: 5
            },
            north_atlantic: {
                workers: 0,
                life: 5
            },
            south_atlantic: {
                workers: 0,
                life: 5
            },
            indian: {
                workers: 0,
                life: 5
            },
        }
        this.decay_multiplier = 1.5;
        this.output = 0;
        this.buttons = [];

        enterprises.workers_interval = window.setInterval(this.update, 15000);
    },

    load() {
        enterprises.current_view = "workers";

        let parent = $("<div>")
            .attr("id", "payroll_and_workers")
            .hide()
            .fadeIn()
            .appendTo($("#left"));

        let payroll_section = $("<div>")
            .attr("id", "payroll_section")
            .appendTo(parent);
        buttons.create({
            parent: "payroll_section",
            id: "payroll_back_to_desk",
            text: "Back to your desk",
            breaks: 0,
            on_click: function() {
                $("#payroll_and_workers")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        desk.load();
                    });
            }
        });
        $("<p>")
            .addClass("centered")
            .text("You'll need to balance your payroll in order to get the most profits out of your workers.")
            .appendTo(payroll_section);
        let payroll_header = $("<div>")
            .addClass("centered bold")
            .text("Payroll")
            .appendTo(payroll_section);
        $("<div>")
            .addClass("divider")
            .appendTo(payroll_header);
        let remaining = $("<div>")
            .attr("id", "remaining_payroll")
            .addClass("centered")
            .text("Remaining: ")
            .appendTo(payroll_section);
        $("<span>")
            .attr("id", "remaining_payroll_text")
            .text(this.payroll.remaining + "%")
            .appendTo(remaining);
        $("<div>")
            .addClass("divider payroll_divider")
            .appendTo(remaining);
        let left = $("<div>")
            .attr("id", "payroll_section_left")
            .appendTo(payroll_section);
        let right = $("<div>")
            .attr("id", "payroll_section_right")
            .appendTo(payroll_section);
        let array = ["Sales", "Workers", "Transit", "Marketing"];
        for (let index = 0; index < array.length; index++) {
            let item = array[index];
            let id = item.toLowerCase();

            $("<div>")
                .attr("id", "payroll_list_" + id)
                .addClass("payroll_list")
                .text(item + ": ")
                .appendTo(left);
            
            this.buttons.push(buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_min",
                classes: ["payroll_button"],
                text: "<<",
                breaks: 0,
                on_click: function() {
                    workers.update_value(id, -10);
                },
                disabled: function() {
                    return workers.payroll[id] < 1;
                }
            }).options);
            this.buttons.push(buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_subtract",
                classes: ["payroll_button"],
                text: "<",
                breaks: 0,
                on_click: function() {
                    workers.update_value(id, -1);
                },
                disabled: function() {
                    return workers.payroll[id] < 1;
                }
            }).options);
            $("<span>")
                .attr("id", id + "_percent_text")
                .addClass("payroll_percent")
                .text(this.payroll[id] + "%")
                .appendTo(right);
            this.buttons.push(buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_add",
                classes: ["payroll_button", "payroll_button_right"],
                text: ">",
                breaks: 0,
                on_click: function() {
                    workers.update_value(id, 1);
                },
                disabled: function() {
                    return workers.payroll.remaining == 0;
                }
            }).options);
            this.buttons.push(buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_max",
                classes: ["payroll_button"],
                text: ">>",
                on_click: function() {
                    workers.update_value(id, 10);
                },
                disabled: function() {
                    return workers.payroll.remaining == 0;
                }
            }).options);
        }
        let efficiency_header = $("<div>")
            .attr("id", "efficiency_header")
            .addClass("centered bold")
            .text("Payroll Efficiency: ")
            .appendTo(payroll_section);
        $("<span>")
            .attr("id", "payroll_efficiency_text")
            .text(this.payroll.efficiency + "%")
            .appendTo(efficiency_header);
        $("<div>")
            .addClass("divider")
            .appendTo(efficiency_header);
        let income_header = $("<div>")
            .attr("id", "payroll_income")
            .addClass("centered")
            .text("Estimated Income: $")
            .appendTo(payroll_section);
        $("<span>")
            .attr("id", "payroll_income_text")
            .appendTo(income_header);
        $("<div>")
            .addClass("divider payroll_divider")
            .appendTo(income_header);
        this.update_efficiency_text();

        $("<div>")
            .addClass("divider worker_divider")
            .appendTo(parent);

        let worker_section = $("<div>")
            .attr("id", "worker_section")
            .appendTo(parent);
        $("<div>")
            .addClass("pre")
            .html("                            ____<br>"
                + "                     ____  /__  -------____     ___----_   ____-----____        ______-----_<br>"
                + " ____---_____/\\   /\\/   /  _  \\_          /    _\\       \\_/             \\______/            \\<br>"
                + "/  ___         |_/      \\_/ |   \\     ___/   _/                                          ___/<br>"
                + "\\_/   \\                 ___/    /____/       \\                                      _--_ \\<br>"
                + "      /                /                  ___/    __   __                          /    \\_\\<br>"
                + "     /                |                  /      _/  \\ |  \\                        |       <br>"
                + "    |                /                   \\_ ___/     \\_\\  |__                      \\<br>"
                + "    |_       ____   |                  ___/ \\___--_        _/                       |<br>"
                + "      \\_    /    \\_/                __/            \\___  _/                          \\<br>"
                + "        \\__ \\___                   /                   --_                           /<br>"
                + "           ---_ ----__            /                     | \\                         |<br>"
                + "               |      \\_--_       \\___---_              | |   _---__               /<br>"
                + "               /           \\_             \\              \\_\\_/      \\      _---___/<br>"
                + "               \\            /              |               \\         |    /<br>"
                + "               |           |              /               _/         |   |<br>"
                + "                \\         /              |             __/            \\_/           ___<br>"
                + "                 |      _/                \\          _/                      ____---   \\_/|<br>"
                + "                 |     /                   |       _/                       /              \\<br>"
                + "                 \\    /                     \\_____/                        |                \\<br>"
                + "                  |  |                                                      \\__--____     __/<br>"
                + "                   \\_|                                                               \\___/<br>")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "pacific_label_1")
            .text("South Pacific Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "pacific_label_2")
            .text("North Pacific Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "atlantic_label_1")
            .text("North Atlantic Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "atlantic_label_2")
            .text("South Atlantic Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "indian_label")
            .text("Indian Ocean")
            .appendTo(worker_section);

        $("<div>")
            .attr("id", "worker_background_divider")
            .addClass("divider")
            .appendTo(worker_section);

        let allocation_section = $("<div>")
            .attr("id", "allocation_section")
            .appendTo(worker_section);
        let count = $("<div>")
            .attr("id", "ocean_remaining_workers_count")
            .addClass("centered")
            .text("Available Workers: ")
            .appendTo(worker_section);
        $("<span>")
            .attr("id", "ocean_remaining_workers_count_text")
            .text(workers.stringify(resources.workers.count))
            .appendTo(count);
        $("<div>")
            .addClass("divider")
            .appendTo(count);
        let oceans = ["North Pacific", "South Pacific", "North Atlantic", "South Atlantic", "Indian"];
        for (let index = 0; index < oceans.length; index++) {
            let ocean = oceans[index];
            let id = main.replaceAll(ocean.toLowerCase(), " ", "_");

            let section = $("<div>")
                .attr("id", id + "_ocean_section")
                .addClass("ocean_section")
                .appendTo(allocation_section);
            if (index < 3) {
                $(section)
                    .css("left", 10 + (index * 250) + "px");
            } else {
                $(section)
                    .addClass("ocean_section_bottom")
                    .css("left", 135 + ((index - 3) * 250) + "px");
            }

            let element = $("<div>")
                .addClass("centered bold")
                .text(ocean + " Ocean")
                .appendTo(section);
            $("<div>")
                .addClass("divider")
                .appendTo(element);
            let content = $("<div>")
                .attr("id", id + "_ocean_content")
                .addClass("ocean_info_content")
                .appendTo(section);
            let workers_section = $("<div>")
                .attr("id", id + "_workers")
                .appendTo(content);
            $("<div>")
                .addClass("ocean_worker_count")
                .text("Workers:")
                .appendTo(workers_section);
            this.buttons.push(buttons.create({
                parent: id + "_workers",
                id: id + "_min",
                classes: ["payroll_button"],
                text: "<<",
                breaks: 0,
                on_click: function() {
                    workers.update_ocean_value(id, -1000);
                },
                disabled: function() {
                    return workers.oceans[id].workers < 1;
                }
            }).options);
            this.buttons.push(buttons.create({
                parent: id + "_workers",
                id: id + "_subtract",
                classes: ["payroll_button"],
                text: "<",
                breaks: 0,
                on_click: function() {
                    workers.update_ocean_value(id, -100);
                },
                disabled: function() {
                    return workers.oceans[id].workers < 1;
                }
            }).options);
            $("<span>")
                .attr("id", id + "_workers_count")
                .addClass("centered ocean_workers_count_text")
                .text(workers.stringify(workers.oceans[id].workers))
                .appendTo(workers_section);
            this.buttons.push(buttons.create({
                parent: id + "_workers",
                id: id + "_add",
                classes: ["payroll_button ocean_button_right"],
                text: ">",
                breaks: 0,
                on_click: function() {
                    workers.update_ocean_value(id, 100);
                },
                disabled: function() {
                    return resources.workers.count == 0;
                }
            }).options);
            this.buttons.push(buttons.create({
                parent: id + "_workers",
                id: id + "_max",
                classes: ["payroll_button ocean_button_end"],
                text: ">>",
                on_click: function() {
                    workers.update_ocean_value(id, 1000);
                },
                disabled: function() {
                    return resources.workers.count == 0;
                }
            }).options);
            let output = $("<div>")
                .text("Output: $")
                .appendTo(content);
            $("<span>")
                .attr("id", id + "_output_text")
                .text("0")
                .appendTo(output);
        }
        this.update_ocean_life();

        this.update_income();
    },

    update() {
        main.update_money(workers.output);

        for (let ocean in workers.oceans) {
            ocean = workers.oceans[ocean];

            if (ocean.workers == 0) {
                if (ocean.life < 5) {
                    if (main.random(0, 10) == 0) {
                        ocean.life++;
                    }
                }
            } else {
                if (ocean.life > 0) {
                    if (main.random(0, 10) == 0) {
                        ocean.life--;
                    }
                }
            }
        }

        if (enterprises.current_view == "workers") {
            workers.update_ocean_life();
        }
    },

    update_value(id, amount) {
        let total = workers.payroll[id] + amount;

        if (total > 100) {
            amount -= total - 100;
        } else if (total < 0) {
            amount += Math.abs(total);
        }

        total = workers.payroll.remaining - amount;
        if (total < 0) {
            amount -= Math.abs(total);
        }

        workers.payroll.remaining -= amount;
        workers.payroll[id] += amount;

        $("#remaining_payroll_text")
            .text(workers.payroll.remaining + "%");
        $("#" + id + "_percent_text")
            .text(workers.payroll[id] + "%");

        let total_score = 0;
        for (let index in workers.efficiency) {
            total_score += Math.abs(workers.payroll[index] - workers.efficiency[index]);
        }
        total_score = 100 - total_score < 0 ? 0 : 100 - total_score;
        workers.payroll.efficiency = total_score;

        $("#payroll_efficiency_text")
            .text(total_score + "%");

        workers.update_efficiency_text();
        workers.update_buttons();
        workers.update_income();
    },

    update_efficiency_text() {
        let parent = $("#payroll_section");
        for (let child of $(parent).children(".payroll_efficiency_info")) {
            child.remove();
        }

        for (let index in workers.efficiency) {
            let score = Math.abs(workers.payroll[index] - workers.efficiency[index]);

            let text = "";
            let zero = workers.payroll[index] == 0;
            switch (index) {
                case "sales":
                    if (zero) {
                        text = "We are not selling anything.";
                    } else {
                        if (score == 0) {
                            text = "We are making record sales!";
                        } else if (score < 25) {
                            text = "Our sales are doing remarkably well.";
                        } else if (score < 50) {
                            text = "We are putting out average sales.";
                        } else if (score < 75) {
                            text = "Our sales numbers are dismal. Change is needed!";
                        } else {
                            text = "Sales? What sales?";
                        }
                    }
                    break;
                case "workers":
                    if (zero) {
                        text = "Our workers won't work without pay.";
                    } else {
                        if (score == 0) {
                            text = "Our workers are ecstatic!";
                        } else if (score < 25) {
                            text = "Regional management has only minimal concerns.";
                        } else if (score < 50) {
                            text = "Multiple locations have an above-average turnover rate.";
                        } else if (score < 75) {
                            text = "Turnover is high and we are struggling to pay our management!";
                        } else {
                            text = "We may need to consider our defence for slavery lawsuits.";
                        }
                    }
                    break;
                case "transit":
                    if (zero) {
                        text = "Fish don't magically move themselves.";
                    } else {
                        if (score == 0) {
                            text = "Transit is flowing perfectly!";
                        } else if (score < 25) {
                            text = "There are only minor hitches in our transportation.";
                        } else if (score < 50) {
                            text = "Our trucks and barges are struggling to keep up with demand.";
                        } else if (score < 75) {
                            text = "Fish are spoiling in transit! We need more resources!";
                        } else {
                            text = "We should re-brand to a catch-and-release company...";
                        }
                    }
                    break;
                case "marketing":
                    if (zero) {
                        text = "No one will know about us if we don't market anything.";
                    } else {
                        if (score == 0) {
                            text = "Projections of our brand are excellent!";
                        } else if (score < 25) {
                            text = "We're known and held in a positive light. Things are looking good.";
                        } else if (score < 50) {
                            text = "Focus groups tell us we still have a lot of work to do for our brand.";
                        } else if (score < 75) {
                            text = "We could be the greatest company in the world if anyone knew us...";
                        } else {
                            text = "We're practically running a smear campaign against ourselves.";
                        }
                    }
                    break;
            }

            $("<p>")
                .addClass("payroll_efficiency_info centered")
                .text(text)
                .appendTo(parent);
        }
    },

    update_ocean_value(id, amount) {
        let count = resources.workers.count;
        if (amount > 0) {
            if (amount > count) {
                amount = count;
            }
        } else {
            count = workers.oceans[id].workers;
            if (count < Math.abs(amount)) {
                amount = -count;
            }
        }

        workers.oceans[id].workers += amount;
        workers.oceans[id].output = Math.floor((5 * workers.oceans[id].workers) * (0.5 + (workers.oceans[id].life / 10)));
        resources.workers.count += -amount;

        $("#" + id + "_workers_count")
            .text(workers.stringify(workers.oceans[id].workers));
        $("#ocean_remaining_workers_count_text")
            .text(workers.stringify(resources.workers.count));

        workers.update_buttons();
        workers.update_income();
    },

    update_ocean_life() {
        for (let element of $(".ocean_life_level")) {
            $(element)
                .remove();
        }

        for (let ocean in workers.oceans) {
            let content = $("#" + ocean + "_ocean_content");

            let life = $("<div>")
                .addClass("ocean_life_level")
                .appendTo(content);
            let level = workers.oceans[ocean].life;
            for (let bar = 0; bar < 5; bar++) {
                $("<div>")
                    .addClass("ocean_life_bar " + (bar < level ? "ocean_life_bar_filled" : ""))
                    .css("top", 110 - (bar * 10))
                    .css("left", 20 + (bar * 40))
                    .css("height", 10 + (bar * 10))
                    .appendTo(life);
            }
            let text = "Plentiful Life";
            switch (level) {
                case 0:
                    text = "Near Extinction";
                    break;
                case 1:
                    text = "Miniscule Life";
                    break;
                case 2:
                    text = "Below Average Life";
                    break;
                case 3:
                    text = "Sufficient Life";
                    break;
                case 4:
                    text = "Above Average Life";
                    break;
            }
            $("<div>")
                .addClass("centered life_level_text")
                .text(text)
                .appendTo(life);
        }
    },

    update_income() {
        let total = 0;
        for (let id in workers.oceans) {
            let output = workers.oceans[id].output;
            if (output == null) {
                output = 0;
            }
            total += output;

            $("#" + id + "_output_text")
                .text(workers.stringify(output));
        }

        total = Math.floor(total * (workers.payroll.efficiency / 100));
        workers.output = total;

        $("#payroll_income_text")
            .text(workers.stringify(total));
    },

    update_buttons() {
        for (let options of workers.buttons) {
            $("#" + options.id + "_button")
                .prop("disabled", options.disabled());
        }
    },

    stringify(number) {
        if (number < 10000) {
            return main.stringify(number);
        } else {
            return (number / 1000) + "k";
        }
    }
}