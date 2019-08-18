class css {
    static parent = $("head");

    static load(hrefs) {
        // Get all CSS links
        for (let link of css.parent.children(".temp-css-link")) {
            link.remove();
        }

        // Load all new CSS
        for (let href of hrefs) {
            $("<link>")
                .attr("rel", "stylesheet")
                .attr("type", "text/css")
                .attr("href", "src/css/" + href + ".css")
                .addClass("temp-css-link")
                .appendTo(css.parent);
        }
    }
}