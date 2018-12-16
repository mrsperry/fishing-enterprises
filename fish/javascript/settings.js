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
                    resources.money.count += 5000;
                    counters.update();
                }
            });
            buttons.create({
                parent: "right",
                text: "Max bait",
                on_click: function() {
                    $("#bait_counters")
                        .fadeIn();
                    settings.max(resources.bait);
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
                    counters.update();
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
                    areas.switch_area(window["shop"]);
                    business.purchase();
                }
            });
        } else {
            this.dev = false;
            $("#right")
                .empty();
        }
    },

    max(resource) {
        for (let index in resource) {
            let item = resource[index];
            item.count = item.max;
            $("#" + item.internal)
                .fadeIn();
        }
        counters.update();
    },

    save_game() {
        let save = {};

        let save_resources = {};
        for (let section in resources) {
            let results = {};

            let parent = resources[section];

            if (section == "money" || section == "fuel") {
                if (parent.count > 0) {
                    results.count = parent.count;
                }
                if (parent.total > 0) {
                    results.total = parent.total;
                }

                if (section == "fuel") {
                    for (let key of settings.keys) {
                        let value = parent[key];
                        if (value != null) {
                            results[key] = value;
                        }
                    }
                }
            }

            if (section == "bait" || section == "tackle" || section == "fish") {
                for (let id in parent) {
                    let values = {};
                    for (let key of settings.keys) {
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
        this.save_settings();

        $("#restart_game")
            .addClass("link")
            .click(function() {
                settings.restart_game();
            });
    },

    load_save() {
        let save = JSON.parse(localStorage.getItem("save"));

        main.reset(save);

        for (let index in save) {
            let parent = save[index];
            if (index == "resources") {
                for (let child in parent) {
                    let value = parent[child];

                    if (child == "money" || child == "fuel") {
                        if (value.count != null) {
                            resources[child].count = value.count;
                        }
                        if (value.total != null) {
                            resources[child].total = value.total;
                        }

                        if (child == "fuel") {
                            for (let key of settings.keys) {
                                if (value[key] != null) {
                                    resources.fuel[key] = value[key];
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

                    if (item.current != null && item.current) {
                        areas.switch_area(window[child]);
                    }
                    if (item.unlocked != null && item.unlocked) {
                        areas.set_unlocked(child);

                        if (child == "pier") {
                            boat.initialize();
                        }
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
        shop.update();
        this.load_settings();
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