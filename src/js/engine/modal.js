class modal {
    parent = null;
    box = null;

    // Sets up a basic modal to add elements to
    constructor(title, width, height) {
        // Load modal CSS
        css.load(["modal"]);

        // Create the modal
        this.parent = $("<div>")
            .addClass("modal")
            .appendTo($("body"));
        // Create the background (faded out)
        $("<div>")
            .addClass("modal-background")
            .hide()
            .fadeTo(400, 0.6)
            .appendTo(this.parent);
        // Create a holder element to center the modal
        const holder = $("<div>")
            .addClass("modal-holder flex flex-centered")
            .hide()
            .fadeIn()
            .appendTo(this.parent);
        // Create the box in which the content is set
        this.box = $("<div>")
            .addClass("modal-box")
            .appendTo(holder);
        
        // Set the title
        if (title != null) {
            const text = $("<h1>")
                .addClass("modal-header")
                .text(title)
                .appendTo(this.box);
            $("<div>")
                .addClass("line-break modal-line-break")
                .appendTo(text);
        }

        // Set the width and height of the modal box
        if (width != null) {
            this.box.css("width", width);
        }

        if (height != null) {
            this.box.css("height", height);
        }

        return this;
    }

    close() {
        $(this.parent)
            .fadeOut(400, () => {
                this.parent.remove();

                css.remove(["modal"]);
            });
    }

    add_close_button() {
        const holder = $("<div>")
            .addClass("flex flex-justify-center")
            .appendTo(this.box);

        new button({
            parent: holder,
            classes: ["modal-close-button"],
            text: "Close",
            on_click: () => { 
                this.close();
            }
        });
    }

    get_box() {
        return this.box;
    }
}