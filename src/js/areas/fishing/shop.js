class Shop {
    static unlock() {
        Shop.unlocked = true;

        Utils.fadeVisibility([
            $("#shop-selector")[0],
            $("#lake-selector")[0],
            $("#area-selector .selector-break")[0]
        ]);
    }
}