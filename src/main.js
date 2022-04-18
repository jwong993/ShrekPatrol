/*

Johnny Wong
Shrek Patrol
4/18/2022
10+ hours of work


////////////////////////////////////////////////////////////////////////////////////////////////////
////points breakdown         points breakdown         points breakdown          points breakdown////
////////////////////////////////////////////////////////////////////////////////////////////////////

- Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
- Implement a simultaneous two-player mode (30)
- Create and implement a new weapon (w/ new behavior and graphics) (20)
- Implement mouse control for player movement and mouse click to fire (20)
- Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
- Display the time remaining (in seconds) on the screen (10)
- 
- 60 + 30 + 20 + 20 + 20 + 10 = 160 total points


*/

let config = {
    type:Phaser.AUTO,
    width: 640, 
    height: 480,
    scene: [ Menu, Play]
}



let game = new Phaser.Game(config);


let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;


//reserver keyboard vars
let keyF, keyR, keyD, keyLEFT, keyRIGHT, leftClick, pointer;


