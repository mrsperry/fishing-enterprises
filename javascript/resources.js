var resources = {
    money_count: 0,

    // lake bait
    worms_count: 0,
    worms_max: 30,
    caught_worms: false,

    guppies_count: 0,
    guppies_max: 10,
    caught_guppies: false,

    // lake fish
    bass_count: 0,
    bass_max: 10,
    caught_bass: false,

    sturgeon_count: 0,
    sturgeon_max: 5,
    caught_sturgeon: false,

    chub_count: 0,
    chub_max: 3,
    caught_chub: false,

    // river fish
    salmon_count: 0,
    salmon_max: 10,
    caught_salmon: false,

    trout_count: 0,
    trout_max: 7,
    caught_trout: false,

    pike_count: 0,
    pike_max: 5,
    caught_pike: false,

    // pier fish
    redfish_count: 0,
    redfish_max: 10,
    caught_redfish: false,

    mackerel_count: 0,
    mackerel_max: 5,
    caught_mackerel: false,

    black_drum_count: 0,
    black_drum_max: 3,
    caught_black_drum: false,

    show_max_count: function(name, value) {
        $("#" + name + "_count")
            .css("opacity", 0.5);

        $("#" + name + "_max")
            .text("/" + value.toString())
            .css("opacity", 0.5)
            .show();
    },

    increment_worms: function() {
        // if this is the first time you find a worm, unlock fishing and show worm count
        if (!this.caught_worms) {
            $("#worms")
                .fadeIn();
            $("#cast_out_line_button")
                .fadeIn();
            $("#reel_in_line_button")
                .fadeIn();

            this.caught_worms = true;
        }

        // get a random amount of worms between 1-3
        if ((this.worms_count += main.get_random(1, 3)) >= this.worms_max) {
            this.worms_count = this.worms_max;

            this.show_max_count("worms", this.worms_max);
        }

        messenger.write_message("worms writhing in the mud can be used as bait");

        $("#worms_count")
            .text(this.worms_count);
    },

   decrement_worms: function() {
        $("#worms_count")
            .text(--this.worms_count)
            .css("opacity", 1.0);
    },

    increment_guppies: function() {
        $("#guppies_count")
            .text(++this.guppies_count);

        messenger.write_message("these little things would make great bait for larger fish");

        if (this.guppies_count == this.guppies_max) {
            this.show_max_count("guppies", this.guppies_max);
        }
    },

    decrement_guppies: function() {
        $("#guppies_count")
            .text(--this.guppies_count)
            .css("opacity", 1.0);
    },

    increment_bass: function() {
        // if this is the first time you catch a fish, show small fish count
        if (!this.caught_bass) {
            $("#bass").fadeIn();
            $("#guppies").fadeIn();

            this.caught_bass = true;
            this.caught_guppies = true;
        }

        $("#bass_count")
            .text(++this.bass_count);

        messenger.write_message("you feel a slight tug; small fish aren't really special");

        if (this.bass_count == this.bass_max) {
            this.show_max_count("bass", this.bass_max);

            shop.unlock();
        }      
    },

    decrement_bass: function() {
        $("#bass_count")
            .text(--this.bass_count)
            .css("opacity", 1.0);
    },

    increment_sturgeon: function() {
        if (!this.caught_sturgeon) {
            $("#sturgeon")
                .fadeIn();

            this.caught_sturgeon = true;
        }

        $("#sturgeon_count")
            .text(++this.sturgeon_count);

        messenger.write_message("an average sized fish but still nothing to scoff at");

        if (this.sturgeon_count == this.sturgeon_max) {
            this.show_max_count("sturgeon", this.sturgeon_max);

            shop.unlock();
        }
    },

    increment_chub: function() {
        if (!this.caught_chub) {
            $("#chub")
                .fadeIn();

            this.caught_chub = true;
        }

        $("#chub_count")
            .text(++this.chub_count);

        messenger.write_message("quite the impressive catch; it looks to have been a fighter");

        if (this.chub_count == this.chub_max) {
            this.show_max_count("chub", this.chub_max);

            shop.unlock();
        }
    }
}