var enterprises = {
    internal: "enterprises",
    global_share: 0,

    initialize() {
        areas.current_area = this;

        this.vendor = vendor.create(3);
        this.research_vendor = vendor.create(3);
        this.desk_data = {};

        resources.workers.count = 1000;
        
        research.initialize();
        desk.initialize();
        workers.initialize();

        desk.load();
    }
}