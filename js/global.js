var debug = false;
var stage;
var itemContainer;
var items;
//var itemData = [{"img":"kraft notepaper.png","x":-56,"y":-117,"rotation":0},{"img":"sketch book.png","x":-313,"y":-108,"rotation":0},{"img":"old book.png","x":-301,"y":214,"rotation":180},{"img":"spatula.png","x":94,"y":239,"rotation":0},{"img":"black notepaper.png","x":186,"y":-175,"rotation":0}];
var itemData = [{"img":"old clock.png","x":483.2037563584745,"y":40.07522344146855,"rotation":28.395620388910174},{"img":"old lighter.png","x":-65.5505667894613,"y":-634.1888129590079,"rotation":11.498988037928939},{"img":"ring.png","x":148.2131100324914,"y":-497.76993235736154,"rotation":163.24599486775696},{"img":"kraft notepaper.png","x":-489.7142992808949,"y":-192.11100418982096,"rotation":0},{"img":"brush.png","x":-316.0549948932603,"y":-219.90092500066385,"rotation":0},{"img":"color pen-1.png","x":-199.40980210830458,"y":-243.73582829651423,"rotation":180},{"img":"wood cubes.png","x":-560.0402355873957,"y":58.6219722724054,"rotation":180},{"img":"eraser.png","x":-317.60281000938267,"y":-48.70433822902851,"rotation":90},{"img":"sharpener.png","x":-386.1718471632339,"y":7.7141828902531415,"rotation":0},{"img":"clamp.png","x":-323.1428604510147,"y":13.838609041878954,"rotation":180},{"img":"glass.png","x":-389.46842885692604,"y":103.95554944453761,"rotation":90},{"img":"old clamp.png","x":-210.92377154668793,"y":152.93742016283795,"rotation":0},{"img":"color pen.png","x":-187.67113967658952,"y":-10.823390823788941,"rotation":0},{"img":"sketch book.png","x":6.879155217669904,"y":-180.2591200901661,"rotation":0},{"img":"old book.png","x":456.2961888751015,"y":-440.5912233206909,"rotation":55.622998271137476},{"img":"old small mirror.png","x":-577.2638264303096,"y":180.83915798692033,"rotation":0},{"img":"clamp-1.png","x":-473.25120431091636,"y":215.82203373056836,"rotation":293.36913387291133},{"img":"wood pen.png","x":-255.34390039858408,"y":359.7248560099397,"rotation":216.904273359105},{"img":"spatula.png","x":111.75033987569623,"y":141.21852667676285,"rotation":0},{"img":"black notepaper.png","x":202.5301532689482,"y":-235.44779000803828,"rotation":0}];
var itemQueue;
var itemScaleFactor = .7;
var itemHitboxPadding = 10;
var gridSize;

var randomMin = 11;
var randomMax = 23;


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
"flash.png",
"flower.png",
"glasses 2.png",
"glasses.png",
"green bottle.png",
"green color bottle.png",
"Grouped Blueprints - Vertical.png",
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
"old lighter.png",
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
"sharpener.png",
"Sharpie .png",
"sketch book.png",
"small pairs.png",
"soft pastel.png",
"tablet pen box.png",
"tablet pen.png",
"tablet.png",
"Tape 2.png",
"watercolor.png",
"will.png",
"wood cubes.png",
"wood pen.png",
"yellow bottle .png"
];
