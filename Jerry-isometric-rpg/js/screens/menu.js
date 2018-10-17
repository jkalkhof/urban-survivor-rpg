//game.MenuItem = me.GUI_Object.extend( {
// var MenuItem = me.GUI_Object.extend( {
//
//   onResetEvent: function() {
//     console.log("MenuItem: onResetEvent");
//   },
//
// 	onClick: function( event ) {
// 		console.log( "clicked!" );
//
// 		if (this.callback) {
//             this.callback(this);
//         }
//
// 		return false;
// 	},
//
// 	draw: function( context ) {
// 		context.drawImage( this.image, this.pos.x, this.pos.y );
// 	}
// } );

// var Menu = me.Container.extend( {
// 	init: function( x, y, w, h ) {
// 		console.log("Menu: init");
//
// 		//this.parent( x, y, w, h );
// 		this._super(me.Container, 'init', [x, y, w, h]);
//
// 		this.name = "Menu";
// 		this.z = 999;
// 		this.buttonImage = me.loader.getImage("green_button00");
// 	},
//
// 	addMenuItem: function( settings ) {
// 		//this.addChild( new MenuItem( settings ) );
//
//     // Add a button
//     this.addChild(
//         new MenuItem(350, 200, { "image" : this.buttonImage }),
//         1 // z-index
//     );
// 	}
// } );

//game.MenuScreen = me.ScreenObject.extend( {
// var MenuScreen = me.ScreenObject.extend( {
//
// 	// "init": function( ) {
// 	// 	// this.parent( true );
// 	// 	this._super(me.ScreenObject, "init");
// 	//
// 	// 	// flag to know if we need to refresh the display
// 	// 	this.invalidate = false;
// 	// },
//
// 	"onResetEvent": function( ) {
// 		console.log("MenuScreen: onResetEvent");
//
// 		this.font = new me.Font( 'Menlo, "DejaVu Sans Mono", "Lucida Console", monospace', 12, "#fff", "center" );
//
// 		// this.bg = me.loader.getImage( "menu_bg" );
// 		//
// 		// if( this.bgm && me.audio.getCurrentTrack( ) !== this.bgm ) {
// 		// 	me.audio.playTrack( this.bgm );
// 		// }
//
// 		this.menuImage = me.loader.getImage("grey_panel");
// 		this.buttonImage = me.loader.getImage("green_button00");
//
// 		var menu = new Menu( );
// 		menu.addMenuItem( {
// 			x: 250,
// 			y: 300,
// 			width: 100,
// 			height: 50,
// 			image: this.menuImage,
// 			callback: function( ) {
// 				me.state.change( me.state.PLAY );
// 			}
// 		} );
//
// 		me.game.world.addChild( menu );
// 	},
//
// 	// "update": function( ) {
// 	// 	if( this.invalidate === true ) {
// 	// 		this.invalidate = false;
// 	// 		return true;
// 	// 	}
// 	//
// 	// 	return false;
// 	// },
//
// 	// "draw": function( context ) {
// 	// 	me.video.clearSurface( context, "#202020" );
// 	// 	context.drawImage( this.bg, 0, 0, this.bg.width, this.bg.height, 0, 0, game.SCREEN_WIDTH, game.SCREEN_HEIGHT );
// 	// 	this.font.draw( context, "The story begint", game.SCREEN_WIDTH / 2, game.SCREEN_HEIGHT / 2 );
// 	// }
// } );

/** menu **/
var MenuButton = me.GUI_Object.extend({
    onResetEvent: function() {
      console.log("MenuButton: onResetEvent");

    },

    "onClick" : function () {
        console.log("MenuButton: onClick");

				// Change to the PLAY state when the button is clicked
        me.state.change(me.state.PLAY);


        return true;
    }
});

