class floaters {
    static types = {
        standard: "standard",
        random: "random"
    };

    static create(x, y, text, type) {
        // Create the floater
        const floater = $("<div>")
            .addClass("no-select floater")
            .css("left", x + "px")
            .css("top", y + "px")
            .text(text)
            .appendTo($("body"));

        if (type == floaters.types.standard) {
            floater.animate({
                opacity: 0,
                marginTop: -60
            }, 400, "linear", () => {
                floater.remove();
            });
        } else if (type == floaters.types.random) {
            // If the x amount should be applied to the left or the right
            const direction = utils.random(0, 1) == 1;

            const x_amount = utils.random(5, 30);
            const y_amount = utils.random(50, 65);

            floater.animate({
                opacity: 0,
                // Negative y amount to move the floater up
                marginTop: -y_amount,
                // Check which direction to apply the x amount
                marginLeft: direction ? x_amount : -x_amount,
            }, 400, "linear", () => {
                floater.remove();
            });
        }
    }

    static register(element, text, type, condition) {
        $(element)
            .click((event) => {
                if (condition()) {
                    floaters.create(event.pageX, event.pageY, text, type);
                }
            });
    }
}