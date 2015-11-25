var stage;
var items;
var itemData = [{"img":"kraft notepaper.png","x":-56,"y":-117,"rotation":0},{"img":"sketch book.png","x":-313,"y":-108,"rotation":0},{"img":"old book.png","x":-301,"y":214,"rotation":180},{"img":"spatula.png","x":94,"y":239,"rotation":0},{"img":"black notepaper.png","x":186,"y":-175,"rotation":0}];
var gridSize;
var element_id = {
		intro: "intro",
		header: "header",
		content: "content",
		footer: "footer"
	};
var images = [
	"black notepaper.png",
	"kraft notepaper.png",
	"old book.png",
	"sketch book.png",
	"spatula.png",
	"clamp-1.png",
	"clamp.png",
	"eraser.png",
	"glass.png",
	"old clamp.png",
	"old clock.png",
	"old lighter.png",
	"old small mirror.png",
	"ring.png",
	"sharpener.png",
	"wood cubes.png",
	"wood pen.png",
	"brush.png",
	"color pen-1.png",
	"color pen.png",
	"compasses.png",
	"old ruler.png",
	"pen-1.png",
	"pen-2.png",
	"pen-3.png",
	"pen-4.png",
	"pen-5.png",
	"pen.png",
	"ruler-1.png",
	"ruler.png",
	"soft pastel.png",
	"watercolor.png",
	"brush box.png",
	"brush-1.png",
	"brush-2.png",
	"brush-3.png",
	"brush-4.png",
	"brush-5.png",
	"brush-6.png",
	"color tube box.png",
	"green bottle-1.png",
	"green bottle.png",
	"green color bottle.png",
	"orange bottle.png",
	"small pairs.png",
	"yellow bottle .png",
	"business card box.png",
	"circle pail.png",
	"circle pair.png",
	"Old Box-1.png",
	"old box-2.png",
	"old box.png",
	"tablet pen box.png",
	"tablet.png",
	"box.png",
	"coffee cup.png",
	"earphones.png",
	"flower.png",
	"keyboard.png",
	"laptop.png",
	"lens.png",
	"mouse.png",
	"old camera.png",
	"tablet pen.png",
	"colours.png",
	"flash.png",
	"needle.png",
	"pen box.png",
	"pen holder.png"];

window.addEventListener( 'resize', resize, false );

function init()
{
	// Setup Stage
    stage = new createjs.Stage( "demoCanvas" );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;

    // Resize
    resize();

    // Enable Touch
    createjs.Touch.enable(stage);

    // Center
    center();   

    // Update
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 60 );

    // Create a nice Knoll
    create( itemData );

    // Get Stupid
    //stupid();
}

function start()
{
	var intro = document.getElementById(element_id.intro);
		intro.parentNode.removeChild(intro);

	var header = document.getElementById(element_id.header);
		header.style.visibility = "visible";

	stupid();
}

function load()
{
	removeItems();
	create( itemData );
}

function create( data )
{
	items = new createjs.Container();
	items.x = items.y = 0;	
	for( var i = 0 ; i < data.length; i++)
	{
		var item = new Item( data[i].img, data[i] );
       		item.setAlignment();
        	items.addChild( item );		
	}
    stage.addChild(items);
}

function stupid()
{
	removeItems();
	createItems();
}

function share()
{
	alert("Shared");
}

function save()
{
	console.log("Save");
	itemData = new Array();
	for( var i = 0; i < items.children.length; i++)
	{
		var item = items.children[i];
		var data = {
			img: item.name,
			x: item.x,
			y: item.y,
			rotation: item.rotation
		}
		itemData[i] = data;
	}
	//console.log(itemData);
	//console.trace(itemData);
	console.log(JSON.stringify(itemData));
}

function createItems()
{
	items = new createjs.Container();
	items.x = items.y = 0;
	
    var myItems = new Array();
    var imageCount = images.length;
    imageCount = 5; // Debugging.
    for( var i = 0; i < imageCount; i++ )
    {
        var item = new Item( images[i], null );
        myItems.push( item );
        item.setAlignment();        
        items.addChild( item );
    }

    stage.addChild(items);
}

function removeItems()
{
	if(!items)
		return;

	stage.removeChild( items );	
}

function tick( event ) {
    var deltaTime = event.delta/1000;
    stage.update();
    center();
}

function center()
{
	if(!items)
		return;

	items.x = window.innerWidth * 0.5;
	items.y = window.innerHeight * 0.5;
}

function resize() {
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var units = 30;
    var xGridSize = stage.canvas.height / units;
    var yGridSize = stage.canvas.width / units;

    gridSize = ( xGridSize < yGridSize ) ? xGridSize : yGridSize;
}
