let messenger = {
    lines: ["", "", "", "", ""],

    write_message: function(text) {
        console.log(text);

        if (this.lines[0] != text) {
            // shift all the lines up one
            for (let index = 4; index >= 0; index--) {
                this.lines[index] = this.lines[index - 1];
            }

            this.lines[0] = text;
        }
        
        for (let index = 0; index < 5; index++) {
            $("#history_message_" + (index + 1).toString())
                .text(this.lines[index]);
        }
    }
}