var MenuScreen = me.ScreenObject.extend({

		addPanelSprite : function() {

			//var panelSprite = game.texture.createSpriteFromName("grey_panel");
			// panelSprite.anchorPoint.set(0, 0);
			// me.game.world.addChild(panelSprite);

			// me.Renderable -> me.Sprite
			// back panel sprite
			this.panelSprite = game.texture.createSpriteFromName("grey_panel");
			this.panelSprite.anchorPoint.set(0, 0);
			//this.panelSprite.anchorPoint.set(100, 100);

			// scale to match the container size
			var xScale = me.game.viewport.getWidth()/ this.panelSprite.width;
			var yScale = me.game.viewport.getHeight() / this.panelSprite.height;
			this.panelSprite.scale(xScale, yScale);

			this.panelSprite.pos.x = 75;
			this.panelSprite.pos.y = 25;

			console.log("MenuScreen: panelSprite: scale: ", xScale, yScale);
			console.log("MenuScreen: panelSprite: position: ", this.panelSprite.pos.x, this.panelSprite.pos.y);
			console.log("MenuScreen: panelSprite: size: ", this.panelSprite.width, this.panelSprite.height);


      // me.game.world.addChild(this.panelSprite, 0);
		},

		addMenuImage : function() {
			// https://www.javascripture.com/HTMLImageElement
			//var menuImage = me.loader.getImage("forest");
			var menuImage = me.loader.getImage("grey_panel");

			// 800x600
			console.log("MenuScreen: viewport: ",me.game.viewport.getWidth(), me.game.viewport.getHeight());

			// 100x100
			console.log("MenuScreen: menuImage: ", menuImage.width, menuImage.height);

			//menuImage.resizeImage(me.game.viewport.getWidth(), me.game.viewport.getHeight());

			// me.Object -> me.Polygon -> me.Rect ->
			//    me.Renderable -> me.ImageLayer
			var menuImageLayer = new me.ImageLayer(0, 0, {
					image : menuImage,
					z: 0 // z-index
			});

			// scale 800/100, 600/100
			// menuImageLayer.scale(
			//     me.game.viewport.getWidth()/ menuImage.width,
			//     me.game.viewport.getHeight()/ menuImage.height
			// );


			// undefined?
			//console.log("MenuScreen: ScreenObject: ", this.framewidth, this.frameheight);

			//menuImageLayer.resize(this.framewidth, this.frameheight);
			//menuImageLayer.resize(me.game.viewport.getWidth(), me.game.viewport.getHeight());

			// infinity x infinity??
			// console.log("MenuScreen: ImageLayer: ", menuImageLayer.width, menuImageLayer.height);




			// Load background image
			// me.container -> me.game.world
			me.game.world.addChild(
				menuImageLayer, // me.Renderable
				0
			);
		},

		addTextArea : function() {

      var textArea = new (me.Renderable.extend ({
          // constructor
          init : function() {
              console.log("TitleScreen: onResetEvent: Renderable: init");

              this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

              this.debugLevel = 1;

							this.floating = true;

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

              this.synopsisText = 'Congratulations!  You achieved all of the mission objectives.';

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
              //this.font.draw(renderer, "PRESS ENTER TO PLAY", me.game.viewport.width/2, me.game.viewport.height*.9);

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

    onResetEvent: function() {
        console.log("MenuScreen: onResetEvent");

				var backgroundImage = new me.Sprite(0, 0, {
							 //image: me.loader.getImage('title_screen'),
							 image: me.loader.getImage('scifi_platform_BG1'),
						}
				);

				// position and scale to fit with the viewport size
				backgroundImage.anchorPoint.set(0, 0);
				backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

				// otherwise, the player offset the viewport to a different position and bg image will be off-screen!
				backgroundImage.floating = true;

				// putting backgroundImage in an ImageLayer will try to tile the image several times across the screen!

				// var backgroundImageLayer = new me.ImageLayer(0, 0, {
				// 		image : backgroundImage,
				// 		z: 0 // z-index
				// });

				// add to the world container
				me.game.world.addChild(backgroundImage, 0);

				// Load background image
				// me.container -> me.game.world
				// me.game.world.addChild(
				// 	backgroundImageLayer, // me.Renderable
				// 	0
				// );

				this.addTextArea();

        // var buttonImage = me.loader.getImage("green_button00");

        // Add a button
        // me.game.world.addChild(
        //     new MenuButton(
				// 				me.game.viewport.width/2,
				// 				me.game.viewport.height * .8,
				// 				{ "image" : buttonImage }),
        //     1 // z-index
        // );

				// buttons don't work when uicontainer in flaot mode!
				let buttonWidth = 190; // me.game.viewport.width * .1; //100;
				let buttonHeight = 49; //me.game.viewport.height * .1; //50;
				var uiButton = me.pool.pull("UIButton",
						me.game.viewport.width/2 - (buttonWidth/2),
						me.game.viewport.height * .8,
						buttonWidth, // getWidth
						buttonHeight, // height
	          "green",
	          "Restart",
	          this.onClick.bind(this)
	      );
				uiButton.floating = true;

	      me.game.world.addChild(uiButton);

        // Play music
        // me.audio.playTrack("menu");
    },

    "onClick" : function () {
        console.log("MenuScreen: onClick");

        // Change to the PLAY state when the button is clicked
        me.state.change(me.state.PLAY);
        return true;
    },

    "onDestroyEvent" : function () {
      console.log("MenuScreen: onDestroyEvent");

        // Stop music
        // me.audio.stopTrack();
    }
});
