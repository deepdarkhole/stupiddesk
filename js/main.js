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
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 30 );

   // window.requestAnimationFrame(tick);

    // Debug
    if(debug)
    {
    	start();
    }else{
    	// Create
    	create( itemData );	
    }

    stage.on( "stagemousemove", function( e ) {
        //console.log( e.stageX, e.stageY );
        for( var i = 0; i < items.length; i++ )
        {
            items[i].testMouseOver( );
            items[i].testMouseOver( );
        }
        
    });

    // Parse
    Parse.initialize("AeLWidTlB5fwyEf5BxDN90MMmSGIF9RpI3WDc8SI", "7IVEuZFFlpO2U6f5p8UF0q8doUX5w1DDS8adOvgQ");

    // Test
    loadFromURL();
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
		var imagesCopy = images.slice();
		var length = Math.floor( Math.random() * ( randomMax - randomMin ) + randomMin );
		
		for( var i = 0 ; i < length; i++)
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
}

function stupid()
{
	cancel();
	removeItems();
	create( null );
}

function cancel()
{
	var confirm = document.getElementById(element_id.confirm);
		confirm.setAttribute("style", "display: none;");

	var header = document.getElementById(element_id.header);
		header.style.visibility = "visible";
}

function confirm()
{
	var confirm = document.getElementById(element_id.confirm);
		confirm.setAttribute("style", "display: block;");


	var header = document.getElementById(element_id.header);
		header.style.visibility = "hidden";
}

function share()
{
	alert("Shared");
}

function tweet()
{
	window.location = "https://twitter.com/intent/tweet?hashtags=deepdarkhole&ref_src=twsrc%5Etfw&text=Tidy%20up%20this%20%23StupidDesk!&tw_p=tweetbutton&url=http%3A%2F%2Fstupiddesk.com";
}

function GET(name){
  var url = window.location.search;
  var num = url.search(name);
  var namel = name.length;
  var frontlength = namel+num+1; //length of everything before the value 
  var front = url.substring(0, frontlength);  
  url = url.replace(front, "");  
  num = url.search("&");

 if(num>=0) return url.substr(0,num); 
 if(num<0)  return url;             
}

function loadFromURL()
{
	var id = window.location.search;//GET("id");
		id = id.substring(1,id.length);
		//id = GET("?");

	if(id == null)
		return;

	console.log("load:" + id);

	//id = "oAEUDaXhPc";

	var LoadObject = Parse.Object.extend("Knoll");
	var query = new Parse.Query(LoadObject);
		query.get(id, {
		  success: function(obj)
		  {
		    // The object was retrieved successfully.		    
		    var data = obj.get("data");

		    //console.log(data);
		    removeItems();
		    create( JSON.parse(data) );
		  },
		  error: function(obj, error)
		  {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		    console.log( error );
		  }
		});
}

function load()
{
	removeItems();
	create( itemData );
}

function save()
{
	//console.log("Save");
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
	var data = JSON.stringify(itemData);
	var SaveObject = Parse.Object.extend("Knoll");
	var saveObject = new SaveObject();
		saveObject.set("data", data)
		saveObject.save(null, {
		  success: function(obj) {	  
		    console.log( obj.id );
		  },
		  error: function(obj, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    console.log('Failed to create new object, with error code: ' + error.message);
		  }
		});

	if(debug)
		console.log(data);
	//alert((JSON.stringify(itemData) ));
}

function removeItems()
{
	if(!itemContainer)
		return;

	items = new Array();
	stage.removeChild( itemContainer );	
}

function tick( event ) {
    
    center();
    updateAnimation();
    stage.update();    

//    window.requestAnimationFrame(tick);
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

function updateAnimation() 
{
    for( var i = 0; i < items.length; i++ )
    {
        items[i].testMouseOver();
    }
}
