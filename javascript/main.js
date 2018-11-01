let main = {
    area: null,

    initialize: function(delay) {
        messenger.write_message("lovely day for some fishing...");

        lake.initialize();

        window.setInterval(function() {
                main.update();
            }, delay);
    },

    update: function() {
        this.area.update();
    },

    clear: function() {
        let counters = $("#resource_counters");
        counters.empty();
        $("#resource_buttons").empty();


        let parent = $("<span>")
            .text("Money: ")
            .appendTo(counters);
        $("<span>")
            .attr("id", "money")
            .text("0")
            .appendTo(parent);
        $("<br><br>")
            .appendTo(counters);
    },

    get_random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}