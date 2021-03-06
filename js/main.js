function init()
{

	if( allowDelete )
		enableDelete();

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

    // Parse
    // Parse.initialize("AeLWidTlB5fwyEf5BxDN90MMmSGIF9RpI3WDc8SI", "7IVEuZFFlpO2U6f5p8UF0q8doUX5w1DDS8adOvgQ");

	// Firebase
	var firebaseConfig = {
		apiKey: "AIzaSyC9f6uP-frG31Sl6Z7-Y_bnnStpqs6Lio0",
		authDomain: "stupid-desk.firebaseapp.com",
		databaseURL: "https://stupid-desk.firebaseio.com",
		projectId: "stupid-desk",
		storageBucket: "stupid-desk.appspot.com",
		messagingSenderId: "148909270117"
	  };
	firebase.initializeApp(firebaseConfig);

	var database = firebase.database();

	window.database = firebase.database();

    // Debug
    if(debug)
    {
    	start();
    }else{
		// Create
		if(loadFromURL() == false)
    		create( itemData );	
    }
}

function enableStart()
{
	var intro = document.getElementById(element_id.intro);
	var	buttons = intro.getElementsByTagName("BUTTON");

	for( var i = 0; i < buttons.length; i++)
	{
		var button = buttons[i];
		var attr = button.getAttributeNode("disabled");
		if(attr)
			button.removeAttributeNode(attr);
	} 
}

function start()
{
	hide( element_id.intro );
	show( element_id.header );
	stupid();

	updateAudio();
}

function view()
{
	updateAudio();
	cancel();
}

function hide(id)
{
	var element = document.getElementById(id);
		element.style.visibility = "hidden";
}

function show(id)
{
	var element = document.getElementById(id);
		element.style.visibility = "visible";
}

function cancel()
{
	hide( element_id.confirm );
	hide( element_id.share );
	hide( element_id.intro );
	hide( element_id.about );

	show( element_id.header );

	var button = document.getElementById("share_button");
		attr = button.getAttributeNode("disabled");// = "false";
		if( attr )
			button.removeAttributeNode(attr);  
}

function confirm()
{
	if( !knollChanged )
	{
		stupid();
		return;
	}	

	show( element_id.confirm );
	hide( element_id.header );
}

function about()
{
	show( element_id.about );
	hide( element_id.header );

	ga('send', {
	  hitType: 'event',
	  eventCategory: 'action',
	  eventAction: 'about'
	});
}

function tick( event ) {
    
    center();
    updateAnimation();
    stage.update();    

//    window.requestAnimationFrame(tick);
}

function updateAnimation() 
{
	if( items == null )
		return;
	
    for( var i = 0; i < items.length; i++ )
    {
        items[i].animateGuides();
    }
}



