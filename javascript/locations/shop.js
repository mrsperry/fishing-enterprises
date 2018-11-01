var shop = {
    unlocked: false,

    initialize: function() {
        messenger.write_message("hello world");
    },

    update: function() {

    },

    unlock: function() {
        if (!this.unlocked) {
            this.unlocked = !this.unlocked;

            $("#location_shop")
                .fadeIn();
            $("#location_lake")
                .fadeIn();

            messenger.write_message("going to have to sell some if I want any more...");
        }
    }
}