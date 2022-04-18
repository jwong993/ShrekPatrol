class Menu extends Phaser.Scene{

    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/assets_explosion2.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.image('shrek', './assets/shrek.png');

    }

    create(){
        this.shrek = this.add.tileSprite(0,0,640,480, 'shrek').setOrigin(0,0);
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#00FF00',
            color: '#444',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*3 - borderPadding, ' SHREK PATROL ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding, 'P1: Use ← → arrows to move & (F/D) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'P2: Use mouse to move and click to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#007401';
        menuConfig.color = '#FFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig ,).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding, 'Click for simultaneous two-player mode', menuConfig ,).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }


    update(){
        //pointer cursor
        pointer = this.input.activePointer;

        if(pointer.isDown){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 60000,
                players: 2
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 60000,
                players: 1
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 5,
                gameTimer: 45000,
                players: 1
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

    }



}


