var preload = function()
{
	itemQueue = new createjs.LoadQueue(false);	

	for(var i = 0; i < images.length; i++)
	{
		itemQueue.loadFile({id: images[i], src:imgPath + images[i]});
	}

	//itemQueue.on("progress", itemLoadProgress, this);
	itemQueue.on("fileload", itemLoaded, this);
	itemQueue.on("complete", itemsLoaded, this);
}

var itemLoadProgress = function( event )
{
	//console.log("Progress:", itemQueue.progress, event.progress);
}

var itemLoaded = function( event )
{
	//console.log("File Loaded");
}

var itemsLoaded = function( event )
{
	//console.log("All Loaded");
	init();
}