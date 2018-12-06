var main = {
    initialize(interval) {
        counters.initialize();
        areas.initialize();
        boat.add_parts();

        messenger.initialize();
        areas.switch_area(lake);

        this.update_interval(interval);
    },

    update() {
        areas.current_area.update();

        for (let type of ["bait", "tackle"]) {
            for (let index in resources[type]) {
                counters.auto_buy(resources[type][index]);
            }
        }
        counters.auto_buy(resources.fuel);

        counters.update();
    },

    update_interval(millis) {
        window.clearInterval(this.interval);
        this.interval = window.setInterval(this.update, millis);
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
                        delete resources.fuel.purchsed;
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
        for (let index in areas.list) {
            delete areas.list[index].unlocked;
            $("#" + index + "_button")
                .hide();
        }
        for (let index in shop.buttons) {
            let item = shop.buttons[index];
            delete item.removed;
            delete item.purchased;
        }
        delete lake.show_buttons;
        river.queue_change = false;
        river.river_troll = true;

        counters.reset(save);
    },

    show_settings() {
        let text = $.parseHTML("Color theme: "
            + "<span id='lights_on' class='link' onclick='lights.on()'>light</span> | "
            + "<span id='lights_off' class='link' onclick='lights.off()'>dark</span><br><br>"
            + "Saves: "
            + "<span class='link' onclick='settings.save_game()'>download save</span> | "
            + "<span class='link' onclick='settings.load_game()'>load save</span> | "
            + "<span id='delete_save'>delete save</span><br><br>"
            + "Dev tools: "
            + "<span id='dev_enable' class='link' onclick='settings.toggle_dev_tools(true)'>enable</span> | "
            + "<span id='dev_disable' class='link' onclick='settings.toggle_dev_tools(false)'>disable</span>"
            + "<br><br><br><br><br>");
        this.create_popup("Settings", text);

        lights.toggle(lights.lights);
        settings.toggle_dev_tools((settings.dev == null ? false : settings.dev));
        if (settings.has_save()) {
            $("#delete_save")
                .addClass("link")
                .click(function() {
                    settings.delete_save();
                });
        } else {
            $("#delete_save")
                .removeClass("link")
                .off("click");
        }
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
            + "<a class='link' target='_blank' href='https://github.com/mrsperry/mrsperry.github.io'>my Github</a>.");
        this.create_popup("About", text);
    },
    
    create_popup(header, text) {
        let overlay =  $("<div>")
            .attr("id", "overlay")
            .appendTo($("body"));
        let popup = $("<div>")
            .attr("id", "popup")
            .appendTo(overlay);

        let head = $("<h3>")
            .attr("id", "header")
            .text(header)
            .appendTo(popup);
        $("<div>")
            .addClass("divider")
            .appendTo(head);

        let content = $("<p>")
            .attr("id", "content")
            .appendTo(popup);
        $(text)
            .appendTo(content);

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
    }
}