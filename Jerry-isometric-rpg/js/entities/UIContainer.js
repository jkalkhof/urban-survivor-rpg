/**
* a UI container
*/

game.UI = game.UI || {};

// a Panel type container
game.UI.Container = me.Container.extend({

    addLabelText : function(label) {
      this.LabelText = new (me.Renderable.extend({
          init: function() {
              this._super(me.Renderable, 'init', [0, 0, 10, 10]);
              this.font = new me.Font("kenpixel", 20, "black");
              this.font.textAlign = "center";
              this.font.textBaseline = "top";
              this.font.bold();
          },
          draw: function(renderer){
              this.font.draw (
                  renderer,
                  label,
                  this.pos.x,
                  this.pos.y);
          }
      }));
      this.LabelText.pos.set(
          this.width / 2,
          16, // panel border
          this.z
      )
      this.addChild(this.LabelText, 10);
    },

    init: function(x, y, width, height, label, containerType) {
        // call the constructor
        this._super(me.Container, "init", [x, y, width, height]);

        this.debugLevel = 0;

        if (this.debugLevel > 0) console.log("UI.Container: ",label);

        this.anchorPoint.set(0, 0);

        // persistent across level change
        this.isPersistent = true;

        // make sure our object is always draw first
        this.z = Infinity;
        //this.z = 5;

        // floating causes conflict with player!
        this.floating = true;
        // this.floating = false;

        // give a name
        this.name = "UIPanel";

        // back panel sprite
        if (containerType == "inventoryPanel") {
          this.panelSprite = new me.Sprite(0, 0, {
                 image: me.loader.getImage('inventory-panel-80x480'),
              }
          );
          // position and scale to fit with the viewport size
          this.panelSprite.anchorPoint.set(0, 0);
          this.addChild(this.panelSprite);

        } else if (containerType == "achievementsPanel") {
          this.panelSprite = new me.Sprite(0, 0, {
                 image: me.loader.getImage('achievements-panel-720x60'),
              }
          );
          // position and scale to fit with the viewport size
          this.panelSprite.anchorPoint.set(0, 0);
          this.addChild(this.panelSprite);

        } else if (containerType == "dialoguePanel") {
          this.panelSprite = new me.Sprite(0, 0, {
                 image: me.loader.getImage('dialogue-panel-800x120'),
              }
          );
          // position and scale to fit with the viewport size
          this.panelSprite.anchorPoint.set(0, 0);
          this.addChild(this.panelSprite);

        } else {

          this.panelSprite = game.texture.createSpriteFromName("grey_panel");
          this.panelSprite.anchorPoint.set(0, 0);

          // scale to match the container size
          this.panelSprite.scale(
              this.width / this.panelSprite.width,
              this.height / this.panelSprite.height
          );

          this.addChild(this.panelSprite);
        }


        // Panel Label
        if ((label != null) && (label.length > 0)) {
          this.addLabelText(label);
        }

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

    // update function
    update : function(dt) {
        return this._super(me.Container, "update", [ dt ]) || this.hover;
    }
});
