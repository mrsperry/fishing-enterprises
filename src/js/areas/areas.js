class Areas {
    static switchTo(area, fadeOut) {
        Debug.write("Areas", "Switching to area: " + area);
        Fishing.toggleLine(false);

        const setData = () => {
            Areas.currentArea = area;

            // Set the area art
            $("#fishing-content-art")
                .html(Modules.getArt("areas", area));

            // Show an additional button if the area is the lake
            const element = $("#forage-for-worms-button");
            if (area == "lake") {
                element.show();
            } else {
                element.hide();
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

    static getCurrentArea() {
        return Areas.currentArea;
    }
}