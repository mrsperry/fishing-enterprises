var settings = {
    keys: ["count", "total", "caught", "purchased", "show_max", "auto_buy", "area"],

    toggle_dev_tools(set) {
        $("#dev_" + (!set ? "enable" : "disable"))
            .addClass("link")
            .click(function() {
                settings.toggle_dev_tools(set);
            });
        $("#dev_" + (set ? "enable" : "disable"))
            .removeClass("link")
            .off("click");
        
        if (set) {
            this.dev = true;

            $("#right")
                .empty();
            
            buttons.create({
                parent: "right",
                text: "Money +5000",
                on_click: function() {
                    shop.update_money(5000);
                }
            });
            buttons.create({
                parent: "right",
                text: "Max bait",
                on_click: function() {
                    $("#bait_counters")
                        .fadeIn();
                    settings.max(resources.bait);

                    lake.show_buttons = true;
                    if (areas.current_area.internal == "lake") {
                        resources.bait.worms.caught = true;
                        $("#fishing_buttons")
                            .fadeIn();
                        lake.update();
                    }
                }
            });
            buttons.create({
                parent: "right",
                text: "Max tackle",
                on_click: function() {
                    $(".tackle")
                        .fadeIn();
                    settings.max(resources.tackle);
                }
            });
            buttons.create({
                parent: "right",
                text: "Max fuel",
                on_click: function() {
                    resources.fuel.count = 30;
                }
            });
            buttons.create({
                parent: "right",
                text: "Fast ticks",
                on_click: function() {
                    main.update_interval(150);
                }
            });
            buttons.create({
                parent: "right",
                text: "Regular ticks",
                on_click: function() {
                    main.update_interval(2500);
                }
            });
            buttons.create({
                parent: "right",
                text: "Unlock business",
                on_click: function() {
                    business.purchase();
                    areas.switch_area(business);
                    business.unlocked = true;
                }
            });
            buttons.create({
                parent: "right",
                text: "Max workers",
                on_click: function() {
                    for (let area of areas.fish_list) {
                        window[area].workers.count = 0;
                    }
                    resources.workers.count = 80;
                    resources.workers.total = 80;
                    business.update_workers();
                    $("#hire_worker_button")
                        .find(".button_header_extra")
                            .text("($" + main.stringify(business.get_worker_cost()) + ")");
                    vendor.update(business.vendor);
                }
            });
            buttons.create({
                parent: "right",
                text: "News",
                on_click: function() {
                    $("#news_text")
                        .remove();
                    news.generate_significant_news();
                }
            });
            buttons.create({
                parent: "right",
                text: "Non News",
                on_click: function() {
                    $("#news_text")
                        .remove();
                    news.generate_insignificant_news();
                }
            });
        } else {
            this.dev = false;
            $("#right")
                .empty();
        }

        this.save_settings();
    },

    max(resource) {
        for (let index in resource) {
            let item = resource[index];
            item.count = item.max;
            $("#" + item.internal)
                .fadeIn();
            counters.update_counter(item);
        }
    },

    save_game() {
        let save = {};

        let save_resources = {};
        for (let section in resources) {
            let results = {};

            let parent = resources[section];

            if (section == "money" || section == "fuel" || section == "workers") {
                if (parent.count > 0) {
                    results.count = parent.count;
                }
                if (parent.total > 0) {
                    results.total = parent.total;
                }

                if (section == "fuel" || section == "workers") {
                    for (let key of settings.keys) {
                        let value = parent[key];
                        if (value != null) {
                            results[key] = value;
                        }
                    }
                }

                if (section == "workers") {
                    results.max = parent.max;
                    
                    let areas_list = {};
                    for (let name of areas.fish_list) {
                        let area = window[name];

                        let area_settings = {};
                        if (area.workers.enabled != null && area.workers.enabled) {
                            area_settings.enabled = true;
                        }
                        if (area.workers.count != null && area.workers.count != 0) {
                            area_settings.count = area.workers.count;
                        }

                        areas_list[area.internal] = area_settings;
                    }

                    results["worker_list"] = areas_list;
                }
            }

            if (section == "bait" || section == "tackle" || section == "fish") {
                for (let id in parent) {
                    let values = {};
                    for (let key of this.keys) {
                        let value = parent[id][key];
                        if (value != null) {
                            values[key] = value;
                        }
                    }
                    results[id] = values;
                }
            }

            save_resources[section] = results;
        }
        save["resources"] = save_resources;

        let save_areas = {};
        for (let area of areas.list) {
            let results = {};

            let item = window[area];

            if (area == "lake") {
                if (lake.show_buttons != null && lake.show_buttons) {
                    results.show_buttons = true;
                }
            }
            if (area == "river") {
                if (river.queue_change || !river.river_troll) {
                    results.river_troll = true;
                }
            }

            if (item.unlocked != null && item.unlocked) {
                results.unlocked = true;
            }

            if (areas.current_area != null && areas.current_area.internal == area) {
                results.current = true;
            }

            save_areas[area] = results;
        }
        save["areas"] = save_areas;

        let save_shop = {};
        for (let button in shop.buttons) {
            let results = {};

            let item = shop.buttons[button];
            if (item.removed != null && item.removed) {
                results.removed = true;
            }

            save_shop[button] = results;
        }
        save["shop"] = save_shop;

        let save_business = {};
        save_business.fish_total = resources.fish_meta.count;
        if (business.opportunities != null && business.opportunities) {
            save_business.opportunities = business.opportunities;
        }
        save_business.morality = opportunities.morality;
        save_business.removed = business.vendor.removed;
        save["business"] = save_business;

        let save_boat = {};
        for (let part in boat.parts) {
            let results = {};
            
            let item = boat.parts[part];
            if (item.purchased != null && item.purchased) {
                results.purchased = item.purchased;
            }

            save_boat[part] = results;
        }
        save["boat"] = save_boat;

        let save_misc = {};
        let messages = [];
        for (let message of messenger.lines) {
            if (message != "") {
                messages.push(message);
            }
        }
        save_misc["messages"] = messages;
        save["misc"] = save_misc;

        let clear = (parent) => {
            for (let child in parent) {
                if (!parent[child] || typeof parent[child] != "object") {
                    continue;
                }
            
                clear(parent[child]);
                if (Object.keys(parent[child]).length == 0) {
                    delete parent[child];
                }
            }
        }
        clear(save);

        localStorage.removeItem("save");
        localStorage.setItem("save", JSON.stringify($.extend({}, save), null, 4));

        $("#restart_game")
            .addClass("link")
            .click(function() {
                settings.restart_game();
            });
    },

    load_save() {
        let save = JSON.parse(localStorage.getItem("save"));

        main.reset(save);

        let switch_to;
        for (let index in save) {
            let parent = save[index];
            if (index == "resources") {
                for (let child in parent) {
                    let value = parent[child];

                    if (child == "money" || child == "fuel" || child == "workers") {
                        if (value.count != null) {
                            resources[child].count = value.count;
                        }
                        if (value.total != null) {
                            resources[child].total = value.total;
                        }

                        if (child == "fuel" || child == "workers") {
                            for (let key of settings.keys) {
                                if (value[key] != null) {
                                    resources.fuel[key] = value[key];
                                }
                            }
                        }

                        if (child == "workers") {
                            if (value.max != null) {
                                resources[child].max = value.max;
                            }

                            if (value.worker_list != null) {
                                for (let name in value.worker_list) {
                                    let area = window[name];

                                    let settings = value.worker_list[name];
                                    if (settings.enabled != null) {
                                        area.workers.enabled = settings.enabled;
                                    }

                                    if (settings.count != null) {
                                        area.workers.count = settings.count;
                                    }
                                }
                            }
                        }
                    }

                    if (child == "bait" || child == "tackle" || child == "fish") {
                        for (let item in value) {
                            for (let key of settings.keys) {
                                let final = value[item][key];
                                if (final != null) {
                                    resources[child][item][key] = value[item][key];
                                }
                            }
                        }
                    }
                }
            }

            if (index == "areas") {
                for (let child in parent) {
                    let item = parent[child];

                    if (child == "lake") {
                        if (item.show_buttons != null && item.show_buttons) {
                            lake.show_buttons = item.show_buttons;
                        }
                    }
                    if (child == "river") {
                        if (item.river_troll != null && item.river_troll) {
                            river.queue_change = true;
                        }
                    }
                    
                    if (item.unlocked != null && item.unlocked) {
                        areas.set_unlocked(child);

                        if (child == "pier") {
                            boat.initialize();
                        }

                        if (child == "business") {
                            business.purchase();
                        }
                    }
                    
                    if (item.current != null && item.current) {
                        switch_to = child;
                    }
                }
            }

            if (index == "shop") {
                for (let child in parent) {
                    let item = parent[child];

                    if (item.removed != null && item.removed) {
                        shop.buttons[child].removed = item.removed;
                    }
                }
            }

            if (index == "business") {
                if (parent.fish_total != null) {
                    resources.fish_meta.count = parent.fish_total;
                }

                if (parent.opportunities != null) {
                    business.opportunities = parent.opportunities;
                    business.create_opportunities_button();
                }

                if (parent.morality != null) {
                    opportunities.morality = parent.morality;
                }

                if (parent.removed != null) {
                    console.log("setting removed");
                    business.vendor.removed = parent.removed;
                }
                
                vendor.update(business.vendor);
            }

            if (index == "boat") {
                for (let child in parent) {
                    let item = parent[child];

                    if (item.purchased != null && item.purchased) {
                        boat.add_part(boat.parts[child])
                    }
                }
            }

            if (index == "misc") {
                let messages = parent["messages"];
                if (messages != null && Array.isArray(messages)) {
                    for (let message of messages.reverse()) {
                        messenger.write_message(message, false);
                    }
                }
            }
        }

        counters.load(save);
        areas.switch_area(window[switch_to]);

        if (areas.current_area.internal != "business") {
            shop.update_buttons();
        } else {
            business.update_workers();
        }
    },

    save_settings() {
        let settings = {
            lights: lights.lights,
            dev_tools: this.dev == null ? false : this.dev
        }

        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(settings));
    },

    load_settings() {
        let settings = JSON.parse(localStorage.getItem("settings"));
        
        lights.toggle(settings.lights);
        this.toggle_dev_tools(settings.dev_tools);
    },

    download_save() {
        this.save_game();
        let save = localStorage.getItem("save");

        let element = $("<a>")
            .attr("download", "save.txt")
            .attr("href", "data:text/plain;charset=utf8," + encodeURIComponent(save))
            .hide()
            .appendTo("#right");

        $(element)[0]
            .click()
        
        $(element)
            .remove();
    },

    upload_save(event) {
        let onLoad = (event) => {
            settings.restart_game();
            localStorage.setItem("save", event.target.result);
            settings.load_save();
        }

        let reader = new FileReader();
        reader.onload = onLoad;
        reader.readAsText(event.target.files[0]);
    },
    
    restart_game() {
        localStorage.removeItem("save");

        $("#restart_game")
            .removeClass("link")
            .off("click");

        this.deleted = true;
        this.save_settings();
        location.reload();
    },

    has_save() {
        return localStorage.getItem("save") != null;
    },

    toggle_auto_save() {
        for (let number of [3, 5, 10]) {
            let element = $("#" + number + "_minutes");
            if (main.save_interval_number == number) {
                $(element)
                    .removeClass("link")
                    .off("click");
            } else {
                $(element)
                    .addClass("link")
                    .off("click")
                    .click(function() {
                        main.update_save_interval(number);
                    });
            }
        }
    }
}