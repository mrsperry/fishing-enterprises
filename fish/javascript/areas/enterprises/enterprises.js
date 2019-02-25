var enterprises = {
    internal: "enterprises",
    global_share: 0,

    initialize() {
        areas.current_area = this;

        this.vendor = vendor.create(3);
        this.research_vendor = vendor.create(3);
        this.desk_data = {};
        
        desk.initialize();

        desk.load();
    }
}