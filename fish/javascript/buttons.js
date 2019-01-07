var buttons = {
    create: function(options) {
        this.options = options;

        // set the parent
        let parent = $("#" + options.parent);

        // initialize the button
        let element = $("<button>")
            .appendTo(parent);

        // set id
        if (options.id != null) {
            $(element)
                .attr("id", options.id + "_button");
        }

        // set header
        let header = options.header;
        if (header != null) {
            let bold = (header.bold == null ? "" : header.bold);
            let regular = (header.regular == null ? "" : header.regular);
            $(element)
                .html("<div class='button_header'>"
                    + "<span class='button_header_title'>" + bold + "</span> " 
                    + "<span class='button_header_extra'>" + regular + "</span></div>");
        }

        // set text
        if (options.text != null) {
            let text = (typeof options.text == "string" ? options.text : options.text());
            if (header != null) {
                $(element)
                    .html($(element).html() + "<span class='button_text'>" + text + "</span>");
            } else {
                $(element)
                    .html("<span class='button_text'>" + text + "</span>");
            }
        }

        // set classes 
        if (options.classes != null) {
            for (let clazz of options.classes) {
                $(element)
                    .addClass(clazz);
            }
        }

        // set if the button is disabled
        if (options.disabled != null) {
            $(element)
                .prop("disabled", options.disabled);
        }

        // set the on click function
        if (options.on_click != null) {
            $(element)
                .click(options.on_click);
        }

        // add line breaks after the button
        if (options.breaks == null) {
            options.breaks = 1;
        }

        // hide the button
        if (options.hide == true) {
            $(element)
                .hide();
        } else {
            $(element)
                .hide()
                .fadeIn();
        }

        // add a line break so buttons aren't next to each other
        for (let index = 0; index < options.breaks; index++) {
            $("<br>")
                .attr("id", options.id + "_break")
                .appendTo(parent);
        }

        return this;
    },

    remove(id, callback) {
        $("#" + id + "_button")
            .prop("disabled", true)
            .fadeOut(400, (function() {
                $("#" + id + "_button")
                    .remove();
                $("#" + id + "_break")
                    .remove();

                if (typeof callback == "function") {
                    callback();
                }
            }));
    }
}