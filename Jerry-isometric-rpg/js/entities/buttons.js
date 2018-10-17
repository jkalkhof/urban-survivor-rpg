/**
 * UI Objects
 */

game.UI = game.UI || {};

/**
 * a basic button control
 */
game.UI.ButtonUI = me.GUI_Object.extend({
    /**
     * constructor
     */
    init: function(x, y, width, height, color, label, clickCallback) {
        this._super(me.GUI_Object, "init", [ x, y, {
            image: game.texture,
            region : color + "_button04",
            framewidth: width,
            frameheight: height
        } ]);

        this.debugLevel = 1;

        if (this.debugLevel > 0) console.log("UI.ButtonUI: ",label);

        // offset of the two used images in the texture
        this.unclicked_region = game.texture.getRegion(color + "_button04");
        this.clicked_region = game.texture.getRegion(color + "_button05");

        this.anchorPoint.set(0, 0);
        //this.setOpacity(0.5);
        this.setOpacity(1);

        this.font = new me.Font("kenpixel", 12, "black");
        this.font.textAlign = "center";
        this.font.textBaseline = "middle";

        this.label = label;

        // only the parent container is a floating object
        this.floating = false;

        // new stuff - Jerry
        this.clickCallback = null;
        if( typeof clickCallback == "function" ) {
          this.clickCallback = clickCallback;
        }
    },

    /**
     * function called when the object is clicked on
     */
    onClick : function (/* event */) {
        this.setRegion(this.clicked_region);

        if (this.debugLevel > 0) console.log("UI.ButtonUI[",this.label,"]: onClick: ");

        // account for the different sprite size
        this.pos.y += this.height - this.clicked_region.height ;
        this.height = this.clicked_region.height;

        // new stuff - Jerry
        this.clickCallback && this.clickCallback();

        // don't propagate the event
        return false;
    },

    /**
     * function called when the pointer button is released
     */
    onRelease : function (/* event */) {
        this.setRegion(this.unclicked_region);
        // account for the different sprite size
        this.pos.y -= this.unclicked_region.height - this.height;
        this.height = this.unclicked_region.height;
        // don't propagate the event
        return false;
    },

    draw: function(renderer) {
        this._super(me.GUI_Object, "draw", [ renderer ]);
        this.font.draw(renderer,
            this.label,
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );
    }
});

/**
 * a basic checkbox control
 */
game.UI.CheckBoxUI = me.GUI_Object.extend({
    /**
     * constructor
     */
    init: function(x, y, texture, on_icon, off_icon, on_label, off_label) {

        // call the parent constructor
        this._super(me.GUI_Object, "init", [ x, y, {
            image: texture,
            region : on_icon // default
        } ]);

        this.debugLevel = 0;

        if (debugLevel > 0) console.log("UI.CheckBoxUI: ", on_label);

        // offset of the two used images in the texture
        this.on_icon_region = texture.getRegion(on_icon);
        this.off_icon_region = texture.getRegion(off_icon);

        this.anchorPoint.set(0, 0);
        this.setOpacity(0.5);

        this.isSelected = true;

        this.label_on = on_label;
        this.label_off = off_label;

        this.font = new me.Font("kenpixel", 12, "black");
        this.font.textAlign = "left";
        this.font.textBaseline = "middle";

        // only the parent container is a floating object
        this.floating = false;
    },

    /**
     * function called when the pointer is over the object
     */
    onOver : function (/* event */) {
        this.setOpacity(1.0);
    },

    /**
     * function called when the pointer is leaving the object area
     */
    onOut : function (/* event */) {
        this.setOpacity(0.5);
    },

    /**
     * change the checkbox state
     */
    setSelected : function (selected) {
        if (selected) {
            this.setRegion(this.on_icon_region);
            this.isSelected = true;
        } else {
            this.setRegion(this.off_icon_region);
            this.isSelected = false;
        }
    },

    /**
     * function called when the object is clicked on
     */
    onClick : function (/* event */) {
        this.setSelected(!this.isSelected);

        if (debugLevel > 0) console.log("UI.CheckBoxUI[",this.label_on,"]: onClick: ", this.isSelected);

        // don't propagate the event
        return false;
    },

    draw: function(renderer) {
        this._super(me.GUI_Object, "draw", [ renderer ]);

        // save global alpha
        var alpha = renderer.globalAlpha();
        // sprite alpha value
        renderer.setGlobalAlpha(alpha * this.getOpacity());

        this.font.draw(renderer,
            " " + (this.isSelected ? this.label_on : this.label_off),
            this.pos.x + this.width,
            this.pos.y + this.height / 2
        );

        // restore global alpha
        renderer.setGlobalAlpha(alpha);
    }
});

