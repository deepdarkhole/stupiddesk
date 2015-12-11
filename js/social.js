function exportCanvas()
{

 	var canvas = document.getElementById( element_id.canvas );
    var bitmap = new createjs.Bitmap( canvas );
    
    bitmap.cache( 0, 0, canvas.width, canvas.height, 1 );
    var base64 = bitmap.getCacheDataURL();    

    return base64;
}

function share()
{
	var button = document.getElementById("share_button");
		button.setAttribute("disabled", "disabled");// = "false";


	centerKnoll( function(){
		if( knollChanged || last_id == null )
			save( showShare );
		else
			showShare( last_id );

	} );

	ga('send', {
	  hitType: 'event',
	  eventCategory: 'action',
	  eventAction: 'done'
	});
}

function showShare( id )
{

	last_id = id;

	knollChanged = false;


	hide( element_id.header );
	show( element_id.share );
	
	var modal = document.getElementById(element_id.share);
		input = modal.getElementsByTagName("INPUT")[0];
		input.value = "http://stupiddesk.com/?" + id;
		input.select();	
	

	var img = document.getElementById(element_id.share_img);
		img.setAttribute("style", "background-image: url('" + exportCanvas() +"')" );

}

function tweet()
{
	var modal = document.getElementById(element_id.share);
		input = modal.getElementsByTagName("INPUT")[0];

	var text = "My%20%23StupidDesk%20brings%20all%20the%20boys%20to%20the%20yard%0AAnd%20they%27re%20like%2C%20it%27s%20better%20than%20yours%2E%0A";

	window.open("https://twitter.com/intent/tweet?hashtags=deepdarkhole&ref_src=twsrc%5Etfw&text=" + text + "&tw_p=tweetbutton&url=" + escape(input.value) , '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;;

	ga('send', {
	  hitType: 'social',
	  socialNetwork: 'twitter',
	  socialAction: 'tweet',
	  socialTarget: 'http://stupiddesk.com'
	});
}


function facebook()
{
	var modal = document.getElementById(element_id.share);
		input = modal.getElementsByTagName("INPUT")[0];

	ga('send', {
	  hitType: 'social',
	  socialNetwork: 'facebook',
	  socialAction: 'share',
	  socialTarget: 'http://stupiddesk.com'
	});

	window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(input.value)+"&t="+"STOOPIDDESK", '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
}
