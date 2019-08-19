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

    static remove(hrefs) {
        // Get all CSS links
        for (const link of css.parent.children(".temp-css-link")) {
            // Check if there are specific links to remove
            if (hrefs != null) {
                // Return when all links are found
                if (hrefs.length == 0) {
                    return;
                }

                for (const index in hrefs) {
                    const href = hrefs[index];

                    // Check if this link should be removed
                    if ($(link).attr("href").includes(href)) {
                        // Remove the link from the array
                        hrefs.splice(index, 1);

                        // Remove the link element
                        link.remove();
                        break;
                    }
                }
            } else {
                link.remove();
            }
        }
    }

    static replace(load, remove) {
        css.remove(remove);
        css.load(load);
    }
}