
/************************************************************************************/
/*                                                                                  */
/*        a player entity                                                           */
/*                                                                                  */
/************************************************************************************/
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, "init", [x, y , settings]);

        // walking & jumping speed
        //this.body.setVelocity(2.5, 2.5);
        this.body.setVelocity(2.5, 1.25);
        this.body.setFriction(0.4,0.4);

        // set the display around our position
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

        // enable physic collision (off by default for basic me.Renderable)
        this.isKinematic = false;

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        // the main player spritesheet
        console.log("entities: load texture for spritesheet");
        var texture =  new me.video.renderer.Texture(
            { framewidth: 32, frameheight: 32 },
            me.loader.getImage("Blank_Sprite_Sheet_4_2_by_KnightYamato")
        );

        // create a new sprite object
        this.renderable = texture.createAnimationFromName([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        // define an additional basic walking animation
        this.renderable.addAnimation ("simple_walk", [0,1,2]);

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);
    },

    /* -----

        update the player pos

    ------            */
    update : function (dt) {

        if (me.input.isKeyPressed("left")) {
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed("right")) {
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("up")) {
            // update the entity velocity
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed("down")) {
            // update the entity velocity
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this._super(me.Entity, "update", [dt]);
            return true;
        } else {
          return false;
        }
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
      // if ((response.overlapN.x !== 0) || (response.overlapN.y !== 0)) {
      //   console.log("onCollision: a:",response.a.name," b: ",response.b.name,"-",response.b.type);
      // }

      // Make all other objects solid
      return true;
    }
});


var inventory = {
  "tire-iron" : 0,
  "maps" : 0,
  "dead-battery" : 0,
	"charged-battery" : 0,
  "canned-food" : 0,
	"water" : 0,
  "bicycle-pump" : 0,
  "diesel-fuel" : 0,
  "grease-for-fuel" : 0,
  "methanol" : 0,
  "lye" : 0,
  "biodiesel" : 0,
  "vehicle" : 0,
	"radio" : 0,
	"antenna" : 0,
	"tape-recorder" : 0
  };

var achievements = {
		// acquire basic food, water and shelter
		// (charged-battery in hospital indicates hospital has power)
		"food-water-shelter" : 0,
		// establish a base of operations to contact other survivors
		// charged-battery, tape-recorder, antenna, radio setup on tall building
		"setup-communications-platform" : 0,
		// acquire a vehicle to travel to other cities
		"acquire-vehicle" : 0,
		// restore power to hospital
		"restore-power-at-hospital" : 0
	};

/**
 * Building Entity
 */
