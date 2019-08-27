class messenger {
    static messages = [];

    static initialize() {
        const parent = $("#top-section")
            .fadeIn();
            
        for (let index = 4; index >= 0; index--) {
            const container = $("<div>")
                .addClass("message-history")
                .css("opacity", 1.0 - (index / 10))
                .text(index == 0 ? "~> " : "-  ")
                .appendTo(parent);
            $("<span>")
                .attr("id", "history-message-" + (index + 1))
                .appendTo(container);
        }
    }

    static write(string) {
        const messages = messenger.messages;

        // Remove item from the start of the array
        if (messages.length > 5) {
            messages.shift();
        }
        // Add item to the end of the array
        messages.push(string);

        for (let index = messages.length; index > 0; index--) {
            $("#history-message-" + index)
                .text(messages[index]);
        }
    }
}