var main = {
    area: null,
    areas: [
        {
            display: "Shop",
            internal: "shop"
        },
        {
            display: "Lake",
            internal: "lake"
        },
        {
            display: "River",
            internal: "river"
        },
        {
            display: "Pier",
            internal: "pier"
        },
        {
            display: "Reef",
            internal: "reef"
        },
        {
            display: "Spear Fishing",
            internal: "spear_fishing"
        },
        {
            display: "Deep Sea",
            internal: "deep_sea"
        }
    ],

    initialize(interval) {
        this.initialize_counters();
        this.initialize_locations();

        messenger.initialize();
        lake.initialize();

        window.setInterval(function() {
            main.update();
        }, interval);
    },

    update() {
        this.area.update();
    },

    switch_area(area) {
        let children = $("#area_selector")
            .children();
        for (let index = 0; index < children.length; index++) {
            $(children[index])
                .prop("disabled", false);
        }

        $("#" + area.internal + "_button")
            .prop("disabled", true);

        if (this.area != null) {
            this.area.unload();
        }

        this.area = area;
    },

    initialize_counters() {
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

        // create fish counter
        $("<div>")
            .attr("id", "fish_counters")
            .attr("display", "Fish")
            .hide()
            .appendTo(parent);
    },

    initialize_locations() {
        let parent = $("#area_selector");
        for (let index = 0; index < this.areas.length; index++) {
            let item = this.areas[index];

            $("<button>")
                .attr("id", item.internal + "_button")
                .text(item.display)
                .click(function() {
                    // clears the buttons
                    $("#resource_buttons")
                        .empty();

                    // get the location based on name
                    window[item.internal].initialize();
                })
                .hide()
                .appendTo(parent);
            $("<br>")
                .appendTo(parent);
        }
    },

    show_about() {
        let overlay = $("<div>")
            .attr("id", "overlay")
            .appendTo($("body"));
        let popup = $("<div>")
            .attr("id", "about")
            .appendTo(overlay);
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
        let content = $("<p>")
            .appendTo(popup);
        $(text)
            .appendTo(content);
        $("<button>")
            .attr("id", "close_button")
            .text("Close")
            .click(function() {
                $(overlay)
                    .remove();
            })
            .appendTo(popup);
    },

    create_counter(id, item) {
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

    catch(fish, is_bait) {
        console.log(fish);
        if (!fish.caught) {
            // handle guppies seperately
            this.create_counter((is_bait ? "bait" : "fish") + "_counters", fish);
            
            if (fish.internal == "bass") {
                // show the fish counters if this is the first fish
                $("#fish_counters")
                    .fadeIn();
            } else if (fish.internal == "worms") {
                // show fishing buttons
                $("#fishing_buttons")
                    .fadeIn();
                // show the bait counters
                $("#bait_counters")
                    .fadeIn();
            }

            messenger.write_message(fish.message);
        }

        fish.caught = true;

        if (fish.count != fish.max) {
            let amount = this.random(1, fish.max_caught);
            if (fish.count + amount >= fish.max) {
                fish.count = fish.max;
            } else {
                fish.count += amount;
            }
            fish.total += amount;

            $("#" + fish.internal + "_count")
                .text(fish.count);

            // check this after so we don't display the message until after the max has been hit
            if (fish.count == fish.max) {
                // unlock the shop
                if (fish.internal != "worms" && fish.internal != "guppies") {
                    $("#shop_button")
                        .fadeIn();
                    $("#lake_button")
                        .fadeIn();
                }

                $("#" + fish.internal + "_count")
                    .css("opacity", 0.5);

                if (!fish.show_max) {
                    $("<span>")
                        .attr("id", fish.internal + "_max")
                        .text("/" + fish.max)
                        .css("opacity", 0.5)
                        .appendTo($("#" + fish.internal));

                    fish.show_max = true;
                }
            }

            return true;
        } else {
            if (!is_bait) {
                messenger.write_message("don't have anywhere to put this fish...");
            }

            return false;
        }
    },

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}