game.TitleScreen = me.ScreenObject.extend({

    addTextArea : function() {

      var textArea = new (me.Renderable.extend ({
          // constructor
          init : function() {
              console.log("TitleScreen: onResetEvent: Renderable: init");

              this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

              this.debugLevel = 1;

              this.panelWidth = me.game.viewport.width *.8;
              this.panelHeight = me.game.viewport.height *.8;

              this.anchorPoint.set(0, 0);

              // a default white color object
              this.color = me.pool.pull("me.Color", 255, 255, 255);

              // font for the scrolling text
              //this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
              //this.font = new me.Font("kenpixel", 50, "black");
              //this.font = new me.Font("Verdana", 15, "black");
              // arial font
              this.font = new me.Font("Arial", 24, this.color);
              // this.font.setFont("Arial", 16, "white");

              // this.font.setOpacity(1);
              this.font.textAlign = "center";
              // this.font.textBaseline = "top";
              // this.font.bold();

              this.synopsisText = 'A natural disaster has broken out.\
      Military has declared martial law in the area.\
      Major roads into and out of cities have been blockaded with checkpoints.\
      Roving gangs, and isolated individuals are potentially hostile.\
      You were initially fleeing the hurricane, but now your vehicle has run out of gas, \
      on a back road and you are within 20 miles of a city.\
      Your mission is to acquire basic food, water and shelter in an urban enviornment.\
      Your secondary mission is to establish a base of operations to contact other survivors.\
      Your third mission is to travel to other cities and establish communities there.';

          },

          // some callback for the tween objects
          // scrollover : function() {
          //     // reset to default value
          //     this.scrollerpos = 640;
          //     this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
          // },

          // update : function (dt) {
          //     return true;
          // },

          draw : function (renderer) {
              // console.log("TitleScreen: onResetEvent: Renderable: draw");
              //this.font.draw(renderer, this.synopsisText, me.game.viewport.width/2, me.game.viewport.height/2);

              //console.log("TextUI: labelText: draw: ",this.pos.x, this.pos.y, this.width, this.height);
              if (this.debugLevel > 1) console.log("TextUI: labelText: draw: ",this.pos.x, this.pos.y, this.panelWidth, this.panelHeight);

              let textMeasure = this.font.measureText(renderer, "x");
              if (this.debugLevel > 1) console.log("TextUI: labelText: draw: textMeasure: ", textMeasure.width, textMeasure.height);

              // 10x20 per character
              let charactersPerLine = this.panelWidth / textMeasure.width;
              let linesPerPanel = this.panelHeight / textMeasure.height;

              let charactersToRender = this.synopsisText.length;
              let linesToRender = charactersToRender / linesPerPanel;

              var i;
              var currentLineIndex = 0;
              for (i = 0; i < charactersToRender; i+= charactersPerLine) {
                  let charactersLeft = charactersToRender - (currentLineIndex * charactersPerLine);
                  let charactersThisLine = Math.min(charactersPerLine, charactersLeft);
                  let strToRender = this.synopsisText.substring(i, i + charactersThisLine);

                  this.font.draw (
                      renderer,
                      strToRender, // label
                      me.game.viewport.width/2,
                      me.game.viewport.height*.3  + (currentLineIndex * textMeasure.height));
                      //me.game.viewport.height/2 + (currentLineIndex * textMeasure.height));

                  currentLineIndex += 1;
              }


              // this.font.textAlign = "center";
              this.font.draw(renderer, "PRESS ENTER TO PLAY", me.game.viewport.width/2, me.game.viewport.height*.9);

          },

          onDestroyEvent : function() {
              console.log("TitleScreen: onResetEvent: Renderable: onDestroyEvent");

              //just in case
              // this.scrollertween.stop();
          }
      }));

      // add a new renderable component with the scrolling text
      me.game.world.addChild(textArea, 2);

    },

    /**
     *  action to perform on state change
     */
    onResetEvent : function() {

        console.log("TitleScreen: onResetEvent");

        // title screen
        var backgroundImage = new me.Sprite(0, 0, {
               //image: me.loader.getImage('title_screen'),
               image: me.loader.getImage('scifi_platform_BG1'),
            }
        );

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);
        // add to the world container
        me.game.world.addChild(backgroundImage, 1);

        this.addTextArea();

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                // me.audio.play("cling");
                me.state.change(me.state.PLAY);
            }
        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
        console.log("TitleScreen: onDestroyEvent");

        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
   }
});
