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
var useAllImages = false;

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
		intro_cancel: "intro_view",
		about: "about",
		share_img: "share_img"
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

var defaultKnoll = [{"img":"pen-3.png","x":-187.77093375029824,"y":252.67749626654137,"rotation":360},{"img":"pen-1.png","x":-112.84929787240219,"y":271.95490512645165,"rotation":360},{"img":"pen-2.png","x":-148.22129068787638,"y":259.95095014319884,"rotation":360},{"img":"will.png","x":-204.97373469205434,"y":-268.3111329249258,"rotation":360},{"img":"Sharpie .png","x":-75.63936194967312,"y":252.03617777741965,"rotation":720},{"img":"stupid desk.png","x":-596.5755098098342,"y":-226.78234208383935,"rotation":360},{"img":"field notes.png","x":25.238873313392446,"y":259.2887590128671,"rotation":360},{"img":"wood cubes.png","x":-610.1793672503251,"y":298.45585841079935,"rotation":360},{"img":"greetings jamestown.png","x":-394.8320616566501,"y":-83.17943139828475,"rotation":360},{"img":"eraser.png","x":-310.8992430968111,"y":206.67665273591996,"rotation":450},{"img":"Ruler 3.png","x":343.6461320120958,"y":62.27427848330433,"rotation":810},{"img":"pen-4.png","x":-221.6709513284294,"y":254.1475415476807,"rotation":360},{"img":"greetings philly.png","x":-395.1975387625158,"y":90.41465266316925,"rotation":360},{"img":"card back.png","x":-436.789536409323,"y":233.60068156152647,"rotation":360},{"img":"card front.png","x":-438.490905427995,"y":345.47872266680577,"rotation":360},{"img":"andrei.png","x":51.92849399002682,"y":-268.02121967643245,"rotation":360},{"img":"Kurecolor.png","x":282.4745061498337,"y":273.61663973414977,"rotation":360},{"img":"pen cup 3.png","x":-397.1196310331727,"y":-277.88605924515946,"rotation":720},{"img":"dain.png","x":-77.34755847799363,"y":-267.8952130687504,"rotation":360},{"img":"Notebook - Large - 180°.png","x":51.68979678122105,"y":-20.42754117518882,"rotation":360},{"img":"black notepaper.png","x":-162.1391572986994,"y":-18.186550843305668,"rotation":360},{"img":"weve travled so far.png","x":-608.0077480402377,"y":-60.936889055368,"rotation":360},{"img":"playing arts.png","x":633.4881861743626,"y":78.77000163755372,"rotation":360},{"img":"cutter.png","x":535.0031280061395,"y":-30.29246757316946,"rotation":540},{"img":"coffee cup.png","x":605.3022522210202,"y":-250.53990365486197,"rotation":630},{"img":"ruler.png","x":403.4152119576264,"y":51.375598038952944,"rotation":450},{"img":"scotch.png","x":452.03401364473564,"y":-251.50993988735797,"rotation":360},{"img":"wallet.png","x":635.5988691506617,"y":244.11760957192428,"rotation":630},{"img":"soft pastel.png","x":175.2668425161529,"y":281.5855206549453,"rotation":270},{"img":"Tape 2.png","x":-611.740771303094,"y":133.1861225986371,"rotation":360},{"img":"Envelope C6 - Vertical.png","x":236.3234315066544,"y":-20.962807275968885,"rotation":360},{"img":"ruler-1.png","x":465.3313413454051,"y":-10.504882826829657,"rotation":360},{"img":"playing arts 2.png","x":631.9042324152377,"y":-85.57825169102227,"rotation":360},{"img":"earphones.png","x":500.8475671335467,"y":250.94537057393495,"rotation":360},{"img":"paperclips.png","x":375.3583316830362,"y":345.70930758860266,"rotation":990},{"img":"pen-5.png","x":-251.25125818042136,"y":283.13363520269127,"rotation":360},{"img":"clamp-1.png","x":-305.65231269720334,"y":324.3795038904742,"rotation":630},{"img":"sharpener.png","x":-298.81605650517974,"y":265.4236516125511,"rotation":360},{"img":"flower.png","x":268.5069819105403,"y":-270.63207270269106,"rotation":990}];
