class utils {
    // Capitalizes the first letter of a given string
    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }

    // Get a random number between the min and max (inclusive)
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Inserts a comma every three numbers (1000 -> 1,000)
    static stringify(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Adds leading zeros to a number
    static pad(number) {
        return number.toString().padStart(2, "0");
    }

    // Fisher-Yates shuffle
    static shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let current = array[counter];
            array[counter] = array[index];
            array[index] = current;
        }

        return array;
    }

    // Replaces all occurrences of a string inside a string
    static replace(string, key, value) {
        return string.replace(new RegExp(key, 'g'), value);
    }
}