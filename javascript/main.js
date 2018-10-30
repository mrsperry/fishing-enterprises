let main = {
    area: null,

    initialize: function() {
        messenger.write_message("lovely day for some fishing...");

        lake.initialize();

        window.setInterval(function() {
                main.update(); 
            }, 1500);
    },

    update: function() {
        this.area.update();
    },

    get_random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}