var messenger = {
    lines: ["", "", "", "", ""],

    initialize() {
        let parent = $("#history_panel");
        for (let index = 4; index >= 0; index--) {
            let item = $("<p>")
                .addClass("history")
                .text(index == 0 ? "~> " : "-  ")
                .css("opacity", 1.0 - (index / 10))
                .appendTo(parent);
            $("<span>")
                .attr("id", "history_message_" + index)
                .appendTo(item);
        }
    },

    write_message(text, log) {
        if (text != "") {
            if (log) {
                console.log(text);
            }

            if (this.lines[0] != text) {
                // shift all the lines up one
                for (let index = 4; index >= 0; index--) {
                    this.lines[index] = this.lines[index - 1];
                }

                this.lines[0] = text;
            }
            
            for (let index = 0; index < 5; index++) {
                $("#history_message_" + index)
                    .text(this.lines[index]);
            }
        }
    },

    reset() {
        for (let index = 0; index < 5; index++) {
            this.lines[index] = "";
            $("#history_message_" + index)
                .text("");
        }
    }
}