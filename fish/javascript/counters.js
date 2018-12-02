var counters = {
    initialize() {
        let parent = $("#resource_counters");

        // create money counter
        let money = $("<div>")
            .text("Money: $")
            .appendTo(parent);
        $("<span>")
            .attr("id", "money")
            .text("0")
            .appendTo(money);
        $("<br><br>")
            .appendTo(parent);

        // create bait counter
        $("<div>")
            .attr("id", "bait_counters")
            .attr("display", "Bait")
            .addClass("before")
            .addClass("counter")
            .hide()
            .appendTo(parent);
        for (let index in resources.bait) {
            $(this.create_counter(resources.bait[index], "bait_counters"))
                .hide();
        }
        $("<br>")
            .appendTo(parent);

        // create tackle counter
        $("<div>") 
            .attr("id", "tackle_counters")
            .attr("display", "Tackle")
            .addClass("before")
            .addClass("tackle")
            .addClass("counter")
            .hide()
            .appendTo(parent);
        for (let index in resources.tackle) {
            $(this.create_counter(resources.tackle[index], "tackle_counters"))
                .hide();
        }
        $("<br>")
            .addClass("tackle")
            .hide()
            .appendTo(parent);

        // create fish counter
        let fish = $("<div>")
            .attr("id", "fish_counters")
            .attr("display", "Fish")
            .addClass("before")
            .addClass("counter")
            .hide()
            .appendTo(parent);
        // create the location counters
        for (let index = 1; index < main.areas.length; index++) {
            $("<div>")
                .attr("id", main.areas[index].internal + "_counters")
                .appendTo(fish);
        }
    },

    update() {
        let keys = ["bait", "tackle", "fish"];
        for (let type of keys) {
            for (let index in resources[type]) {
                let item = resources[type][index];
                this.update_counter(item, item.internal + "_count");
            }
        }
        this.update_counter(resources.money, "money");
        this.update_counter(resources.fuel, "fuel_count");
    },

    update_counter(item, id) {
        $("#" + id)
            .text(main.stringify(item.count == null ? 0 : item.count))
            .css("opacity", (item.count == item.max ? 0.5 : 1.0));
    },

    create_counter(item, id) {
        let parent = $("#" + id);

        if (item.break != null && item.break) {
            $("<div>")
                .addClass("counter_break")
                .fadeIn()
                .appendTo(parent);
        }

        let element = $("<div>")
            .attr("id", item.internal)
            .addClass("value")
            .text(item.display + ": ")
            .hide()
            .appendTo(parent);
        $("<span>")
            .attr("id", item.internal + "_count")
            .text("0")
            .fadeIn()
            .appendTo(element);
        return element;
    },

    show_max(item) {
        if (item.show_max == null) {
            $("#" + item.internal + "_count")
                .css("opacity", 0.5);

            $("<span>")
                .attr("id", item.internal + "_max")
                .text("/" + item.max)
                .css("opacity", 0.5)
                .appendTo($("#" + item.internal));

            item.show_max = true;
        }
    },

    set_auto_buy(item) {
        $("<span>")
            .addClass("auto_buy")
            .text("+")
            .prependTo($("#" + item.internal));
        
        item.auto_buy = true;
    }
}