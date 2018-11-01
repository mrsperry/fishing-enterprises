var fishing = {
    cast_out_line: function() {
        $("#reel_in_line_button")
            .prop("disabled", false);
        $("#cast_out_line_button")
            .prop("disabled", true);
        $("#forage_for_worms_button")
            .prop("disabled", true);

        main.area.is_fishing = true;

        messenger.write_message("you cast out your line as far as your arm permits");
    },

    reel_in_line: function() {
        $("#reel_in_line_button")
            .prop("disabled", true);
        $("#cast_out_line_button")
            .prop("disabled", false);
        $("#forage_for_worms_button")
            .prop("disabled", false);
            
        main.area.is_fishing = false;

        messenger.write_message("reeling in your line is always a tedious process");
    }
}