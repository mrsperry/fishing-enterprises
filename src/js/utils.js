class Utils {
    static random(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }
    
    static createCounter(data, parent) {
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
            .text("/" + data.max)
            .appendTo(counter);
    }
}