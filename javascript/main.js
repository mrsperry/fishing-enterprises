var main = {
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
        $("#resource_buttons")
            .empty();
        $("#area_selector")
            .empty();

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

    initialize_locations: function(area) {
        this.area = area;

        let names = [
            "Shop",
            "Lake",
            "River",
            "Pier",
            "Reef",
            "Diving",
            "Deep sea"
        ];

        for (let index = 0; index < names.length; index++) {
            let name = names[index];

            let parent = $("#area_selector");
            $("<button>")
                .attr("id", "location_" + name.toLowerCase())
                .prop("disabled", this.area.display == name.toLowerCase())
                .text(name)
                .click(function() {
                        window[name.toLowerCase()].initialize();
                    })
                .hide()
                .appendTo(parent);
            $("<br>")
                .appendTo(parent);
        }
    },

    get_random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}