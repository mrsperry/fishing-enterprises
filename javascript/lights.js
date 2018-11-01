var lights = {
    light_switch: true,

    toggle_lights: function() {
        let text = $("#lights");
        let body = $("body");

        let state = "lights off";
        let bg_color = "white";
        let font_color = "black";

        if (this.light_switch) {
            state = "lights on";
            bg_color = "#1a1a1a";
            font_color = "white";
        }

        $(text)
            .text(state);
        $(body)
            .css({ 
                "background": bg_color, 
                "color": font_color 
            });
        
        this.light_switch = !this.light_switch;
    }
}