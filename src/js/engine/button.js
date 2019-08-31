class button {
    constructor(options) {
        // Set the instanced options
        this.options = options;

        // Set parent
        const parent = $(options.parent || "body");

        // Set button element
        const element = $("<button>");
        
        // Append or prepend to the parent
        if (options.prepend) {
            element.prependTo(parent);
        } else {
            element.appendTo(parent);
        }
        
        // Set ID
        if (options.id != null) {
            element.attr("id", options.id + "-button");
        }

        // Set classes
        if (options.classes != null) {
            for (const clazz of options.classes) {
                element.addClass(clazz);
            }
        }

        // Set header
        const header = options.header;
        if (header != null) {
            const bold = header.bold || "";
            const regular = header.regular || "";

            element.html(
                  "<div class='button-header'>"
                + "<span class='button-header-bold'>" + bold + "</span> "
                + "<span class='button-header-regular'>" + regular + "</span>"
                + "</div>");
        }

        // Set text
        if (options.text != null) {
            const text = (typeof(options.text) == "string" ? options.text : options.text());

            // Check if there is existing HTML
            element.html((element.html() || "")
                + "<span class='button-text'>" + text + "</span>");
        }

        // Hide the button by default
        element.hide();

        // Check if the button should be shown
        if (options.show) {
            element.show();
        }

        // Check if the button fades in or stays hidden
        if (options.hide != true) {
            element.fadeIn();
        }

        // Check if the button should be shown
        if (options.show) {
            element.show();
        }

        // Set disabled
        if (options.disabled != null) {
            element.prop("disabled", typeof(options.disabled) == "function" ? options.disabled() : options.disabled);
        }

        // Set on click function
        if (options.on_click != null) {
            element.click(options.on_click);
        }
        
        // Add line breaks
        for (const index = 0; index < options.breaks || 0; index++) {
            $("<br>")
                .attr("id", (options.id || undefined) + "-button-break")
                .appendTo(parent);
        }

        this.element = element;

        return this;
    }

    get_element() {
        return this.element;
    }
}