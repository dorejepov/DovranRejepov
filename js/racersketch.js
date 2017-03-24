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
    game.load.image('car1', '../assets/spaceship.gif');
    game.load.image('car2','../assets/spaceship.gif');
    game.load.image('barrier', '../assets/spaceship.gif');
    game.load.image('map','../assets/NewPiskel2.png');
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
                                [90, 10],
                                [70, 10],
                                [50, 10],
                                [39, 29],
                                [10, 50],
                                [10, 70],
                                [10, 90],
                                [10, 110],
                                [10, 130],
                                [10, 150],
                                [10, 170],
                                [10, 190],
                                [10, 210],
                                [10, 230],
                                [10, 250],
                                [10, 270],
                                [10, 290],
                                [10, 310],
                                [560, 24]
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
