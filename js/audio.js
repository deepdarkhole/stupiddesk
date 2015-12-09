function toggleAudio()
{
	var audioState = readCookie("audio");

	if( audioState == "on" )
	{
		eraseCookie("audio");
		createCookie("audio", "off", 365);
	} else {
		eraseCookie("audio");
		createCookie("audio", "on", 365);
	}
	
	updateAudio();
}

function updateAudio()
{
	var audio = document.getElementById( "bgm" );
	var audioState = readCookie("audio");

	if( audioState == "on" )
	{
		audio.pause();
		document.getElementById("audio_off").setAttribute("style", "display: inline-block");
		document.getElementById("audio_on").setAttribute("style", "display: none");
	} else {
		audio.play();
		document.getElementById("audio_off").setAttribute("style", "display: none");
		document.getElementById("audio_on").setAttribute("style", "display: inline-block");
	}
}
