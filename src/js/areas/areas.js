class Areas {
    static switchTo(area, fadeOut) {
        Debug.write("Areas", "Switching to area: " + area);
        Fishing.toggleLine(false);

        const setData = () => {
            Areas.currentArea = area;

            // Set the area art
            $("#fishing-content-art").html(Modules.getArt("areas", area));

            // Show an additional button if the area is the lake
            const element = $("#forage-for-worms-button");
            if (area == "lake") {
                element.show();
                $("#cast-out-line-button").css("margin-top", "");
            } else {
                element.hide();
                $("#cast-out-line-button").css("margin-top", "0em");
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

        for (const button of $("#area-selector").children("button")) {
            // Check if the button ID matches the area
            const match = $(button).attr("id").substring(0, area.length) == area;
            $(button).prop("disabled", match);
        }
    }

    static getCurrentArea() {
        return Areas.currentArea;
    }
}