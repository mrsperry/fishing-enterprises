var lights = {
    lights: true,

    toggle(set) {
        let lights = false;
        let name = "dark";
        if (set != null && set) {
            lights = true;
            name = "light"
        } else {
            name = this.lights ? "dark" : "light";
            lights = !this.lights;
        }

        $("#page_style")
            .attr("href", "css/" + name + ".css");
        $("#lights")
            .text("lights " + (this.lights ? "on" : "off"));
            
        this.lights = lights;
    },

    on() {
        if (!this.lights) {
            this.toggle(true);
        }
    },

    off() {
        if (this.lights) {
            this.toggle(false);
        }
    }
}