game.UI.TextUI = me.Container.extend({

      init: function(x, y, width, height, label) {
          var debugLevel = 0;

          // call the constructor
          this._super(me.Container, "init", [x, y, width, height]);

          if (debugLevel > 0) console.log("UI.TextUI: ",label);

          this.anchorPoint.set(0, 0);

          // persistent across level change
          this.isPersistent = true;

          // make sure our object is always draw first
          this.z = Infinity;

          // floating causes conflict with player!
          //this.floating = true;
          // this.floating = false;

          // give a name
          this.name = "TextUI";

          // back panel sprite
          // this.panelSprite = game.texture.createSpriteFromName("grey_panel");
          // this.panelSprite.anchorPoint.set(0, 0);

          // scale to match the container size
          // this.panelSprite.scale(
          //     this.width / this.panelSprite.width,
          //     this.height / this.panelSprite.height
          // );

          // this.addChild(this.panelSprite);

          // Panel Label
          var myLabel = me.Renderable.extend({
              init: function(x,y,width, height) {
                  //console.log("TextUI: labelText: init: ", this.width, this.height);
                  if (debugLevel > 0) console.log("TextUI: labelText: init: ", x,y,width,height);

                  this._super(me.Renderable, 'init', [0, 0, 0,0]);
                  //this._super(me.Renderable, 'init', [10, 10, width, height]);
                  this.fontSize = 20;
                  //this.font = new me.Font("kenpixel", this.fontSize, "white");
                  this.font = new me.Font("Arial", this.fontSize, "white");
                  this.font.textAlign = "left";
                  this.font.textBaseline = "middle";
                  this.font.bold();

                  // save new variables
                  this.panelWidth = width;
                  this.panelHeight = height;

                  if (debugLevel > 0) console.log("TextUI: labelText: font(size): ", this.font.lineWidth, this.font.lineHeight);
              },
              draw: function(renderer){

                  //console.log("TextUI: labelText: draw: ",this.pos.x, this.pos.y, this.width, this.height);
                  if (debugLevel > 0) console.log("TextUI: labelText: draw: ",this.pos.x, this.pos.y, this.panelWidth, this.panelHeight);

                  let textMeasure = this.font.measureText(renderer, "x");
                  if (debugLevel > 0) console.log("TextUI: labelText: draw: textMeasure: ", textMeasure.width, textMeasure.height);

                  // 10x20 per character
                  //let charactersPerLine = this.panelWidth / textMeasure.width;
                  // only gets 80% of width, so multiply by 1.25
                  let charactersPerLine = (this.panelWidth / textMeasure.width) * 1.05;
                  let linesPerPanel = this.panelHeight / textMeasure.height;

                  // me.utils.string.trimRight


                  let charactersToRender = label.length;
                  let linesToRender = charactersToRender / linesPerPanel;

                  var i;
                  var currentLineIndex = 0;
                  for (i = 0; i < charactersToRender; i+= charactersPerLine) {
                      let charactersLeft = charactersToRender - (currentLineIndex * charactersPerLine);
                      let charactersThisLine = Math.min(charactersPerLine, charactersLeft);
                      let strToRender = label.substring(i, i + charactersThisLine);

                      this.font.draw (
                          renderer,
                          strToRender, // label
                          this.pos.x,
                          this.pos.y + (currentLineIndex * textMeasure.height));

                      currentLineIndex += 1;
                  }


              }
          });

          // check inheritance with extend
          // https://github.com/melonjs/melonJS/wiki/Upgrade-Guide

          this.LabelText = new myLabel(this.pos.x, this.pos.y, this.width, this.height);

          this.LabelText.pos.set(
              10, // this.width / 2,
              10, // panel border
              this.z
          )
          this.addChild(this.LabelText, 10);

          // input status flags
          this.selected = false;
          this.hover = false;
          // to memorize where we grab the shape
          this.grabOffset = new me.Vector2d(0,0);
      },

      onActivateEvent: function () {
          // call the parent function
          this._super(me.Container, "onActivateEvent");
      },

      onDeactivateEvent: function () {
          // call the parent function
          this._super(me.Container, "onDeactivateEvent");
      },

  });