game.BuildingEntity = me.Entity.extend(
{

    init: function (x, y, settings) {
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        this.panel = null;
        this.lastCollisionTime = me.timer.getTime();
        this.debugLevel = 1;

        //this.addInventoryPanel();
    },


    /**
     * colision handler
     */
    onCollision : function (response, other) {

        let currentTime = me.timer.getTime();
        // measure time in ms since last collision
        let timeDiff = currentTime - this.lastCollisionTime;
        if ((timeDiff > 1000) || (this.panel == null)) {
          if ((response.overlapN.x !== 0) || (response.overlapN.y !== 0)) {
            console.log("onCollision: a:",response.a.name," b: ",response.b.name,"-",response.b.type, " timeDiff: ", timeDiff);
          }

          this.buildingtype = response.b.type;

          // game.PlayScreen.addUIPanels();
          if (this.panel == null) {
              this.addUIPanels(response.b.type);

              this.lastCollisionTime = currentTime;

              // do something when collide
              //me.audio.play("misc_menu");

              // make sure to bind to this or we lose context!
              // https://stackoverflow.com/questions/1300242/passing-a-function-with-parameters-as-a-parameter
              //this.timerId = me.timer.setTimeout(function() {
              this.timerId = me.timer.setInterval(function() {
                // did collider stop firing over a second ago?
                let currentTime = me.timer.getTime();
                // measure time in ms since last collision
                let timeDiff = currentTime - this.lastCollisionTime;
                if (this.debugLevel > 1) console.log("turnoffWalkaway: check: ", this.buildingtype," timeDiff: ", timeDiff);

                if ((timeDiff > 500) && (this.panel != null)) {
                  me.game.world.removeChild(this.panel);
                  me.game.repaint();
                  this.panel = null;

                  if (this.inventoryPanel != null) {
                    me.game.world.removeChild(this.inventoryPanel);
                    me.game.repaint();
                    this.inventoryPanel = null;
                  }

                  if (this.achievementsPanel != null) {
                    me.game.world.removeChild(this.achievementsPanel);
                    me.game.repaint();
                    this.achievementsPanel = null;
                  }

                  me.timer.clearInterval(this.timerId);
                }

              }.bind(this), 1000, true);

          }
        }
        this.lastCollisionTime = me.timer.getTime();



        // give some score
        //game.data.score += 250;

        // make sure it cannot be collected "again"
        //this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        // remove it
        //me.game.world.removeChild(this);

        // we lost the offset for the player??? - it resets to the beginning of the level?
				// me.game.world -> me.container
				// https://melonjs.github.io/melonJS/docs/me.game.html#world
				// https://melonjs.github.io/melonJS/docs/me.Container.html#toc4
				// https://github.com/melonjs/melonJS/wiki/Adding-and-maintaining-your-game-objects

        // check reference to player?
        game.player = me.game.world.getChildByName("mainPlayer")[0];
				// game.PlayerEntity is a class, not the instance!
				if (this.debugLevel > 1) console.log("game.PlayerEntity: name: ", game.player.name, " x,y,z: ",game.player.pos.x, game.player.pos.y, game.player.pos.z);
        // Get current player position
        //var player_pos = game.player.pos;

        // check if all achievements are done - gameover screen
        // GAMEOVER
        if (achievements["acquire-vehicle"] &&
            achievements["setup-communications-platform"] &&
            achievements["restore-power-at-hospital"]) {

              // switch to menu state and display menu screen
              me.state.set(me.state.GAMEOVER, new MenuScreen());
              //me.state.set(me.state.MENU, new game.MenuScreen());
              me.state.change(me.state.GAMEOVER);
        }

        // testing gameover on collision with any building
        // switch to menu state and display menu screen
        // me.state.set(me.state.MENU, new MenuScreen());
        // //me.state.set(me.state.MENU, new game.MenuScreen());
        // me.state.change(me.state.MENU);

        // https://stackoverflow.com/questions/2257993/how-to-display-all-methods-of-an-object
        // console.log("game.PlayScreen: functions: ",
        //       Object.getOwnPropertyNames(game.PlayScreen).filter(function (p) {
        //         return typeof game.PlayScreen[p] === 'function';
        //       }));

        return false;
    },

    getTextParkingGarage : function() {
      let panelText = 'The parking garage in the city has a few abandoned vehicles in good shape there.';
      // "Some later model vehicles are there, but it would be difficult to hot-wire them.';

      // lye, antifreeze, grease-for-fuel -> vehicle, biodiesel
      if (inventory["vehicle"] == 0) {
        if (inventory["lye"] &&
          inventory["antifreeze"] &&
          inventory["grease-for-fuel"])
        {
          inventory["vehicle"] = 1;
          inventory["lye"] = 0;
          inventory["antifreeze"] = 0;
          inventory["grease-for-fuel"] = 0;
          inventory["biodiesel"] = 1;

          panelText += "You mix the ingredients for biodiesel fuel. \
                      You fill the old diesel SUV with improvised biodiesel fuel.";

          // 5 parts cookig fat. \
          // 1 part methanol. \
          // 1/2 tablespoon lye. \
          // Shake it up. \
          // Pour into cooked grease. \
          // Pour into vehicle tank through a filter. \

          me.audio.play("positive");
        } else {
          inventory["vehicle"] = 0;

          panelText += "An old diesel SUV is there, but it looks like it is out of gas though. \
      You'll need some products to make improvised biodiesel fuel: Lye, methanol, and cooking oil.";
        }
      } else {
        panelText += "You have already acquired an SUV powered by your biodiesel fuel.";
      }


      if (inventory["vehicle"]) {
        achievements["acquire-vehicle"] = 1;
        panelText += "You have acquired a vehicle for transportation.  Congratulations you unlocked the second achievement!";

        ga('send', {
          hitType: 'event',
          eventCategory: 'achievement',
          eventAction: 'acquire-vehicle',
          eventLabel: 'true'
        });
      } else {
        panelText += "Maybe you can acquire a vehicle for transportation if you could produce fuel somehow.";
      }

      return panelText;
    },

    getTextLibrary : function() {
      let panelText = "You found the library.";
      if (inventory["maps"]) {
        panelText += "You don't find anything useful here.";
      } else {
        inventory["maps"] = 1;
        panelText += "Using the card catalog, you lookup maps and geography.\
        You find a map of the city center, complete with maps of the sewer system.";

        me.audio.play("positive");
      }

      return panelText;
    },

    getTextGasStation : function() {
      let panelText = "You found the gas-station.";
      let positiveEvent = false;

      // radio, antenna, tape-recorder, charged-battery -> setup-communications-platform
      if (inventory["dead-battery"] || inventory["charged-battery"] || achievements["setup-communications-platform"]) {
        panelText += "You don't find anything useful here.";
      } else {
        inventory["dead-battery"] = 1;
        panelText += "You find a dead battery in the gas station.";
        positiveEvent = true;
      }

      if (inventory["bicycle-pump"] && !inventory["diesel-fuel"]) {
        inventory["diesel-fuel"] = 1;
        panelText += "Use bicycle pump and hose to extract diesel fuel to gas can.";
        positiveEvent = true;
      } else {
        panelText += "There is still gas in the pumps, but without power you can't get to it.";
      }

      if (positiveEvent) {
          me.audio.play("positive");
      }

      return panelText;
    },

    getTextTallBuilding : function() {
      let panelText = "";

      // radio, antenna, tape-recorder, charged-battery -> setup-communications-platform
      if (inventory["radio"] &&
      	inventory["antenna"] &&
      	inventory["tape-recorder"] &&
      	inventory["charged-battery"]) {
      	achievements["setup-communications-platform"] = 1;

      	inventory["radio"] = 0;
      	inventory["antenna"] = 0;
      	inventory["tape-recorder"] = 0;
      	inventory["charged-battery"] = 0;

        panelText += "You setup a communications platform here.\
          You connect the tape recorder to the radio to continuously play a recorded message.\
          You also hookup the antenna to the radio so the broadcast range is far.\
          And to complete the setup you connect the charged battery to the radio and the tape recorder.\
          You have now created a communications platform and unlocked the third achievement!";

        me.audio.play("positive");

        ga('send', {
          hitType: 'event',
          eventCategory: 'achievement',
          eventAction: 'setup-communications-platform',
          eventLabel: 'true'
        });
      } else {
        panelText += "The tallest building in the city would be a good location to setup a communications platform.\
        You'll have to explore the city to find radio equipment for this.";
      }

      return panelText;
    },

    getTextSupermarket : function() {
      let panelText = "There is an old supermarket that has been stripped of most of its items.";
      // "But maybe you can find something useful here.";

      // lye, antifreeze, grease-for-fuel -> vehicle, biodiesel
      if (inventory["lye"] || inventory["biodiesel"]) {
        panelText += "You don't find anything useful here.";
      } else {
        inventory["lye"] = 1;
        inventory["antifreeze"] = 1;

        panelText += "You acquire lye ingredient from drain cleaner.\
          You acquire methanol ingredient from antifreeze.";

        me.audio.play("positive");
      }

      return panelText;
    },

    getTextResaurant : function() {

      let panelText = "The resturaunt is closed down, but you may be able to acquire some fuel by refining the grease in the resturaunt's grease catch.";

      // lye, antifreeze, grease-for-fuel -> vehicle, biodiesel
      if (inventory["grease-for-fuel"] || inventory["biodiesel"]) {
        panelText += "You don't find anything useful here.";
      } else {
        inventory["grease-for-fuel"] = 1;
        panelText += "You collect cooking grease for fuel.";

        me.audio.play("positive");
      }

      return panelText;
    },

    getTextTaxiCompany : function() {
      let panelText = "You explore the taxi company.\
        There is lots of old radio equipment.";

      // radio, antenna, tape-recorder, charged-battery -> setup-communications-platform
      if (inventory["radio"] || achievements["setup-communications-platform"]) {
        panelText += "You don't find anything useful here.";
      } else {
        inventory["radio"] = 1;
        inventory["antenna"] = 1;
        inventory["tape-recorder"] = 1;

        panelText += "You find a dispatch radio, antenna, and a tape recorder.\
          Using these you could create a communications platform.\
          But you will need a charged battery to set it up somewhere in the city.";

        me.audio.play("positive");
      }

      return panelText;
    },

    getTextHospital : function() {

      let panelText = 'You found the hospital.  \
      Much of  the hospital has already been ransacked. \
      Not much medicine can be found.\
      There is a backup generator in the basement.';

      // radio, antenna, tape-recorder, charged-battery -> setup-communications-platform
      if (achievements["restore-power-at-hospital"]) {
        panelText += "You have restored power to the hospital, the generator is working fine now.";
      } else if (inventory["diesel-fuel"] && inventory["dead-battery"] ) {
      	inventory["charged-battery"] = 1;
      	inventory["dead-battery"] = 0;
      	inventory["diesel-fuel"] = 0;
      	achievements["restore-power-at-hospital"] = 1;

        panelText += "You start the generator and charge the car battery.";

        me.audio.play("positive");

        ga('send', {
          hitType: 'event',
          eventCategory: 'achievement',
          eventAction: 'restore-power-at-hospital',
          eventLabel: 'true'
        });

      } else if (inventory["diesel-fuel"]) {
        panelText += "You start the generator with your diesel fuel.";
      } else {
        panelText += "There is a generator here, but its out of gas.";
      }

      return panelText;
    },

    getTextAbandonedHome : function() {

      let panelText = "You break in with the tire iron and look around."

      if (inventory["canned-food"]) {
        panelText += "You search but find nothing.";
      } else {
        inventory["canned-food"] = 1;
        inventory["bicycle-pump"] = 1;

        panelText += "You acquire some canned food, and a bicycle pump.";

        me.audio.play("positive");
      }

      return panelText;
    },

    addInventoryPanel : function() {
      let width = me.game.viewport.getWidth()*.1;
      let height = me.game.viewport.getHeight()*0.8;

      // bottom position - floating
      let xpos = (me.game.viewport.getWidth()) - (width);
      let ypos = 0; //(me.game.viewport.getHeight())  - (height);

      this.inventoryPanel = me.pool.pull("UIContainer", xpos, ypos, width, height, "", "inventoryPanel");
      // this.inventoryPanel.alwaysUpdate = true;

      this.updateInventoryPanel();

      me.game.world.addChild(this.inventoryPanel, 9);

    },

    updateInventoryPanel : function() {
      let width = me.game.viewport.getWidth()*.1;

      let inventoryIndex = 0;
      Object.keys(inventory).forEach(function(key) {
          if (this.debugLevel > 1) console.log("inventory[",inventoryIndex,"]: ", key, inventory[key]);

          if (inventory[key] == 1) {
            // buttons don't work when uicontainer in flaot mode!
            this.inventoryPanel.addChild(me.pool.pull("UIButton",
                5, 25 + (27 * inventoryIndex), width*.9, 25,
                "green",
                key,
                this.acceptClick.bind(this)
            ));
          }

          inventoryIndex++;
      }.bind(this));
    },

    addAchievementsPanel : function() {
      let width = me.game.viewport.getWidth() * .9;
      let height = me.game.viewport.getHeight()*0.1;

      // bottom position - floating
      let xpos = 0; // (me.game.viewport.getWidth()) - (width);
      let ypos = 0; // (me.game.viewport.getHeight()); //  - (height);

      this.achievementsPanel = me.pool.pull("UIContainer", xpos, ypos, width, height, "", "achievementsPanel");

      this.updateAchievementsPanel();

      me.game.world.addChild(this.achievementsPanel, 9);

    },

    updateAchievementsPanel : function() {
      let width = me.game.viewport.getWidth() * .9;
      let height = me.game.viewport.getHeight()*0.1;

      let buttonWidth = width * .20;
      let buttonSpacing = width * .25;

      let achievementIndex = 0;
      Object.keys(achievements).forEach(function(key) {
          console.log("achievements[",achievementIndex,"]: ", key, achievements[key]);

          if (achievements[key] == 1) {
            // buttons don't work when uicontainer in flaot mode!
            this.achievementsPanel.addChild(me.pool.pull("UIButton",
                5 + (buttonSpacing * achievementIndex), 5, buttonWidth, 15,
                "yellow",
                key,
                this.acceptClick.bind(this)
            ));
          }

          achievementIndex++;
      }.bind(this));
    },

    addDialoguePanel : function (buildingtype) {

        // get new center of viewport? since PlayerEntity is moving background
        // me.game.viewport
        // http://melonjs.github.io/melonJS/docs/me.game.html#viewport
        // http://melonjs.github.io/melonJS/docs/me.Camera2d.html
        // http://melonjs.github.io/melonJS/docs/me.Renderable.html

        // center box on the screen!
        //let width = 450;
        // let height = 325;
        let width = me.game.viewport.getWidth();
        let height = me.game.viewport.getHeight()*0.2;

        // account for viewport size, and offset when PlayerEntity moves
        // center position
        // let xpos = (me.game.viewport.getWidth()/2) + (me.game.viewport.pos.x) - (width/2);
        // let ypos = (me.game.viewport.getHeight()/2) + (me.game.viewport.pos.y) - (height/2);

        // bottom position - not floating
        // let xpos = (me.game.viewport.getWidth()/2) + (me.game.viewport.pos.x) - (width/2);
        // let ypos = (me.game.viewport.getHeight()) + (me.game.viewport.pos.y) - (height);

        // bottom position - floating
        let xpos = (me.game.viewport.getWidth()/2) - (width/2);
        let ypos = (me.game.viewport.getHeight())  - (height);


        if (this.debugLevel > 0) console.log("Building: addUIPanels: UIContainer: pos: ",xpos, ypos);

        //this.panel = me.pool.pull("UIContainer", xpos, ypos, width, height, "Explore Building");
        this.panel = me.pool.pull("UIContainer", xpos, ypos, width, height, "", "dialoguePanel");

        let panelText = "";

        switch (buildingtype) {
            default:
                panelText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt";
                break;
            case "supermarket":
                panelText = "You found the supermarket.";
                panelText = this.getTextSupermarket();
                break;
            case "parking-garage":
                panelText = this.getTextParkingGarage();
                break;
            case "warehouse":
                panelText = 'In the industrial area of the city, the warehouse district you find an old factory building.\
                  There isn\'t any evidence of people being here recently.';
                break;
            case "apartments":
                //               panelText = 'There are some squatters in the apartment complex.\
                // The apartment has no power, and small fires are visible from the exterior.';
                panelText = this.getTextAbandonedHome();
                break;
            case "stripmall":
                panelText = "You found the stripmall.";
                break;
            case "fastfoodstand":
                panelText = "You found the fastfoodstand.";
                break;
            case "hospital":
                panelText = this.getTextHospital();
                break;
            case "electronics-store":
                panelText = "You found the electronics-store.";
                break;
            case "clothing-store":
                panelText = "You found the clothing-store.";
                break;
            case "retail-store":
                panelText = "You found the retail-store.";
                break;
            case "office":
                panelText = "You found the office.";
                break;
            case "tall-office":
                panelText = this.getTextTallBuilding();
                break;
            case "library":
                panelText = this.getTextLibrary();
                break;
            case "restaurant":
                panelText = this.getTextResaurant();
                break;
            case "taxi-company":
                panelText = this.getTextTaxiCompany();
                break;
            case "gas-station":
                panelText = this.getTextGasStation();
                break;
        }


        this.panel.addChild(me.pool.pull("UITextBox", 10, 10, 800, 200, panelText));

        // buttons don't work when uicontainer in flaot mode!
        /*
        this.panel.addChild(me.pool.pull("UIButton",
            width/2 - 100, height - 50, 100, 25,
            "green",
            "Accept",
            this.acceptClick.bind(this)
        ));

        this.panel.addChild(me.pool.pull("UIButton",
            width/2, height - 50, 100, 25,
            "yellow",
            "Cancel",
            this.cancelClick.bind(this)
        ));
        */

        // add the panel to word (root) container
        //me.game.world.addChild(this.panel, 5);
        //me.game.world.addChild(this.panel, 6); // ui buttons stop working
        me.game.world.addChild(this.panel, 9);
    },

    addUIPanels: function(buildingtype) {
      // add the UI elements

      if (this.debugLevel > 0) console.log("Building: addUIPanels: ", buildingtype);

      // 800x600
      if (this.debugLevel > 0) console.log("Building: addUIPanels: viewport: size: ",me.game.viewport.getWidth(), me.game.viewport.getHeight());
      if (this.debugLevel > 0) console.log("Building: addUIPanels: viewport: position: ",me.game.viewport.pos.x, me.game.viewport.pos.y);

      this.addDialoguePanel(buildingtype);

      if (this.inventoryPanel != null) {
        me.game.world.removeChild(this.inventoryPanel);
        me.game.repaint();
        this.inventoryPanel = null;
      }
      //this.updateInventoryPanel();
      this.addInventoryPanel();

      this.addAchievementsPanel();

    },

    // button callback
    videoOptionClick:function(){
    	console.log("Building: videoOptionClick:");
    },

    // button callback
    acceptClick:function(){
    	console.log("Building: acceptClick:");
      me.game.world.removeChild(this.panel);
      // me.game.world.removeChild(this.pointer);
      me.game.repaint();
      this.panel = null;
    },

    // button callback
    cancelClick:function(){
    	console.log("Building: cancelClick:");

      console.log("Building: cancelClick: Panel pos: ", this.panel.pos.x, this.panel.pos.y);

      me.game.world.removeChild(this.panel);
      // me.game.world.removeChild(this.pointer);
      me.game.repaint();
      this.panel = null;
    }

});
