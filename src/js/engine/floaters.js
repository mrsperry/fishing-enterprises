class floaters {
    static create(x, y, text) {
        const floater = $("<div>")
            .addClass("floater")
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
            .click(() => {
                if (condition()) {
                    const offset = element.offset();
                    floaters.create(offset.left, offset.top, text);
                }
            });
    }
}