class button {
    constructor(options) {
        // Set the instanced options
        this.options = options;

        // Set parent
        let parent = $(options.parent || "body");

        // Set button element
        let element = $("<button>")
            .appendTo(parent);
        
        // Set ID
        if (options.id != null) {
            element.attr("id", options.id + "-button");
        }

        // Set classes
        if (options.classes != null) {
            for (let clazz of options.classes) {
                element.addClass(clazz);
            }
        }

        // Set header
        let header = options.header;
        if (header != null) {
            let bold = header.bold || "";
            let regular = header.regular || "";

            element.html(
                  "<div class='button-header'>"
                + "<span class='button-header-bold'>" + bold + "</span> "
                + "<span class='button-header-regular'>" + regular + "</span>"
                + "</div>");
        }

        // Set text
        if (options.text != null) {
            let text = (typeof(options.text) == "string" ? options.text : options.text());

            // Check if there is existing HTML
            element.html((header != null ? element.html() : "")
                + "<span class='button-text'>" + text + "</span>");
        }

        // Check if the button fades in or stays hidden
        element.hide();
        if (options.hide != true) {
            element.fadeIn();
        }

        // Set disabled
        if (options.disabled != null) {
            element.prop("disabled", options.disabled());
        }

        // Set on click function
        if (options.on_click != null) {
            element.click(options.on_click);
        }
        
        // Add line breaks
        for (let index = 0; index < options.breaks || 0; index++) {
            $("<br>")
                .attr("id", (options.id || undefined) + "-button-break")
                .appendTo(parent);
        }

        return this;
    }
}