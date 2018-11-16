var button = {
    create: function(options) {
        this.options = options;

        // set the parent
        let parent = $("#" + options.parent);

        // initialize the button and add the mandatory text
        let element = $("<button>")
            .text(options.text)
            .fadeIn()
            .appendTo(parent);

        // set the element id
        if (options.id != null) {
            $(element)
                .attr("id", options.id + "_button");
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

        for (let index = 0; index < options.breaks; index++) {
            $("<br>")
                .appendTo(parent);
        }

        return this;
    }
}