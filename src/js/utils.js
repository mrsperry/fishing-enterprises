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
}