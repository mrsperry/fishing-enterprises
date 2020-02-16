class Areas {
    static switchTo(area, fadeOut) {
        Debug.write("Areas", "Switching to area: " + area)

        const setData = () => {
            // Set the area art
            $("#fishing-content-art")
                .html(Modules.getArt("areas", area));

            // Add an additional button if the area is the lake
            if (area == "lake") {
                $("<button>")
                    .attr("id", "forage-for-worms-button")
                    .addClass("fishing-button")
                    .text("Forage for worms")
                    .prependTo("#fishing-content-buttons");
            }
        };

        const content = $("#fishing-content");
        if (fadeOut) {
            content.fadeOut(400, () => {
                content.fadeIn();

                setData();
            });
        } else {
            setData();
        }
    }
}