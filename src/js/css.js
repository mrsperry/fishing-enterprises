class css {
    static parent = $("head");

    static load(hrefs) {
        // Get all CSS links
        for (const link of css.parent.children(".temp-css-link")) {
            link.remove();
        }

        // Load all new CSS
        for (const href of hrefs) {
            $("<link>")
                .attr("rel", "stylesheet")
                .attr("type", "text/css")
                .attr("href", "src/css/" + href + ".css")
                .addClass("temp-css-link")
                .appendTo(css.parent);
        }
    }
}