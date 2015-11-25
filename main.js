var stage;
var items;
var itemPositions;
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

    // Get Stupid
    stupid();
}

function start()
{
	var intro = document.getElementById(element_id.intro);
		intro.parentNode.removeChild(intro);

	var header = document.getElementById(element_id.header);
		header.style.visibility = "visible";

	stupid();
}

function create( positions )
{

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
	console.log("Save Knoll");
	console.log(items.children.length);
	itemPositions = new Array();
	for( var i = 0; i < items.children.length; i++)
	{
		var item = items.children[i];

		var position = {
			x: item.x,
			y: item.y,
			img: item.name
		}
		itemPositions[i] = position;
	}
	console.log(itemPositions);
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
        var color = randomColor();
        var item = new Item( i, color, images[i] );
        myItems.push( item );
        item.setAlignment();
        item.rotation = Math.random() * 360;
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
