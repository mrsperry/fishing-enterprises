var lights = {
    lights: true,

    toggle(set) {
        if (this.lights != set) {
            let on = false;
            let name = "dark";
            if (set != null && set) {
                on = true;
                name = "light";
            } else {
                name = this.lights ? "dark" : "light";
                on = !this.lights;
            }

            $("#lights_" + (!on ? "on" : "off"))
                .addClass("link")
                .click(function() {
                    lights.toggle(on);
                });
            $("#lights_" + (on ? "on" : "off"))
                .removeClass("link")
                .off("click");

            $("#page_style")
                .attr("href", "css/" + name + ".css");
            $("#lights")
                .text("lights " + (this.lights ? "on" : "off"));
                
            this.lights = on;

            settings.save_settings();
        }
    }
}