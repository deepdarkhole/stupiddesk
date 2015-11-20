(function() {
    function Button( label, color ) {
        this.Container_constructor();

        this.label = label;
        this.color = color;
        var maxSpeed = 0;
        this.xSpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.ySpeed = -maxSpeed + Math.random() * maxSpeed * 2;

        this.x = Math.random() * stage.canvas.width;
        this.y = Math.random() * stage.canvas.height;

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

    p.handlePressMove = function( event ) {
        if ( !this.wasPressed )
        {
            this.offsetX = event.stageX - this.x;
            this.offsetY = event.stageY - this.y;
            this.wasPressed = true;
        }

        var testX = event.stageX - this.offsetX;
        var testY = event.stageY - this.offsetY;
        
        var snapPos = grid.GetClosestGridPositionToPoint( testX, testY );
        this.x = snapPos.x;
        this.y = snapPos.y;
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
var grid;

window.addEventListener( 'resize', resize, false );

function init() {

    stage = new createjs.Stage( "demoCanvas" );
    resize();

    stage.enableMouseOver();
    stage.mouseMoveOutside = true;

    var back = new createjs.Shape();
    stage.addChild( back );
    back.x = 0;
    back.y = 0;
    back.graphics.beginFill( "#191970" ).rect( 0, 0, stage.canvas.width, stage.canvas.height );

    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild( circle );

    // Grid Initialization
    grid = new Grid( 21, 21 );
    grid.drawGrid();

    // Button Initialization();
    var buttonCount = 10;
    myButtons = new Array();
    for( var i = 0; i < buttonCount; i++ )
    {
        var color = randomColor({
                        luminosity: 'light',
                        hue: 'monochrome'
                    });
        var button = new Button( i, color );
        myButtons.push( button );
        stage.addChild( button );
    }
    

    stage.update();
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 60 );
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
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    if ( grid == null ) return;
    var x = stage.canvas.width * .5;
    var y = stage.canvas.height * .5;
    grid.resizeGrid( x, y );
    grid.drawGrid();
}

