var debug = false;
var allowDelete = true;
var stage;
var itemContainer;
var items;
//var itemData = [{"img":"kraft notepaper.png","x":-56,"y":-117,"rotation":0},{"img":"sketch book.png","x":-313,"y":-108,"rotation":0},{"img":"old book.png","x":-301,"y":214,"rotation":180},{"img":"spatula.png","x":94,"y":239,"rotation":0},{"img":"black notepaper.png","x":186,"y":-175,"rotation":0}];
var itemData = [{"img":"old camera.png","x":-307.82349038124084,"y":-283.8936929570045,"rotation":360},{"img":"greetings philly.png","x":-555.8659694194794,"y":-371.6918951349798,"rotation":360},{"img":"greetings jamestown.png","x":-557.4352353811264,"y":-198.2360661386046,"rotation":360},{"img":"pen-2.png","x":-408.5555098056793,"y":20.407348440261615,"rotation":360},{"img":"brush-4.png","x":-470.11325562000275,"y":34.704021123005134,"rotation":540},{"img":"pen-1.png","x":-537.0677423477173,"y":29.318985465681237,"rotation":360},{"img":"coffee cup.png","x":-290.19663512706757,"y":-26.333848353708106,"rotation":630},{"img":"scotch.png","x":-307.27445936203003,"y":114.67852544668136,"rotation":270},{"img":"Sharpie .png","x":-574.3898581266403,"y":10.011144374264461,"rotation":180},{"img":"pen-3.png","x":-618.2400069236755,"y":14.681676042499078,"rotation":540},{"img":"card front.png","x":-107.03667438030243,"y":453.6380500190426,"rotation":360},{"img":"Kurecolor.png","x":-549.68152821064,"y":225.53721906966535,"rotation":270},{"img":"sharpener.png","x":-605.2222641706467,"y":160.24782524653716,"rotation":180},{"img":"weve travled so far.png","x":-307.2638508081436,"y":297.389646867523,"rotation":360},{"img":"brush-3.png","x":790.0296261310577,"y":297.3238792826888,"rotation":990},{"img":"brush-5.png","x":783.1545991897583,"y":320.4551221078728,"rotation":270},{"img":"brush-2.png","x":789.12353515625,"y":351.89765748730866,"rotation":270},{"img":"needle.png","x":-561.0738360881805,"y":467.76916158641694,"rotation":450},{"img":"pen-5.png","x":-499.7154893875122,"y":40.82144797756342,"rotation":360},{"img":"pen.png","x":-439.5964037179947,"y":34.998011909658146,"rotation":360},{"img":"tablet pen.png","x":-660.0056692361832,"y":26.503606342943442,"rotation":180},{"img":"will.png","x":160.93582570552826,"y":410.29152604541747,"rotation":360},{"img":"colours.png","x":839.3380006551743,"y":436.35547231952665,"rotation":810},{"img":"Ruler 3.png","x":605.3904868364334,"y":-136.05606101057487,"rotation":360},{"img":"playing arts 2.png","x":-616.311735868454,"y":345.63160378043546,"rotation":1080},{"img":"glasses 2.png","x":-334.0382717847824,"y":474.7211431006436,"rotation":90},{"img":"playing arts.png","x":-484.052583694458,"y":345.88418261264457,"rotation":1080},{"img":"Grouped Blueprints - Vertical.png","x":-810.8380006551743,"y":-31.254791912855524,"rotation":90},{"img":"Ruler 5.png","x":603.3752324581146,"y":-198.86807172955008,"rotation":360},{"img":"mouse.png","x":534.4224979877472,"y":104.90548168332322,"rotation":360},{"img":"earphones.png","x":768.7042535543442,"y":54.08095560292719,"rotation":360},{"img":"pen cup 3.png","x":771.3598158359528,"y":-410.2211431006435,"rotation":540},{"img":"stupid desk.png","x":681.4977208375931,"y":448.9271711262409,"rotation":1080},{"img":"black notepaper.png","x":78.27281665802002,"y":-258.22214496112423,"rotation":360},{"img":"field notes.png","x":264.26347386837006,"y":-224.10311500704842,"rotation":360},{"img":"color tube box.png","x":492.2217961549759,"y":399.03256131918175,"rotation":540},{"img":"cxutting mat.png","x":642.1214554309845,"y":90.97600527084438,"rotation":360},{"img":"dain.png","x":283.15479815006256,"y":407.40816385834484,"rotation":360},{"img":"cutter.png","x":875.1637153625488,"y":-247.58515862864436,"rotation":360},{"img":"ruler.png","x":592.1710917949677,"y":-260.5390818428713,"rotation":360},{"img":"ruler-1.png","x":532.4357817173004,"y":-319.70079834642814,"rotation":630},{"img":"old ruler.png","x":523.9580495357513,"y":-374.59236455173226,"rotation":450},{"img":"paperclips.png","x":263.0486990213394,"y":-403.26122224773275,"rotation":450},{"img":"Envelope C6 - Vertical.png","x":-108.38415718078613,"y":-260.59519315999927,"rotation":360},{"img":"andrei.png","x":40.695448875427246,"y":409.73561857384635,"rotation":360},{"img":"laptop.png","x":81.53954303264618,"y":89.044072726043,"rotation":360},{"img":"card back.png","x":-106.02602207660675,"y":350.6251002156642,"rotation":360}];
var itemQueue;
var itemScaleFactor = 1;
var itemHitboxPadding = 10;
var gridSize;

