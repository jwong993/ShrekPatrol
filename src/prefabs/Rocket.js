// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.attack = 0;
      this.swapper = 0;
      this.moveSpeed = game.settings.spaceshipSpeed;
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }


    update(){
        // left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >=  borderUISize + this.width){
                this.x -= this.moveSpeed;
            }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }

        }

        //first attack
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.attack = 0;
            this.sfxRocket.play(); // play sfx
        }

        //second attack
        if(Phaser.Input.Keyboard.JustDown(keyD) && !this.isFiring){
            this.setTexture('shronic');
            this.isFiring = true;
            this.attack = 1;
            this.sfxRocket.play(); // play sfx
        }

        
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            if(this.attack == 0){    
                this.y -= this.moveSpeed;
            }else if(this.attack == 1 && this.swapper < 25){
                this.y -=this.moveSpeed;
                this.x -= this.moveSpeed;
                this.swapper++;
            }else if(this.attack == 1 && this.swapper >= 25){
                this.y -=this.moveSpeed;
                this.x += this.moveSpeed;
                this.swapper++;
                if( this.swapper > 50){
                    this.swapper = 0;
                    
                }
            }else{
                this.y -=this.moveSpeed;
            }
        }
        


        // reset on miss
        if( this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding*2.5;
            this.setTexture('rocket');


        }
        if(this.x < borderUISize + borderPadding){
            this.x = borderUISize+ borderPadding;
        }
        if(this.x > game.config.width - borderUISize - borderPadding){
            this.x = game.config.width - borderUISize - borderPadding;
        }
        
    }


    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding*2.5;
    }
  }