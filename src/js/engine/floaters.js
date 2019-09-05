class floaters {
    static create(x, y, text) {
        const floater = $("<div>")
            .addClass("floater no-select")
            .css("left", x + "px")
            .css("top", y + "px")
            .text(text)
            .fadeOut(400, () => {
                floater.remove();
            })
            .appendTo($("body"));
    }

    static register(element, text, condition) {
        $(element)
            .click((e) => {
                if (condition()) {
                    floaters.create(e.pageX, e.pageY, text);
                }
            });
    }
}