var floaters = {
    create(x, y, text) {
        $("<div>")
            .addClass("floater")
            .css("left", x + "px")
            .css("top", y + "px")
            .text(text)
            .fadeOut(400, function() {
                $(this)
                    .remove();
            })
            .appendTo($("body"));
    },

    register_element(element, text, condition) {
        let offset = element.offset();
        $(element)
            .click(function() {
                if (typeof condition == "function" && condition()) {
                    floaters.create(
                        offset.left,
                        offset.top,
                        text);
                }
            });
    }
}