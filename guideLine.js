function GuideLine( item, startVector, endVector )
{
    this.startVector = startVector;
    this.endVector = endVector;

    this.setup = function() {
        this.line = new createjs.Shape();
        this.show();
        item.addChild( this.line );
    }

    this.hide = function() {
        this.line.graphics.clear(); 
    }

    this.show = function() {
        this.line.graphics.setStrokeStyle( 1 ).beginStroke( item.dotColor ).moveTo( startVector.x, startVector.y ).lineTo( endVector.x, endVector.y ).endStroke();
    }

    this.setup();
}
