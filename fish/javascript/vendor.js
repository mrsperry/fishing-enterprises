let vendor = {
    create: function(max, buttons) {
        this.shown = [];
        this.queue = [];

        // set the max number of buttons
        this.max = max;

        // add all current buttons to the queue
        if (buttons != null) {
            for (let button of buttons) {
                this.queue.push(button);
            }
        }

        return this;
    },

    update(vendor) {
        this.update_shown(vendor);
        this.update_queue(vendor);
    },

    update_shown(vendor) {
        // loop through the currently displayed buttons
        for (let index = 0; index < vendor.shown.length; index++) {
            let item = vendor.shown[index];

            // check if the button should be removed
            if (item.removed != null && item.removed) {
                // remove the button
                buttons.remove(item.id, function() {
                    vendor.remove_index(vendor, index);
                });
            }

            // check if the button should be disabled
            $("#" + item.id)
                .prop("disabled", (item.disabled != null ? false : item.disabled));
        }
    },

    update_queue(vendor) {
        // display buttons until the max has been reached
        while (vendor.shown.length != this.max) {
            let item = vendor.queue.shift();
            if (item == null) {
                return;
            }

            // add the button to the displayed buttons list
            vendor.shown.push(item);

            // create the button
            buttons.create(item);
        }
    },

    remove_index(vendor, index) {
        // remove the index from the displayed list
        vendor.shown.splice(index, 1);

        // fill in the empty spot
        vendor.update_queue(vendor);
    },

    add_item(vendor, item) {
        // add an item the the waiting queue
        vendor.queue.push(item);
    },

    remove_item(vendor, id) {
        // loop through the displayed buttons
        for (let index = 0; index < vendor.shown.length; index++) {
            let item = vendor.shown[index];

            // check if the IDs match
            if (item.id != null && item.id == id) {
                // mark the button for removal
                item.removed = true;

                // set the item
                vendor.shown[index] = item;

                // update the lists
                this.update(vendor);

                return true;
            }
        }

        return false;
    }
}