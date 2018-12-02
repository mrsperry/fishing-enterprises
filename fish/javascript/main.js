var main = {
    initialize(interval) {
        counters.initialize();
        areas.initialize();

        messenger.initialize();
        lake.initialize();

        this.interval = window.setInterval(this.update, interval);
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

    show_settings() {
        let text = $.parseHTML("Color theme: "
            + "<a class='link' onclick='lights.on()'>light</a> | "
            + "<a class='link' onclick='lights.off()'>dark</a><br><br>"
            + "Saves: "
            + "<a onclick=''>download file</a> | "
            + "<a onclick=''>delete file</a><br><br>"
            + "Dev tools: "
            + "<a onclick='settings.toggle_dev_tools(true)'>enable</a> | "
            + "<a onclick='settings.toggle_dev_tools(false)'>disable</a>"
            + "<br><br><br><br><br>");
        this.create_popup("Settings", text);
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