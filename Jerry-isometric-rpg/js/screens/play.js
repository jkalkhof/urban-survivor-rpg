game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        // disable gravity
        me.sys.gravity = 0;


        // clear the background
        me.game.world.addChild(new me.ColorLayer("background", "rgba(248, 194, 40, 255)"), 0);


        // this.addUIPanels();
        this.panel = null;

        // load a level
        me.levelDirector.loadLevel("isometric");

        ga('send', {
          hitType: 'event',
          eventCategory: 'play',
          eventAction: 'onResetEvent',
          eventLabel: 'onResetEventDetail'
        });

    },

    addUIPanels: function() {
      // add the UI elements

      // 800x600
      console.log("PlayScreen: viewport: ",me.game.viewport.getWidth(), me.game.viewport.getHeight());

      // center box on the screen!
      let width = 450;
      let height = 325;
      let xpos = (me.game.viewport.getWidth()/2) + (width/2);
      let ypos = (me.game.viewport.getHeight()/2) - (height/2);
      console.log("PlayScreen: UIContainer: pos: ",xpos, ypos);

      this.panel = me.pool.pull("UIContainer", xpos, ypos, width, height, "TEST OPTIONS");

      // add a few checkbox

      this.panel.addChild(me.pool.pull("UICheckBox",
          125, 75,
          game.texture,
          "green_boxCheckmark",
          "grey_boxCheckmark",
          "Music ON", // default
          "Music OFF"
      ));

      this.panel.addChild(me.pool.pull("UICheckBox",
          125, 125,
          game.texture,
          "green_boxCheckmark",
          "grey_boxCheckmark",
          "Sound FX ON", // default
          "Sound FX OFF"
      ));

      // a few buttons

      this.panel.addChild(me.pool.pull("UIButton",
          125, 175,
          "blue",
          "Video Options",
          this.videoOptionClick.bind(this)
      ));

      this.panel.addChild(me.pool.pull("UIButton",
          30, 250,
          "green",
          "Accept",
          this.acceptClick.bind(this)
      ));

      this.panel.addChild(me.pool.pull("UIButton",
          230, 250,
          "yellow",
          "Cancel",
          this.cancelClick.bind(this)
      ));

      // add the panel to word (root) container
      me.game.world.addChild(this.panel, 5);
    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {
        console.log("PlayScreen: onDestroyEvent");

        // unsubscribe to all events
        // me.event.unsubscribe(this.pointerEvent);
        // me.event.unsubscribe(this.viewportEvent);
        // me.input.releasePointerEvent("pointermove", me.game.viewport);

        // remove the HUD from the game world
        if (this.panel) {
          me.game.world.removeChild(this.panel);
        }

        // me.game.world.removeChild(this.pointer);
    },

    // button callback
    videoOptionClick:function(){
    	console.log("play: videoOptionClick:");
    },

    // button callback
    acceptClick:function(){
    	console.log("play: acceptClick:");
      me.game.world.removeChild(this.panel);
      // me.game.world.removeChild(this.pointer);
      me.game.repaint();
    },

    // button callback
    cancelClick:function(){
    	console.log("play: cancelClick:");
      me.game.world.removeChild(this.panel);
      // me.game.world.removeChild(this.pointer);
      me.game.repaint();
    }

});
