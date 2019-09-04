class art_data {
    static get(name) {
        return art_data.data[name];
    }

    // All art uses template literals to avoid escaping "\" and adding line breaks
    static data = {
        worm_game_1: String.raw`
           ___
          /___\
         |_____|
         | ____|
          \ ____\
           \ ____\
            |_____|
            |_____|
            |_____|
           /____ /
          |_____|
         /____ /
        |_____|
         \___/`,
        worm_game_2: String.raw`
            ____
           /____\
          /____ /
         |_____|
          \ ____\
           \ ____\
            |_____|
            |_____|
            |_____|
             \ ___\
              |____|
             /___ /
            |____|
            \___/`
    }
}