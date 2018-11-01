let resources = {
    money_count: 0,

    // lake bait
    worm_count: 0,
    worm_max: 30,
    found_worms: false,

    guppy_count: 0,
    guppy_max: 10,

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
    trout_max: 10,
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

    show_max_count: function(element_name, value) {
        $("#" + element_name).css("opacity", 0.5);

        $("#" + element_name + "_max")
            .text("/" + value.toString())
            .css("opacity", 0.5)
            .show();
    },

    increment_worms: function() {
        // if this is the first time you find a worm, unlock fishing and show worm count
        if (!this.found_worms) {
            $("#worms").fadeIn();
            $("#fishing_buttons").fadeIn();

            this.found_worms = true;
        }

        // get a random amount of worms between 1-3
        if ((this.worm_count += main.get_random(1, 3)) >= this.worm_max) {
            this.worm_count = this.worm_max;

            this.show_max_count("worms_count", this.worm_max);
        }

        $("#worms_count")
            .text(this.worm_count);

        messenger.write_message("worms writhing in the mud can be used as bait");
    },

   decrement_worms: function() {
        $("#worms_count")
            .text(--this.worm_count)
            .css("opacity", 1.0);
    },

    increment_guppies: function() {
        $("#guppies_count")
            .text(++this.guppy_count);

        if (this.guppy_count == this.guppy_max) {
            this.show_max_count("guppies_count", this.guppy_max);
        }

        messenger.write_message("these little things would make great bait for larger fish");
    },

    decrement_guppies: function() {
        $("#guppy_count")
            .text(--this.guppy_count)
            .css("opacity", 1.0);
    },

    increment_bass: function() {
        // if this is the first time you catch a fish, show small fish count
        if (!this.caught_bass) {
            $("#bass").fadeIn();
            $("#guppies").fadeIn();

            this.caught_bass = true;
        }

        $("#bass_count")
            .text(++this.bass_count);

        if (this.bass_count == this.bass_max) {
            this.show_max_count("bass_count", this.bass_max);
        }

        messenger.write_message("you feel a slight tug; small fish aren't really special");
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

        if (this.sturgeon_count == this.sturgeon_max) {
            this.show_max_count("sturgeon_count", this.sturgeon_max);
        }

        messenger.write_message("an average sized fish but still nothing to scoff at");
    },

    increment_chub: function() {
        if (!this.caught_chub) {
            $("#chub")
                .fadeIn();

            this.caught_chub = true;
        }

        $("#chub_count")
            .text(++this.chub_count);

        if (this.chub_count == this.chub_max) {
            this.show_max_count("chub_count", this.chub_max);
        }

        messenger.write_message("quite the impressive catch; it looks to have been a fighter");
    }
}