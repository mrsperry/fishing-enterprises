class Messenger {
    static initialize() {
        Messenger.messages = [];
        Messenger.max = 5;
    }

    static write(message) {
        const messages = Messenger.messages;

        // Don't allow duplicate messages
        if (message == messages[0]) {
            return;
        }

        if (messages.length == Messenger.max) {
            messages.pop();
        }
        messages.unshift(message);

        for (let index = 0; index < Messenger.max; index++) {
            const element = $("#messenger-history-" + (index + 1))
                .text(messages[index]);

            if (index == 0) {
                element.hide().fadeIn();
            }
        }
    }
}