var randomMin = 13;
var randomMax = 30;


var knollChanged = false;
var last_id = null;

var imgPath = "./imgs/items/";
var element_id = {
		intro: "intro",
		header: "header",
		canvas: "canvas",
		content: "content",
		footer: "footer",
		loading: "loading",
		export: "export",
		confirm: "confirm",
		share: "share",
		intro_cancel: "intro_view"
	};
	
var defaultImages = [
"stupid desk.png"
];
var images = [
"andrei.png",
"black notepaper.png",
"box.png",
"brush box.png",
"brush-1.png",
"brush-2.png",
"brush-3.png",
"brush-4.png",
"brush-5.png",
"brush-6.png",
"brush.png",
"business card box.png",
"card back.png",
"card front.png",
"circle pail.png",
"circle pair.png",
"clamp-1.png",
"clamp.png",
"coffee cup.png",
"color pen-1.png",
"color pen.png",
"color tube box.png",
"colours.png",
"compasses.png",
"cutter.png",
"cxutting mat.png",
"dain.png",
"earphones.png",
"Envelope C6 - Vertical.png",
"eraser.png",
"field notes.png",
"flash.png",
"flower.png",
"glasses 2.png",
"glasses.png",
"green bottle.png",
"green color bottle.png",
"greetings jamestown.png",
"greetings philly.png",
"Grouped Blueprints - Vertical.png",
"headphones 2.png",
"keyboard.png",
"kraft notepaper.png",
"Kurecolor.png",
"laptop.png",
"mouse.png",
"needle.png",
"Notebook - Large - 180°.png",
"old book.png",
"Old Box-1.png",
"old box-2.png",
"old box.png",
"old camera.png",
"old clamp.png",
"old clock.png",
"old ruler.png",
"old small mirror.png",
"orange bottle.png",
"paperclips.png",
"pen box.png",
"pen cup 3.png",
"pen holder.png",
"pen-1.png",
"pen-2.png",
"pen-3.png",
"pen-4.png",
"pen-5.png",
"pen.png",
"Plant 2 - Cactus - Top.png",
"playing arts 2.png",
"playing arts.png",
"ring.png",
"Ruler 3.png",
"Ruler 5.png",
"ruler-1.png",
"ruler.png",
"scotch.png",
"sharpener.png",
"Sharpie .png",
"sketch book.png",
"small pairs.png",
"soft pastel.png",
"tablet pen box.png",
"tablet pen.png",
"tablet.png",
"Tape 2.png",
"wallet.png",
"watercolor.png",
"weve travled so far.png",
"will.png",
"wood cubes.png",
"wood pen.png",
"yellow bottle .png"
];
