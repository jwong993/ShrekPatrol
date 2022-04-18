class Play extends Phaser.Scene{

    constructor(){
        super("playScene");
    }
    
    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('donkey', './assets/donkey.png');
        this.load.image('shronic', './assets/shronic.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        this.load.image('starfield', './assets/starfield.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }


    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship',0,30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0,20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship2(this, game.config.width, borderUISize*6 + borderPadding*6, 'spaceship2', 0, 40).setOrigin(0,0);


        // castle BG
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x005101).setOrigin(0,0);

        // Green Borders
        this.add.rectangle(0,0,game.config.width, borderUISize, 0x007401).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width ,borderUISize, 0x007401).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, game.config.height, 0x007401).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x007401).setOrigin(0,0);

        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding*2.5, 'rocket').setOrigin(0.5, 0);
        if(game.settings.players == 2){
            this.p2Rocket = new Donkey(this, game.config.width/3*2, game.config.height - borderUISize - borderPadding*2.5, 'donkey').setOrigin(0.5, 0);
        }
        

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    
    
        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end: 9, first: 0}),
            frameRate:30
    
        });



        //initialize score
        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5 ,
                bottom: 5,
            },
            fixedWidth: 100

        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding *2, this.p1Score, scoreConfig);


        


        //GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;

        }, null, this);


        //time left
        //this.timedEvent = this.time.delayedCall(3000, onEvent, [], this);;
        this.timeStart = game.settings.gameTimer/1000;
        this.timeLeft = this.add.text(game.config.width - borderUISize - borderPadding*12, borderUISize + borderPadding *2, this.timeStart, scoreConfig);
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.secondTick, callbackScope: this, loop: true })

        this.ship = 0;
    }

    update(){
        //pointer cursor
        pointer = this.input.activePointer;

        //this.timeLeft = this.add.text(game.config.width - borderUISize - borderPadding*12, borderUISize + borderPadding *2, this.clock.getProgress().toString().substr(0,4), scoreConfig);
        this.timeLeft.text = this.timeStart;

        //restart game if R is pressed
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -=4;

        if(!this.gameOver){
            this.p1Rocket.update();
            //if 2 players is selected
            if(game.settings.players == 2){
                this.p2Rocket.update();
            }
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }

        //if 2 players is selected
        if(game.settings.players == 2){
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if(this.checkCollision(this.p2Rocket, this.ship04)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship04);
            }
        }
        

    }

    checkCollision(rocket,ship){
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
        }else{
            return false;
        }


    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;

        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
                boom.destroy();
        });

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
    
    
    secondTick(){
        this.timeStart--;
    }

}


