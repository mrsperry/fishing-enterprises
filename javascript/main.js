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
        $("#left_content").empty();
        $("#right_content").empty();
    },

    get_random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}