class css {
    static parent = $("head");

    static load(hrefs) {
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

    static remove() {
        // Get all CSS links
        for (const link of css.parent.children(".temp-css-link")) {
            link.remove();
        }
    }

    static load_and_remove(hrefs) {
        css.remove();
        css.load(hrefs);
    }
}