class Debug {
    static initialize() {
        Debug.messages = [];
        Debug.log = true;
    }

    static write(namespace, message) {
        const format = "[" + namespace + "] " + message;

        if (Debug.log) {
            console.log(format);
        }

        Debug.messages.push(format);
    }
}