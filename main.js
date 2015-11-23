var stage;
var myButtons;
var gridSize;
var images = ["old_book.png","pencil_noshadow.png","book.png","pencils.png","pencil.png","pen.png"];

window.addEventListener( 'resize', resize, false );

function init() {

    stage = new createjs.Stage( "demoCanvas" );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;

    resize();

    createjs.Touch.enable(stage);

    var back = new createjs.Shape();    
    	back.x = 0;
    	back.y = 0;
    	back.graphics.beginFill( "#f6f3e8" ).rect( 0, 0, stage.canvas.width, stage.canvas.height );

	stage.addChild( back );

    // Button Initialization();
    myButtons = new Array();
    for( var i = 0; i < images.length; i++ )
    {
        var color = randomColor();
        var button = new Button( i, color, images[i] );
        myButtons.push( button );
        stage.addChild( button );
    }
    
    stage.update();

    // Update
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
}

