game.resources = [

    /* Graphics.
     * @example
     * { name: "example", type:"image", src: "data/img/example.png" },
     */

     // UI Texture
     { name: "UI_Assets",    type: "image",  src: "data/img/UI_Assets.png" },

     /* JSON Content.
      */
    // texturePacker Atlas
    { name: "UI_Assets",         type: "json",   src: "data/img/UI_Assets.json" },

    { name: "forest",  type:"image", src: "data/img/forest.png" },
    { name: "meta_collide",  type:"image", src: "data/img/meta_collide.png" },
    { name: "Blank_Sprite_Sheet_4_2_by_KnightYamato", type:"image", src: "data/img/Blank_Sprite_Sheet_4_2_by_KnightYamato.png" },

    { name: "grey_panel", type:"image", src: "data/img/PNG/grey_panel.png"},
    { name: "green_button00", type:"image", src: "data/img/PNG/green_button00.png"},

    {name: "jerrycitypack2",	type:"image", src: "data/img/map/jerrycitypack2.png"},
  	{name: "jerry-city-164x82", type:"image", src: "data/img/map/jerry-city-164x82.png"},
  	{name: "simerion-ground", type:"image", src: "data/img/map/simerion-ground.png"},
    {name: "simerion-buildings", type:"image", src: "data/img/map/simerion-buildings.png"},

    /* Maps.
     * @example
     * { name: "example01", type: "tmx", src: "data/map/example01.tmx" },
     * { name: "example01", type: "tmx", src: "data/map/example01.json" },
      */
    //{ name: "isometric", type: "tmx", src: "data/map/isometric.tmx" },
    {name: "isometric", type: "tmx",	src: "data/map/urban-survival1.tmx"},

    // user interface
    {name: "achievements-panel-720x60", type:"image",	src: "data/img/gui/achievements-panel-720x60.png"},
    {name: "dialogue-panel-800x120", type:"image",	src: "data/img/gui/dialogue-panel-800x120.png"},
    {name: "inventory-panel-80x480", type:"image",	src: "data/img/gui/inventory-panel-80x480.png"},

    // title screen
  	// {name: "title_screen",        type:"image",	src: "data/img/gui/title_screen.png"},
    {name: "scifi_platform_BG1",        type:"image",	src: "data/img/gui/scifi_platform_BG1.jpg"},

    /* Background music.
     * @example
     * { name: "example_bgm", type: "audio", src: "data/bgm/" },
     */

    /* Sound effects.
     * @example
     * { name: "example_sfx", type: "audio", src: "data/sfx/" }
     */
    {name: "misc_menu", type: "audio", src: "data/sfx/"},
   	{name: "load", type: "audio", src: "data/sfx/"},
   	{name: "positive",  type: "audio", src: "data/sfx/"}


    /* Atlases
     * @example
     * { name: "example_tps", type: "json", src: "data/img/example_tps.json" },
     */

];
