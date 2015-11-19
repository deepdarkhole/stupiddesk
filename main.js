(function() {
    function Button( label, color ) {
        this.Container_constructor();

        this.label = label;
        this.color = color;
        var maxSpeed = 1000;
        this.xSpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.ySpeed = -maxSpeed + Math.random() * maxSpeed * 2;

        this.setup();
    }

    var p = createjs.extend( Button, createjs.Container );

    p.setup = function() {
        var text = new createjs.Text( this.label, "20px Arial", "#fff" );
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth() + 30;
        var height = text.getMeasuredHeight() + 20;

        text.x = width/2;
        text.y = 10;

        var background = new createjs.Shape();
        background.graphics.beginFill( this.color ).drawRoundRect( 0, 0, width, height, 10 );

        this.addChild( background, text );
        this.on( "click", this.handleClick );
        this.on( "pressdown", this.handlePressDown );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOver );
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random() * 10;
        this.count = 0;
        this.wasPressed = false;
    }

    p.handleClick = function( evt ) {
        console.log( "type: " + evt.type + " target: " + evt.target + " stageX: " + evt.stageX );
    }

    p.handlePressDown = function( event ) {
        this.offsetX = event.stageX - this.x;
        this.offsetY = event.stageY - this.y;
    }

    p.handlePressMove = function( event ) {
        if ( !this.wasPressed )
        {
            console.log( "Press down" );
            this.offsetX = event.stageX - this.x;
            this.offsetY = event.stageY - this.y;
            this.wasPressed = true;
        }

        this.x = event.stageX - this.offsetX;
        this.y = event.stageY - this.offsetY;
    }

    p.handlePressUp = function( event ) {
        this.wasPressed = false;
    }

    p.handleRollOver = function( event ) {
        this.alpha = event.type == "rollover" ? 0.4 : 1 ; 
    }

    p.move = function( deltaTime ) {
        if ( this.wasPressed ) return;

        this.x = this.x + this.xSpeed * deltaTime;
        this.y = this.y + this.ySpeed * deltaTime;
        if ( this.x > stage.canvas.width ) { this.x = 0; };
        if ( this.x < 0 ) { this.x = stage.canvas.width; };
        if ( this.y > stage.canvas.height ) { this.y = 0; };
        if ( this.y < 0 ) { this.y = stage.canvas.height; };
    }

    window.Button = createjs.promote( Button, "Container" );
} () );

var stage;
var myButtons;

window.addEventListener( 'resize', resize, false );
function init() {
    stage = new createjs.Stage( "demoCanvas" );

    // Needed to enable mouseover/mouseout/rollover/rollout events.
    // Parameter is frequency, default is 20.
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;

    //  Other available events are:
    //  click, mousedown, dblclick, pressmove, pressup.

    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild( circle );

    var buttonCount = 1000;
    myButtons = new Array();
    for( var i = 0; i < buttonCount; i++ )
    {
        var color = randomColor({
                        luminosity: 'light',
                        hue: 'red'
                    });
        var button = new Button( i, color );
        myButtons.push( button );
        stage.addChild( button );
    }
    
    stage.update();

    createjs.Ticker.addEventListener( "tick", tick );
    // Setting framerate by interval or framerate
    //createjs.Ticker.setInterval( 25 );
    createjs.Ticker.setFPS( 60 );
    resize();
}

function tick( event ) {
    var deltaTime = event.delta/1000;
    for( var i = 0; i < myButtons.length; i++ )
    {
        myButtons[i].move( deltaTime );
    }
    
    stage.update();
}

function resize() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

