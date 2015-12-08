var preload = function()
{
	initStage();
	cacheWidth();
	setLoadingText( "&nbsp;" );

	itemQueue = new createjs.LoadQueue( false );	

	for(var i = 0; i < images.length; i++)
	{
		itemQueue.loadFile({id: images[i], src:imgPath + images[i]});
	}

	itemQueue.on("progress", itemLoadProgress, this);
	itemQueue.on("fileload", itemLoaded, this);
	itemQueue.on("complete", itemsLoaded, this);

	init();
}

var itemLoadProgress = function( event )
{
	//console.log("Progress:", event.progress);
	if(debug)
		return;
	
	var loading = document.getElementById(element_id.loading);
		bar = loading.getElementsByTagName("SPAN")[0];


	percent = Math.max(event.progress, .1) * 100;
	bar.setAttribute("style", "width: " + percent + "%");

	if( event.progress == 1 )
	{
		uncacheWidth();
		setLoadingText('<i class="fa fa-magic"></i> Get Stupid');
		  enableStart();
	}
	else
		setLoadingText( "&nbsp;" );
}

var itemLoaded = function( event )
{
	//console.log("File Loaded");
	//console.log("Loaded: " , event );
	for(var i = 0; i < items.length; i++)
	{
		item = items[i];
		if( item.img == event.item.id )
		{
			item.setupWithAnimation();
		}
	}
	// need to hide now

}

var itemsLoaded = function( event )
{
	//console.log("All Loaded");

	//init();
}

var setLoadingText = function( t )
{
	var loading = document.getElementById(element_id.loading);
		text = loading.getElementsByTagName("SPAN")[1];

	text.innerHTML = t;
}

var cacheWidth = function()
{
	var loading = document.getElementById(element_id.loading);
	var width = window.getComputedStyle( loading ).getPropertyValue("width");
	loading.setAttribute("style", "width: " + width);
}

var uncacheWidth = function()
{
	var loading = document.getElementById(element_id.loading);
	loading.removeAttribute("style");
}