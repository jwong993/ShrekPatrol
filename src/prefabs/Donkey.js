// Donkey prefab
class Donkey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = game.settings.spaceshipSpeed;
      this.sfxDonkey = scene.sound.add('sfx_rocket');
    }


    update(){
        // left/right movement
        if(!this.isFiring && pointer.worldX >=  borderUISize + this.width && pointer.worldX <=  game.config.width - borderUISize - this.width){
            this.x = pointer.worldX;
            
        }

        //fire button
        if(pointer.isDown && !this.isFiring){
            this.isFiring = true;
            this.sfxDonkey.play(); // play sfx
        }


        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
            
        }



        // reset on miss
        if( this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding*2.5;


        }

        
    }


    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding*2.5;
    }
  }