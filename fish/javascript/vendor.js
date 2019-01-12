let vendor = {
    create: function(max, buttons) {
        this.shown = [];
        this.queue = [];
        this.removed = [];

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
            let removed = (typeof item.data.removed == "function" ? item.data.removed() : item.data.removed);
            if (removed != null && removed || vendor.removed.includes(item.data.id)) {
                if (!vendor.removed.includes(item.data.id)) {
                    vendor.removed.push(item.data.id);
                }

                // remove the button
                buttons.remove(item.data.id, function() {
                    vendor.remove_index(vendor, index);
                    
                    if (item.data.callback != null) {
                        item.data.callback();
                    }
                });
            }

            // check if the button should be disabled
            $("#" + item.data.id)
                .prop("disabled", (item.data.disabled == null ? false : item.data.disabled()));
        }
    },

    update_queue(vendor) {
        // list of indices to remove after iteration is done
        let indices = [];

        // display buttons until the max has been reached
        for (let index = 0; index < vendor.queue.length; index++) {
            let item = vendor.queue[index];

            // check if there is room in the shown list
            if (vendor.shown.length == vendor.max || item == null) {
                continue;
            }

            if (vendor.removed.includes(item.data.id)) {
                indices.push(index);
                continue;
            }

            // check if the item's display condition has been met
            if (item.condition == null || item.condition()) {
                // mark the index for removal
                indices.push(index);

                // add the button to the displayed buttons list
                vendor.shown.push(item);

                // create the button
                buttons.create(item.data);
            }
        }
        
        // remove all indices that were used
        for (let index of indices.reverse()) {
            vendor.queue.splice(index, 1);
        }
    },

    remove_index(vendor, index) {
        // remove the index from the displayed list
        vendor.shown.splice(index, 1);

        // fill in the empty spot
        this.update_queue(vendor);
    },

    add_item(vendor, item) {
        // add an item the the waiting queue
        vendor.queue.push(item);
    },

    remove_item(vendor, id, callback) {
        // loop through the displayed buttons
        for (let index = 0; index < vendor.shown.length; index++) {
            let item = vendor.shown[index];

            // check if the IDs match
            if (item.data.id == id) {
                // mark the button for removal
                item.data.removed = true;

                // set the item's callback method
                item.data.callback = callback;

                // update the lists
                this.update_shown(vendor);

                return true;
            }
        }

        return false;
    },

    add_removed_item(vendor, id) {
        vendor.removed.push(id);
    },

    registered_item(vendor, id) {
        let check = (array) => {
            // loop through array contents
            for (let index of array) {
                // if an item has the same ID then it is registered 
                if (index.data.id == id) {
                    return true;
                }
            }

            return false;
        }

        // check the contents of the shown buttons and those in queue
        return check(vendor.shown) || check(vendor.queue);
    }
}