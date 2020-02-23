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
                let cost = business.get_worker_cost();
                shop.update_money(-cost);

                resources.workers.count += 1;
                resources.workers.total += 1;
                cost += 100;
                
                $(this)
                    .prop("disabled", resources.workers.total == resources.workers.max || resources.money.count < cost)
                    .find(".button_header_extra")
                        .text("($" + main.stringify(cost) + ")");
            
                business.update_workers();
                vendor.update(business.vendor);
            },
            disabled: function() {
                return resources.workers.total == resources.workers.max || resources.money.count < business.get_worker_cost();
            },
            removed: function() {
                return resources.workers.total == 80;
            }
        }
    },

    initialize() {
        this.vendor = vendor.create(5);
        vendor.add_item(this.vendor, this.hire_worker);
        vendor.add_item(this.vendor, {
            condition: function() {
                return !vendor.registered_item(business.vendor, "lake_worker_unlock");
            },
            data: {
                parent: "investments_section",
                id: "worker_upgrade_1",
                classes: ["button", "horizontal_button"],
                header: {
                    bold: "Buy Adjoining Lot",
                    regular: "($3,000)"
                },
                text: "Your current building is getting cramped and there is a great empty lot next to you for sale",
                on_click: function() {
                    shop.update_money(-3000);

                    resources.workers.max += 10;
                
                    business.update_workers();
                    business.update_max();
                    vendor.remove_item(business.vendor, "worker_upgrade_1", business.check_empty);
                },
                disabled: function() {
                    return resources.money.count < 3000;
                }
            }
        });
        vendor.add_item(this.vendor, {
            condition: function() {
                return !vendor.registered_item(business.vendor, "pier_worker_unlock");
            },
            data: {
                parent: "investments_section",
                id: "worker_upgrade_2",
                classes: ["button", "horizontal_button"],
                header: {
                    bold: "Purchase Office Space",
                    regular: "($9,000)"
                },
                text: "You'll need more space for departments if you want to grow your business",
                on_click: function() {
                    shop.update_money(-9000);

                    resources.workers.max += 20;
 
                    business.update_workers();
                    business.update_max();
                    vendor.remove_item(business.vendor, "worker_upgrade_2", business.check_empty);
                },
                disabled: function() {
                    return resources.money.count < 9000;
                }
            }
        });
        vendor.add_item(this.vendor, {
            condition: function() {
                return resources.workers.max == 40;
            },
            data: {
                parent: "investments_section",
                id: "worker_upgrade_3",
                classes: ["button", "horizontal_button"],
                header: {
                    bold: "Open a New Location",
                    regular: "($15,000)"
                },
                text: "The other side of town is rapidly developing and no fishing shops -- best to take advantage quickly",
                on_click: function() {
                    shop.update_money(-15000);

                    resources.workers.max += 40;
                
                    business.update_workers();
                    business.update_max();
                    vendor.remove_item(business.vendor, "worker_upgrade_3", business.check_empty);
                },
                disabled: function() {
                    return resources.money.count < 15000;
                }
            }
        });
        vendor.add_item(this.vendor, {
            condition: function() {
                return !vendor.registered_item(business.vendor, "lake_worker_unlock");
            },
            data: {
                parent: "investments_section",
                id: "opportunities_unlock",
                classes: ["button", "horizontal_button"],
                header: {
                    bold: "Unlock Opportunities",
                    regular: "($4,000)"
                },
                text: "Hire additional upper management so you have time to focus on exterior issues.",
                on_click: function() {
                    shop.update_money(-4000);

                    business.opportunities = true;
                    business.create_opportunities_button();
                    
                    vendor.remove_item(business.vendor, "opportunities_unlock", business.check_empty);
                },
                disabled: function() {
                    return resources.money.count < 4000;
                }
            }
        });
        vendor.add_item(this.vendor, {
            condition: function() {
                return business.vendor.shown.length == 0;
            },
            data: {
                parent: "investments_section",
                id: "enterprises_unlock",
                classes: ["button", "horizontal_button"],
                header: {
                    bold: "The Next Level",
                    regular: "($50,000)"
                },
                text: "It's time to take your business to the next level: create your dream enterprise",
                on_click: function() {
                    shop.update_money(-50000);

                        $(".container")
                            .fadeOut(1200, function() {
                                $(this)
                                    .remove();
                                    
                                main.end();
                            });
                },
                disabled: function() {
                    return resources.money.count < 50000;
                }
            }
        });
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

        buttons.create(shop.buttons.sell_fish.data);
        $("#sell_fish_button")
            .addClass("business_button");
        $("#sell_fish_break")
            .remove();

        let news_section = $("<div>")
            .attr("id", "news_section")
            .attr("display", "News")
            .addClass("before section_span")
            .appendTo(sections);
        $("<div>")
            .attr("id", "news_container")
            .addClass("section_span")
            .appendTo(news_section);

        let management = $("<div>")
            .attr("id", "management_section")
            .attr("display", "Management")
            .addClass("before section")
            .appendTo(sections);

        let investments = $("<div>")
            .attr("id", "investments_section")
            .attr("display", "Investments")
            .addClass("before section section_center section_top")
            .appendTo(sections);

        if ($("#fish_meta").length == 0) {
            counters.create_counter(resources.fish_meta, "below_messages");
            counters.update_counter(resources.fish_meta);
        }

        if (this.opportunities != null && this.opportunities) {
            this.create_opportunities_button();
        }

        if (resources.workers.total != 80) {
            if (!vendor.registered_item(this.vendor, "hire_worker")) {
                vendor.add_item(this.vendor, this.hire_worker);
            }
        }

        vendor.update(this.vendor);
        for (let item of this.vendor.shown) {
            if ($("#" + item.data.id + "_button").length == 0) {
                buttons.create(item.data);
            }
        }
    
        if (this.vendor.shown.length == 0) {
            $("<div>")
                .attr("id", "no_investments")
                .text("No investments available!")
                .appendTo(investments);
        } else {
            $("#hire_worker_button")
                .find(".button_header_extra")
                    .text("($" + main.stringify(this.get_worker_cost()) + ")");
        }

        $("<div>")
            .attr("id", "workers_counter")
            .appendTo(management);
        counters.create_counter(resources.workers, "workers_counter");
        $("<span>")
            .attr("id", "worker_count_max")
            .css("opacity", 0.5)
            .text("/" + resources.workers.max)
            .appendTo($("#workers"));
        $("<div>")
            .addClass("counter_break")
            .appendTo(management);

        for (let index of areas.fish_list) {
            let area = window[index];
            let parent = $("<div>")
                .attr("id", index + "_workers")
                .addClass("worker_area counter_header")
                .appendTo(management);
            $("<div>")
                .attr("id", index + "_workers_header")
                .addClass("counter_header")
                .text(area.display)
                .appendTo(parent);
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
                disabled: true,
                on_click: function() {
                    business.change_workers(index, -10);
                }
            });
            buttons.create({
                parent: index + "_worker_buttons_left",
                classes: ["worker_button"],
                text: "<",
                breaks: 0,
                disabled: true,
                on_click: function() {
                    business.change_workers(index, -1);
                }
            });
            buttons.create({
                parent: index + "_worker_buttons_right",
                classes: ["worker_button"],
                text: ">",
                breaks: 0,
                disabled: true,
                on_click: function() {
                    business.change_workers(index, 1);
                }
            });
            buttons.create({
                parent: index + "_worker_buttons_right",
                classes: ["worker_button"],
                text: ">>",
                breaks: 0,
                disabled: true,
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

        this.update_workers();
        news.generate_insignificant_news();
    },

    purchase() {
        $("#shop_button")
            .attr("id", "business_button")
            .text("Business")
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

        this.update_workers();
    },

    update_workers() {
        counters.update_counter(resources.workers);
        
        for (let index of areas.fish_list) {
            area = window[index];

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
                    .prop("disabled", resources.workers.count == 0 || !enabled || !min);
        }
    },

    remove_worker() {
        resources.workers.total -= 1;

        if (resources.workers.count > 0) {
            resources.workers.count -= 1;
        } else {
            for (let name of $.merge([], areas.fish_list).reverse()) {
                let workers = window[name].workers;
                if (workers.count > 0) {
                    workers.count -= 1;
                    return;
                }
            }
        }
    },

    get_worker_cost() {
        return 100 + resources.workers.total * 100;
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

    update_max() {
        $("#worker_count_max")
            .text("/" + resources.workers.max);
    },

    create_opportunities_button() {
        buttons.create({
            parent: "above_section",
            id: "opportunities",
            text: "Opportunities and Morality",
            on_click: function() {
                $("#news_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
                $("#management_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
                $("#investments_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
                $("#above_section")
                    .fadeOut(400, function() {
                        $(this)
                            .empty();

                        business.load_opportunities();
                    });
            }
        });
    },

    load_opportunities() {
        let above = $("#above_section")
            .show();
        let morality_section = $("<div>")
            .attr("id", "morality_section")
            .appendTo(above);
        $("<div>")
            .attr("id", "morality_header")
            .text("Morality: " + opportunities.morality)
            .appendTo(morality_section);
        $("<div>")
            .addClass("counter_break")
            .appendTo(morality_section);
        $("<span>")
            .attr("id", "morality_meter")
            .text(opportunities.get_morality_text())
            .appendTo(morality_section);
        
        buttons.create({
            parent: "above_section",
            id: "opportunities",
            text: "Management and Investments",
            on_click: function() {
                buttons.remove("opportunities");

                $("#morality_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
                $("#opportunities_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        business.load();
                    });
            }
        });
    
        let opportunities_section = $("<div>")
            .attr("id", "opportunities_section")
            .addClass("section_span")
            .appendTo($("#resource_buttons"));
        $(opportunities.create())
            .appendTo(opportunities_section);
    }
}