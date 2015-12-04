var preload = function()
{
	itemQueue = new createjs.LoadQueue( false );	

	for(var i = 0; i < images.length; i++)
	{
		itemQueue.loadFile({id: images[i], src:imgPath + images[i]});
	}

	itemQueue.on("progress", itemLoadProgress, this);
	itemQueue.on("fileload", itemLoaded, this);
	itemQueue.on("complete", itemsLoaded, this);

	var loading = document.getElementById(element_id.loading);
	var width = window.getComputedStyle( loading ).getPropertyValue("width");
	loading.setAttribute("style", "width: " + width);

	setLoadingText( "0%" );
}

var itemLoadProgress = function( event )
{
	//console.log("Progress:", event.progress);
	var loading = document.getElementById(element_id.loading);
		bar = loading.getElementsByTagName("SPAN")[0];


	percent = event.progress * 100;
	bar.setAttribute("style", "width: " + percent + "%");

	if( event.progress == 1 )
		setLoadingText("Get Stupid");
	else
		setLoadingText( percent.toFixed(0) + "%" );
}

var itemLoaded = function( event )
{
	//console.log("File Loaded");

	// need to hide now

}

var itemsLoaded = function( event )
{
	//console.log("All Loaded");

	init();
}

var setLoadingText = function( t )
{
	var loading = document.getElementById(element_id.loading);
		text = loading.getElementsByTagName("SPAN")[1];

	text.innerHTML = t;
}