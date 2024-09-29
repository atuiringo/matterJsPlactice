// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var jumpScale = -0.15;

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
console.log(boxA);
boxA.gravityScale = 2.5;

var boxB = Bodies.rectangle(450, 50, 80, 80);
var boxC = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });



// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, boxC, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

let inputKey;
let moveVelocityX;
let moveX = 0;
let moveSpeed = 7;

document.addEventListener('keydown', event => {
    // 変数eventの中身はKeyboardEventオブジェクト
    inputKey = event.code;

    if (inputKey == "KeyA") {
        moveX = -1;
    } else if (inputKey == "KeyD") {

        moveX = 1;
    } else if (inputKey == "Space") {

        Body.applyForce(boxA, { x: boxA.position.x, y: boxA.position.y }, { x: 0, y: jumpScale });
    } else {
        moveX = 0;
    }
});

document.addEventListener('keyup', event => {
    // 変数eventの中身はKeyboardEventオブジェクト
    inputKey = event.code;

    if (inputKey == "KeyA") {
        moveX = 0;
    } else if (inputKey == "KeyD") {

        moveX = 0;
    } else if (inputKey == "Space") {

        // Body.applyForce(boxA, { x: boxA.position.x, y: boxA.position.y }, { x: 0, y: -0.2 });
    }
});

function update() {
    moveVelocityX = moveX * moveSpeed;
    Body.setVelocity(boxA, Matter.Vector.create(moveVelocityX, Body.getVelocity(boxA).y));

    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);