var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var car1;
var car2;
var barriers = [];

//class to represent bariers
var Barrier = function (x,y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
};


function preload() {
    game.load.image('car1', '../assets/car1.png');
    game.load.image('car2','../assets/spaceship.gif');
    game.load.image('barrier', '../assets/barrier.png');
    game.load.image('map','../assets/racermap.png');
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKey(Phaser.Keyboard.A);

    wasd = {
      w: game.input.keyboard.addKey(Phaser.Keyboard.W),
      s: game.input.keyboard.addKey(Phaser.Keyboard.S),
      a: game.input.keyboard.addKey(Phaser.Keyboard.A),
      d: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
}

function create() { 
    //  This creates the scoreboard
    //scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });//
    //highScoreText = game.add.text(200, 16, 'High Score: ' + highScore, { fontSize: '32px', //fill: '#fff' });


    //  Our player ship
    map = game.add.sprite(0,0, 'map');
    car1 = game.add.sprite(400, 400, 'car1');
    car2 = game.add.sprite(400, 390, 'car2');
    car1.anchor.set(0.5);
    car2.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(car1, Phaser.Physics.ARCADE);
    game.physics.enable(car2, Phaser.Physics.ARCADE);
 
    car1.body.drag.set(100);
    car2.body.drag.set(100);
    car1.body.maxVelocity.set(200);
    car2.body.maxVelocity.set(200);
    //  This is the collision rule
    game.world.setBounds(0, 0, 800, 600);
    car1.body.collideWorldBounds = false;
    car2.body.collideWorldBounds = false;
    car1.body.setCircle(15);
    car2.body.setCircle(15);
    car1.scale.setTo(2, 2);
    car2.scale.setTo(2, 2);
    


    makeBarriers();
    
    // bullets
    //bullets = game.add.group();
    //bullets.enableBody = true;
    //bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //
    //bullets.createMultiple(50, 'bullet');
    //bullets.setAll('checkWorldBounds', true);
    //bullets.setAll('outOfBoundsKill', true);
    
    //reset score
    //score = 0;
}

function update() {
    move();
    checkBarriersCollision();
    console.log ( "Y:" + game.input.mousePointer.y);

console.log ( "X:" + game.input.mousePointer.x);

} // end update()

function move() {
    if (cursors.up.isDown)  // isDown means key was pressed
    {
        game.physics.arcade.accelerationFromRotation(car1.rotation, 80, car1.body.acceleration);
    }
    else if (cursors.down.isDown)
    {   
        game.physics.arcade.accelerationFromRotation(car1.rotation, -80, car1.body.acceleration); 
    }
    else 
    {
        car1.body.acceleration.set(0);
    }
    
    if (cursors.left.isDown)
    {
        car1.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        car1.body.angularVelocity = 300;
    }
    else
    {
        car1.body.angularVelocity = 0;
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
     if (wasd.w.isDown)  // isDown means key was pressed
    {
        game.physics.arcade.accelerationFromRotation(car2.rotation, 80, car2.body.acceleration);
    }
    else if (wasd.s.isDown)
    {   
        game.physics.arcade.accelerationFromRotation(car2.rotation, -80, car2.body.acceleration); 
    }
    else 
    {
        car2.body.acceleration.set(0);
    }
    
    if (wasd.a.isDown)
    {
        car2.body.angularVelocity = -300;
    }
    else if (wasd.d.isDown)
    {
        car2.body.angularVelocity = 300;
    }
    else
    {
        car2.body.angularVelocity = 0;
    }
}

//function to check barriers and cars
function checkBarriersCollision() {
    barriers.forEach(function(a){
        //checkWorldPosition(a);
        var collided = game.physics.arcade.collide(car1, a);
        if (collided) {
            console.log("collision!");
        }
        collided = game.physics.arcade.collide(car2, a);
        if (collided) {
            console.log("collision!");
        }
    });
}


function makeBarriers() {
    
    const BARRIER_LOCATIONS = [
        [0, 0],
        [0,30],
        [0,60],
        [0,90],
        [0,120],
        [0,150],
        [0,180],
        [0,210],
        [0,240],
        [0,270],
        [0,300],
        [0,330],
        [0,360],
        [0,390],
        [0,420],
        [0,450],
        [0,480],
        [0,510],
        [0,540],
        [0,570],
        [0,600],
        [0,630],
        [0,660],
        [0,690],
        [0,720],
        [0,750],
        [0,780],
        [30,0],
        [60,0],
        [90,0],
        [80,0],
        [120,0],
        [150,0],
        [180,0],
        [210,0],
        [240,0],
        [270,0],
        [300,0],
        [330,0],
        [360,0],
        [390,0],
        [420,0],
        [450,0],
        [480,0],
        [510,0],
        [540,0],
        [570,0],
        [600,0],
        [590,0],
        [590,30],
        [590,60],
        [590,90],
        [590,120],
        [590,150],
        [590,180],
        [590,210],
        [590,240],
        [590,270],
        [590,300],
        [590,330],
        [590,360],
        [590,390],
        [590,420],
        [590,450],
        [590,480],
        [590,510],
        [590,540],
        [590,570],
        [590,600],
        [590,630],
        [590,660],
        [590,690],
        [590,720],
        [590,750],
        [590,780],
        [770,30],
        [770,60],
        [770,90],
        [770,120],
        [770,150],
        [770,180],
        [770,210],
        [770,240],
        [770,270],
        [770,300],
        [770,330],
        [770,360],
        [770,390],
        [770,420],
        [770,450],
        [770,480],
        [770,510],
        [770,540],
        [770,570],
        [770,580],
        [590,385],
        [560,385],
        [530,385],
        [500,385],
        [470,385],
        [440,385],
        [410,385],
        [400,385]
                              ];
    
    for (var i = 0; i < BARRIER_LOCATIONS.length; i++) {
        
        var barrier = game.add.sprite(BARRIER_LOCATIONS[i][1], BARRIER_LOCATIONS[i][0], 'barrier'); 
    
        //barrier.width = ;
        
        //  and its physics settings
        game.physics.enable(barrier, Phaser.Physics.ARCADE);
        
        barrier.body.moves = false;
        
        //  This is the collision rule
       barrier.body.setCircle(10);
       
       barriers.push(barrier);
    }
}

// function that gives us random ...
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
