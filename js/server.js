function GET(name)
{
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

	if(id == "")
		return false;

	//console.log("load:" + id);

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

			var intro_cancel = document.getElementById( element_id.intro_cancel);
			intro_cancel.setAttribute("style", "display: inline-block");
					    
		    create( JSON.parse(data) );
		  },
		  error: function(obj, error)
		  {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		    console.log( error );
		    create( itemData );
		  }
		});

	return true;
}

function load()
{
	removeItems();
	create( itemData );
}

function save( callback )
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
		    callback( obj.id );
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
