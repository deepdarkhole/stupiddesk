function initStage()
{
	// Setup Stage
    stage = new createjs.Stage( element_id.canvas );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
	stage.update();	
}

function create( data )
{
	itemContainer = new createjs.Container();
	itemContainer.x = itemContainer.y = 0;

	items = new Array();	

	//didn't simplify state, because this will run faster and we're client-side
	if(data == null)
	{
		for(var i = 0; i< defaultImages.length; i++)
		{
			var item = new Item( defaultImages[i], null );
			items.push( item );  		
    		itemContainer.addChild( item );	
    		//console.log(item.name);
		}

		var imagesCopy = images.slice();
		var length = Math.floor( Math.random() * ( randomMax - randomMin ) + randomMin );

		if(useAllImages)
			length = imagesCopy.length;

		for( var i = 0; i < length; i++)
		{
			var j = Math.floor( Math.random() * imagesCopy.length );

			var item = new Item( imagesCopy[j], null );
			items.push( item );  		
    		itemContainer.addChild( item );	

    		imagesCopy.splice(j,1);
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

    knollChanged = false;
}

function centerKnoll( callback )
{
	var bounds = itemContainer.getBounds();

	cX = bounds.x + bounds.width/2;
	cY = bounds.y + bounds.height/2;

	tX = 0;
	tY = 0;

	//console.log( bounds );
	//console.log( tX - cX, tY - cY );

	var counter = items.length;

	for( var i = 0; i < items.length; i++ )
	{
		var item = items[i];
		item.offsetBy( tX - cX, tY - cY, function(){
			counter--;
			if( counter == 0 )
				callback();
		} );
	}

}

function stupid()
{
	cancel();
	removeItems();
	create( null );
	last_id = null;

	ga('send', {
	  hitType: 'event',
	  eventCategory: 'action',
	  eventAction: 'stupid'
	});
}

function center()
{
	if(!itemContainer)
		return;

	itemContainer.x = window.innerWidth * 0.5;
	itemContainer.y = window.innerHeight * 0.5;
}

function resize()
{
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var units = 30;
    var xGridSize = stage.canvas.height / units;
    var yGridSize = stage.canvas.width / units;

    gridSize = ( xGridSize < yGridSize ) ? xGridSize : yGridSize;
}


function removeItems()
{
	if(!itemContainer)
		return;

	items = new Array();
	stage.removeChild( itemContainer );	
}



function enableDelete()
{

	document.onkeydown = keyPressed;
}

function keyPressed( event )
{
	if( event.keyCode == 8 )
	{
		for (var i = 0; i < items.length; i++) {
			if( items[i].hovering )
			{
				deleteItem( items[i] );
				break;
			}
		};

		knollChanged = true;
	}



}

function deleteItem( item )
{
	if(!itemContainer)
		return;

	itemContainer.removeChild( item );

	for( var i = 0; i < items.length; i++ )
	{
		if( items[i] == item )
		{
			items.splice(i,1);
			break;
		}
	}

}
