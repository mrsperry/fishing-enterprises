class Floater {
    constructor(event, text, interval, distance) {
        const floater = $("<div>")
            .addClass("floater no-select")
            .css("left", event.clientX)
            .css("top", event.clientY)
            .animate({
                "top": (event.clientY - (distance || 100)) + "px"
            }, {
                "queue": false,
                "duration": interval || 1000
            })
            .text(text)
            .fadeOut(interval || 1000, () => {
                floater.remove();
            })
            .appendTo("body")
    }
}