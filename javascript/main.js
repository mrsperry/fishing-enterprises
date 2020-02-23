var main = {
    version: "dev-0.2",

    initialize(interval) {
        counters.initialize();
        areas.initialize();
        boat.add_parts();

        messenger.initialize();
        areas.switch_area(lake);

        this.update_interval(interval);
        this.update_save_interval(10);

        if (settings.has_save()) {
            settings.load_save();
        } else {
            settings.save_game();
            $("#bait_counters")
                .hide();
            $("#tackle_counters")
                .hide();
        }

        settings.load_settings();
    },

    update() {
        let area = areas.current_area;
        if (typeof area.update == "function") {
            areas.current_area.update();
        }
        for (let type of ["bait", "tackle"]) {
            for (let index in resources[type]) {
                counters.auto_buy(resources[type][index]);
            }
        }
        counters.auto_buy(resources.fuel);

        for (let name of areas.fish_list) {
            let area = window[name];
            for (let index = 0; index < area.workers.count; index++) {
                let fish;
                do {
                    fish = area.state.fish[main.random(0, area.state.fish.length - 1)];
                } while (fish.internal == "minnows");
                if (fish.caught != null && fish.caught) {
                    fishing.catch(fish, false);
                }
            }
        }

        news.update();
    },

    update_interval(millis) {
        window.clearInterval(this.interval);
        this.interval = window.setInterval(this.update, millis);
    },

    update_save_interval(minutes) {
        window.clearInterval(this.save_interval);
        this.save_interval = window.setInterval(settings.save_game, (minutes * 60000));
        this.save_interval_number = minutes;
        settings.toggle_auto_save();
    },

    reset(save) {
        for (let type in resources) {
            for (let index in resources[type]) {
                let item = resources[type][index];
                
                delete item.count;
                delete item.total;

                if (type == "fish") {
                    delete item.caught;
                }
                if (type == "bait" || type == "tackle" || type == "fuel") {
                    delete item.purchased;

                    if (type == "fuel") {
                        delete resources.fuel.purchased;
                    }
                }
                if (type != "money") {
                    delete item.show_max;
                    delete item.auto_buy;

                    if (type == "fuel") {
                        delete resources.fuel.show_max;
                        delete resources.fuel.auto_buy;
                    }
                }
                if (type == "money" || type == "fuel") {
                    resources[type].count = 0;
                    resources[type].total = 0;
                }
            }
        }
        for (let index in boat.parts) {
            delete boat.parts[index].purchased;
        }
        for (let index of areas.list) {
            delete window[index].unlocked;
            $("#" + index + "_button")
                .hide();
        }
        for (let index in shop.buttons) {
            let item = shop.buttons[index];
            delete item.removed;
            delete item.purchased;
        }
        delete lake.show_buttons;
        delete business.opportunities;
        river.queue_change = false;
        river.river_troll = true;

        counters.reset(save);
        messenger.reset();
    },

    end() {
        let text = $.parseHTML("Congratulations you've reached the end of the game -- for now!<br><br>"
            + "<span id='restart_2' class='link' onclick='settings.restart_game()'>Click here to restart the game.</span><br><br>"
            + "You can <a class='link' target='_blank' href='https://twitter.com/FishEnterprises'>follow my Twitter</a> for releases, "
            + "donate via <a class='link' target='_blank' href='https://paypal.me/fishingenterprises'>Paypal</a> "
            + "or support me and get frequent updates and changelogs with <a class='link' target='_blank' href='https://www.patreon.com/fishingenterprises'>Patreon</a>.<br><br>"
            + "I hope you enjoyed your time and continue playing! <>< <>< <><");
        this.create_popup("Goodbye", text);
    },

    show_settings() {
        let text = $.parseHTML("<div id='settings_div'>Color theme: "
            + "<span id='lights_on' class='link' onclick='lights.toggle(true)'>light</span> | "
            + "<span id='lights_off' class='link' onclick='lights.toggle(false)'>dark</span><br><br>"
            + "Saves: "
            + "<span id='download_save' class='link' onclick='settings.download_save()'>download save</span> | "
            + "<label class='link'><input id='upload_save' type='file'/>upload save</label> | "
            + "<span id='restart_game'>restart game</span><br>"
            + "Auto save every:<br>"
            + "<p id='save_intervals'>"
            + "<span id='3_minutes'>three minutes</span> | "
            + "<span id='5_minutes'>five minutes</span> | "
            + "<span id='10_minutes'>ten minutes</span></p><br>"
            + "Dev tools: "
            + "<span id='dev_enable' class='link' onclick='settings.toggle_dev_tools(true)'>enable</span> | "
            + "<span id='dev_disable' class='link' onclick='settings.toggle_dev_tools(false)'>disable</span><br><br>"
            + "<span id='version'></span>"
            + "<br></div>");
        this.create_popup("Settings", text);

        $("#lights_" + (lights.lights ? "on" : "off"))
            .removeClass("link")
            .off("click");
        
        $("#upload_save")
            .hide()
            .on("change", (function(event) { 
                settings.upload_save(event); 
            }));
        
        if (settings.has_save()) {
            $("#restart_game")
                .addClass("link")
                .click(function() {
                    settings.restart_game();
                });
        } else {
            $("#restart_game")
                .removeClass("link")
                .off("click");
        }

        settings.toggle_auto_save();

        settings.toggle_dev_tools((settings.dev == null ? false : settings.dev));

        $("#version")
            .text("Current version: " + this.version);
    },

    show_about() {
        let text = $.parseHTML("Fishing Enterprises was developed solely by me, Josh Sperry, in my "
            + "free time to scratch the itch of an expansive idle game. It is heavily inspired by "
            + "<a class='link' target='_blank' href='https://candybox2.github.io/candybox/'>Candybox 1</a>, "
            + "<a class='link' target='_blank' href='https://candybox2.github.io/'>Candybox 2</a>, "
            + "<a class='link' target='_blank' href='http://adarkroom.doublespeakgames.com/'>A Dark Room</a> and "
            + "<a class='link' target='_blank' href='http://www.decisionproblem.com/paperclips/'>Universal Paperclips</a>.<br><br>"
            + "The majority of the source code is written in "
            + "<a class='link' target='_blank' href='https://www.javascript.com/'>Javascript</a> with "
            + "<a class='link' target='_blank' href='https://jquery.com/'>jQuery</a> "
            + "and is freely avaliable to view on "
            + "<a class='link' target='_blank' href='https://github.com/mrsperry/mrsperry.github.io'>my Github</a>.<br>");
        this.create_popup("About", text);
    },

    show_support() {
        let text = $.parseHTML("Donate to me <a class='link' target='_blank' href='https://paypal.me/fishingenterprises'>via Paypal</a>.<br><br>"
            + "Follow the <a class='link' target='_blank' href='https://twitter.com/FishEnterprises'>official Twitter</a>.<br><br>"
            + "Email me kind words at mrjoshuasperry@gmail.com<br><br>"
            + "For additional benefits you can subscribe to the official <a class='link' target='_blank' href='https://www.patreon.com/fishingenterprises'>Patreon page</a>."
            + "<br><br>");
        this.create_popup("Support Me", text);
    },
    
    create_popup(header, text) {
        let overlay =  $("<div>")
            .attr("id", "overlay")
            .hide()
            .fadeIn()
            .appendTo($("body"));
        let popup = $("<div>")
            .attr("id", "popup")
            .appendTo(overlay);

        let head = $("<h3>")
            .addClass("centered")
            .text(header)
            .appendTo(popup);
        $("<div>")
            .addClass("divider")
            .appendTo(head);

        let content = $("<p>")
            .attr("id", "content")
            .addClass("centered")
            .appendTo(popup);
                
        $(text)
            .appendTo(content);

        if (header != "Goodbye") {
            buttons.create({
                parent: "content",
                id: "close",
                text: "Close",
                breaks: 0,
                on_click: function() {
                    $(overlay)
                        .remove();
                }
            });
        }
        return popup;
    },

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Fisher-Yates shuffle
    shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let current = array[counter];
            array[counter] = array[index];
            array[index] = current;
        }

        return array;
    },

    // adds commas to a number where neccessary ex: 1000 -> 1,000
    stringify(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // replaces all occurences of a string inside a string
    replaceAll(string, key, value) {
        return string.replace(new RegExp(key, 'g'), value);
    }
}