class modal {
    // Sets up a basic modal to add elements to
    constructor(width, height) {
        // Create the modal
        const parent = $("<div>")
            .addClass("modal")
            .appendTo($("body"));
        // Create the background (faded out)
        $("<div>")
            .addClass("modal-background")
            .hide()
            .fadeTo(400, 0.6)
            .appendTo(parent);
        // Create a holder element to center the modal
        const holder = $("<div>")
            .addClass("modal-holder")
            .hide()
            .fadeIn()
            .appendTo(parent);
        // Create the box in which the content is set
        const box = $("<div>")
            .addClass("modal-box")
            .appendTo(holder);

        // Set the width and height of the modal box
        if (width != null) {
            box.css("width", width);
        }

        if (height != null) {
            box.css("height", height);
        }

        return box;
    }
}