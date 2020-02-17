class Utils {
    static random(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }

    // Get a random object child from an object
    static randomObject(object) {
        const keys = Object.keys(object);
        return object[keys[Utils.random(0, keys.length)]];
    }

    static createCounter(data, parent, hidden) {
        const counter = $("<div>")
            .attr("id", data.internal + "-counter")
            .text(data.display + ": ")
            .appendTo(parent);
        $("<span>")
            .attr("id", data.internal + "-count")
            .text("0")
            .appendTo(counter);
        $("<span>")
            .attr("id", data.internal + "-max")
            .addClass("fishing-max")
            .text("/" + data.max)
            .hide()
            .appendTo(counter);

        if (hidden) {
            counter.hide();
        }
    }
}