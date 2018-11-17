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
            .hide()
            .appendTo(parent);
        $("<br>")
            .appendTo(parent);

        // create tackle counter
        $("<div>") 
            .attr("id", "tackle_counters")
            .attr("display", "Tackle")
            .addClass("tackle")
            .hide()
            .appendTo(parent);
        $("<br>")
            .addClass("tackle")
            .hide()
            .appendTo(parent);

        // create fish counter
        $("<div>")
            .attr("id", "fish_counters")
            .attr("display", "Fish")
            .hide()
            .appendTo(parent);
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
    },

    update_counter(item, id) {
        $("#" + id)
            .text(item.count)
            .css("opacity", (item.count == item.max ? 0.5 : 1.0));
        $("#" + id + "_max")
            .text("/" + item.max);
    },

    create(id, item) {
        let counters = $("#" + id);

        // create counter
        let parent = $("<div>")
            .attr("id", item.internal)
            .addClass("value")
            .text(item.display + ": ")
            .appendTo(counters);
        $("<span>")
            .attr("id", item.internal + "_count")
            .text("0")
            .appendTo(parent);
    },

    show_max(item) {
        if (!item.show_max) {
            $("#" + item.internal + "_count")
                    .css("opacity", 0.5);

            $("<span>")
                .attr("id", item.internal + "_max")
                .text("/" + item.max)
                .css("opacity", 0.5)
                .appendTo($("#" + item.internal));

            item.show_max = true;
        }
    }
}