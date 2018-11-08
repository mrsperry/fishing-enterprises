var lights = {
    lights: true,

    toggle_lights() {
        let name = this.lights ? "dark" : "light";
        $("#page_style")
            .attr("href", "css/" + name + ".css");
        $("#lights")
        	.text("lights " + (this.lights ? "on" : "off"));

        this.lights = !this.lights;
    }
}