var stage;
var myButtons;
var grid;
var gridSize;

window.addEventListener( 'resize', resize, false );

function init() {

    stage = new createjs.Stage( "demoCanvas" );
    resize();

    createjs.Touch.enable(stage);
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;

    var back = new createjs.Shape();
    stage.addChild( back );
    back.x = 0;
    back.y = 0;
    back.graphics.beginFill( "#ece9e2" ).rect( 0, 0, stage.canvas.width, stage.canvas.height );

    // Grid Initialization
    grid = new Grid( 25, 25 );
    grid.drawGrid();

    // Button Initialization();
    var buttonCount = 24;
    myButtons = new Array();
    for( var i = 0; i < buttonCount; i++ )
    {
        var color = randomColor();
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
    stage.update();
}

function resize() {
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var units = 30;
    var xGridSize = stage.canvas.height / units;
    var yGridSize = stage.canvas.width / units;

    gridSize = ( xGridSize < yGridSize ) ? xGridSize : yGridSize;

    if ( myButtons == null || myButtons.length <= 0 ) return;
    for( var i = 0; i < myButtons.length; i++ )
    {
        myButtons[i].resize();
    }
    
    if ( grid == null ) return;
    var x = stage.canvas.width * .5;
    var y = stage.canvas.height * .5;
    grid.resizeGrid( x, y );
    grid.drawGrid();
}

