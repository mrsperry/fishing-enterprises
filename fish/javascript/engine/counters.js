var counters = {
    initialize() {
        let parent = $("#resource_counters");

        // create money counter
        let below = $("<div>")
            .attr("id", "below_messages")
            .appendTo(parent);
        let money = $("<div>")
            .text("Money: $")
            .appendTo(below);
        $("<span>")
            .attr("id", "money_count")
            .text("0")
            .appendTo(money);
        $("<span>")
            .attr("id", "money_difference")
            .appendTo(money);

        // create bait counter
        $("<div>")
            .attr("id", "bait_counters")
            .attr("display", "Bait")
            .addClass("before counter")
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
            .addClass("before tackle counter")
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
            .addClass("before counter")
            .hide()
            .appendTo(parent);
        // create the area counters
        for (let index of areas.fish_list) {
            $("<div>")
                .attr("id", index + "_counters")
                .appendTo(fish);
        }

        shop.money_difference = 0;
    },

    update_counter(item) {
        if (item.count > 0) {
            let element = $("#" + item.internal);
            $(element)
                .fadeIn();
            if ($(element)
                .parent()
                    .attr("id") == "tackle_counters") {
                $(".tackle")
                    .fadeIn();
            }
        }

        let max = (item.count == item.max);
        $("#" + item.internal + "_count")
            .text(main.stringify(item.count == null ? 0 : item.count))
            .css("opacity", max ? 0.5 : 1.0);

        if (max && (item.show_max == null || !item.show_max)) {
            this.show_max(item);
        }
    },

    reset() {
        let keys = ["bait", "tackle", "fish"];
        for (let type of keys) {
            for (let index in resources[type]) {
                let item = resources[type][index];

                let element = $("#" + item.internal);
                let parent = $(element)
                    .parent();
                if (type == "fish") {
                    $(element)
                        .remove();
                    $(parent)
                        .parent()
                            .hide();
                } else {
                    $(element)
                        .hide();
                    $(parent)
                        .hide();
                }

                $("#" + item.internal + "_count")
                    .text("0");
                $("#" + item.internal + "_max")
                    .remove();
                $("#" + item.internal + "_auto_buy")
                    .remove();
            }
        }

        $("#boat_counters")
            .remove();

        for (let area of areas.fish_list) {
            $("#" + area + "_counters")
                .empty();
        }
    },

    load(save) {
        let keys = ["bait", "tackle", "fish"];
        for (let type of keys) {
            if (save.resources != null) {
                for (let index in save.resources[type]) {
                    let item = save.resources[type][index];
                    if (type == "fish") {
                        $("#fish_counters")
                            .fadeIn();
                        this.create_counter(resources.fish[index], item.area + "_counters");
                    } else {
                        $("#" + index)
                            .fadeIn();
                        let parent = $("#" + index)
                            .parent();
                        if ($(parent)
                            .is(":hidden")) {
                            $(parent)
                                .fadeIn();
                        }
                    }

                    if (item.show_max) {
                        this.show_max(resources[type][index]);
                    }
                    if (item.auto_buy) {
                        this.add_auto_buy(resources[type][index]);
                    }

                    this.update_counter(resources[type][index]);
                }
            }
        }

        if (save.resources.fuel != null) {
            let auto = save.resources.fuel.auto_buy;
            if (auto != null && auto) {
                this.add_auto_buy(resources.fuel);
            }
        }

        this.update_counter(resources.fuel);
        this.update_counter(resources.money);
        this.update_counter(resources.fish_meta);
    },

    create_counter(item, id) {
        let parent = $("#" + id);

        if ($(parent)
                .is(":hidden")) {
            $(parent)
                .fadeIn();
        }

        if (item.header != null && item.header) {
            if (item.area != "lake") {
                $("<div>")
                    .addClass("counter_break")
                    .fadeIn()
                    .appendTo(parent);
            }
            let header = $("<div>")
                .text(window[item.area].display)
                .addClass("counter_header")
                .fadeIn()
                .appendTo(parent);
            $("<span>")
                .attr("id", item.area + "_header_count")
                .addClass("counter_header")
                .fadeIn()
                .appendTo(header);
            
            $("<div>")
                .addClass("counter_break")
                .appendTo(parent);
        }
        if (item.area != null) {
            $("#" + item.area + "_header_count")
                .text(areas.get_header(item.area));
        }

        let element = $("<div>")
            .attr("id", item.internal)
            .addClass("value")
            .text(item.display + ": ")
            .fadeIn()
            .appendTo(parent);
        $("<span>")
            .attr("id", item.internal + "_count")
            .text("0")
            .fadeIn()
            .appendTo(element);
        return element;
    },

    show_max(item) {
        $("#" + item.internal + "_count")
            .css("opacity", 0.5);

        $("<span>")
            .attr("id", item.internal + "_max")
            .text("/" + item.max)
            .css("opacity", 0.5)
            .appendTo($("#" + item.internal));

        item.show_max = true;
    },

    add_auto_buy(item) {
        $("<span>")
            .attr("id", item.internal + "_auto_buy")
            .addClass("auto_buy")
            .text("+")
            .prependTo($("#" + item.internal));

        item.auto_buy = true;
    },

    auto_buy(item) {
        if (item.auto_buy != null && item.auto_buy) {
            if (resources.money.count >= item.price) {
                if (item.count != item.max) {
                    shop.purchase_item(item);
                }
            }
        }
    }
}