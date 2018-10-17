game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        // disable gravity
        me.sys.gravity = 0;


        // clear the background
        me.game.world.addChild(new me.ColorLayer("background", "rgba(248, 194, 40, 255)"), 0);

        // display a basic tile selector
        // me.game.world.addChild(new (me.Renderable.extend({
        //     /** Constructor */
        //     init: function() {
        //         // reference to the main layer
        //         this.refLayer = me.game.world.getChildByName("level 1")[0];
        //
        //         // call the parent constructor using the tile size
        //         this._super(me.Renderable, 'init', [ 0, 0,
        //             this.refLayer.tilewidth / 2,
        //             this.refLayer.tileheight
        //         ]);
        //
        //         this.anchorPoint.set(0, 0);
        //
        //         // configure it as floating
        //         this.floating = true;
        //
        //         // create a corresponding diamond polygon shape with an isometric projection
        //         this.diamondShape = this.clone().toPolygon().toIso();
        //
        //         // currently selected tile
        //         this.currentTile = null;
        //
        //         // simple font to display tile coordinates
        //         this.font = new me.Font("Arial", 10, "#FFFFFF");
        //         this.font.textAlign = "center";
        //
        //         // dirty flag to enable/disable redraw
        //         this.dirty = false;
        //
        //         this.isKinematic = false;
        //
        //         // subscribe to pointer and viewport move event
        //         this.pointerEvent = me.event.subscribe("pointermove", this.pointerMove.bind(this));
        //         this.viewportEvent = me.event.subscribe(me.event.VIEWPORT_ONCHANGE, this.viewportMove.bind(this));
        //     },
        //     /** pointer move event callback */
        //     pointerMove : function (event) {
        //         var tile = this.refLayer.getTile(event.gameWorldX, event.gameWorldY);
        //         if (tile && tile !== this.currentTile) {
        //             // get the tile x/y world isometric coordinates
        //             this.refLayer.getRenderer().tileToPixelCoords(tile.col, tile.row, this.diamondShape.pos);
        //             // convert thhe diamon shape pos to floating coordinates
        //             me.game.viewport.worldToLocal(
        //                 this.diamondShape.pos.x,
        //                 this.diamondShape.pos.y,
        //                 this.diamondShape.pos
        //             );
        //             // store the current tile
        //             this.currentTile = tile;
        //         };
        //     },
        //     /** viewport move event callback */
        //     viewportMove : function (pos) {
        //         // invalidate the current tile when the viewport is moved
        //         this.currentTile = null;
        //     },
        //     /** Update function */
        //     update : function (dt) {
        //         return (typeof(this.currentTile) === "object");
        //     },
        //     /** draw function */
        //     draw: function(renderer) {
        //         if (this.currentTile) {
        //             // draw our diamond shape
        //             renderer.save();
        //             renderer.setColor("#FF0000");
        //             renderer.drawShape(this.diamondShape);
        //
        //             renderer.setColor("#FFFFFF");
        //             // draw the tile col/row in the middle
        //             this.font.draw (
        //                 renderer,
        //                 "( " + this.currentTile.col + "/" + this.currentTile.row + " )",
        //                 this.diamondShape.pos.x,
        //                 (this.diamondShape.pos.y + (this.currentTile.height / 2) - 8)
        //             );
        //             renderer.restore();
        //         }
        //     }
        // })));
        //
        // // register on mouse event
        // me.input.registerPointerEvent("pointermove", me.game.viewport, function (event) {
        //     me.event.publish("pointermove", [ event ]);
        // }, false);


        // this.addUIPanels();
        this.panel = null;


        // display the current pointer coordinates on top of the pointer arrow
        // this.pointer = new (me.Renderable.extend({
        //     init: function() {
        //         this._super(me.Renderable, 'init', [0, 0, 10, 10]);
        //         this.font = new me.Font("Arial", 10, "#FFFFFF");
        //         this.font.textAlign = "center";
        //         this.fontHeight = this.font.measureText(me.video.renderer, "DUMMY").height;
        //     },
        //     draw: function(renderer){
        //         var x = Math.round(me.input.pointer.pos.x);
        //         var y = Math.round(me.input.pointer.pos.y);
        //         this.font.draw (
        //             renderer,
        //             "( " + x + "," + y + " )",
        //             x,
        //             y - this.fontHeight);
        //     }
        // }));
        //
        // me.game.world.addChild(this.pointer, 10);

        // load a level
        me.levelDirector.loadLevel("isometric");

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
