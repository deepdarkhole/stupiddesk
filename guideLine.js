function GuideLine( item, startVector, endVector )
{
    this.item = item;
    this.startVector = startVector;
    this.endVector = endVector;
    this.guideDots = new Array();

    this.setup = function() {
        this.line = new createjs.Shape();
        this.show();
        this.item.addChild( this.line );
    }

    this.addGuideDot = function( dot ) {
        this.guideDots.push( dot );
    }

    this.containsDot = function( dot ) {
        for( var i = 0; i < this.guideDots.length; i++ )
        {
            if ( this.guideDots[i] === dot ) return true;
        }

        return false;
    }

    this.hide = function() {
        this.line.graphics.clear(); 
    }

    this.show = function( color ) {
        if ( color == null ) color = this.item.dotColor;
        this.line.graphics.setStrokeStyle( 1 ).beginStroke( color ).moveTo( startVector.x, startVector.y ).lineTo( endVector.x, endVector.y ).endStroke();
    }

    this.setup();
}
