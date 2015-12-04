function initStage()
{
	// Setup Stage
    stage = new createjs.Stage( element_id.canvas );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
	stage.update();	
}

function init()
{
	// Stage
	if(stage == null)
		initStage();

    // Resize
    resize();
	window.addEventListener( 'resize', resize, false );

    // Enable Touch
    createjs.Touch.enable(stage);

    // Center
    center();       

    // Update
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 60 );

    // Debug
    if(debug)
    {
    	start();
    }else{
    	// Create
    	enableStart();
    	create( itemData );	
    }

    stage.on( "stagemousemove", function( e ) {
        //console.log( e.stageX, e.stageY );
        
    } );
}

function enableStart()
{
	var intro = document.getElementById(element_id.intro);
		button = intro.getElementsByTagName("BUTTON")[0];
		attr = button.getAttributeNode("disabled");// = "false";
		button.removeAttributeNode(attr);  
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

function exportCanvas()
{
	var header = document.getElementById(element_id.header);
		header.style.visibility = "hidden";

 	var canvas = document.getElementById( element_id.canvas );
    var bitmap = new createjs.Bitmap( canvas );
    
    bitmap.cache( 0, 0, canvas.width, canvas.height, 1 );
    var base64 = bitmap.getCacheDataURL();
    
    print(base64);

    header.style.visibility = "visible";
    //return base64;
}

function create( data )
{
	itemContainer = new createjs.Container();
	itemContainer.x = itemContainer.y = 0;

	items = new Array();	

	//didn't simplify state, because this will run faster and we're client-side
	if(data == null)
	{
		var length = images.length;
		if(debug)
			length = 20;
		for( var i = 0 ; i < length; i++)
		{
			var item = new Item( images[i], null );
			items.push( item );  		
    		itemContainer.addChild( item );	
		}
	}else{
		for( var i = 0 ; i < data.length; i++)
		{
			var item = new Item( data[i].img, data[i] );
			items.push( item );  		
    		itemContainer.addChild( item );
		}		
	}
    stage.addChild(itemContainer);
    center();
    stage.update();
}

function stupid()
{
	removeItems();
	create( null );
}

function share()
{
	alert("Shared");
}

function save()
{
	console.log("Save");
	itemData = new Array();
	for( var i = 0; i < itemContainer.children.length; i++)
	{
		var item = itemContainer.children[i];
		var data = {
			img: item.name,
			x: item.x,
			y: item.y,
			rotation: item.rotation
		}
		itemData[i] = data;
	}
	console.log(JSON.stringify(itemData));
	alert((JSON.stringify(itemData) ));
}

function removeItems()
{
	if(!itemContainer)
		return;

	items = new Array();
	stage.removeChild( itemContainer );	
}

function tick( event ) {
    var deltaTime = event.delta/1000;
    center();
    stage.update();    
}

function center()
{
	if(!itemContainer)
		return;

	itemContainer.x = window.innerWidth * 0.5;
	itemContainer.y = window.innerHeight * 0.5;
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

