function GuideDrawer( item ) {

    this.drawGuides = function() {
        this.guides = new Array();
        var alignment = this.item.alignment;

        var min = alignment.bottomLeft;
        var max = alignment.topRight;
        var starts = new Array( new Vector( min.x, min.y ),
                                new Vector( min.x, 0 ),
                                new Vector( min.x, max.y ),
                                new Vector( min.x, min.y ),
                                new Vector( 0,     min.y ),
                                new Vector( max.x, min.y ) );

        var ends   = new Array( new Vector( max.x, min.y ),
                                new Vector( max.x, 0 ),
                                new Vector( max.x, max.y ),
                                new Vector( min.x, max.y ),
                                new Vector( 0,     max.y ),
                                new Vector( max.x, max.y ) );
                                

        // Draw Horizontal Guides.
        for( var i = 0; i < starts.length; i++ )
        {
            var guideline = new Guideline( this.item, starts[i], ends[i] );
            this.guides.push( guideline );
        }
    }

    this.setup = function() {
        this.drawGuides();
    }

    this.item = item; 
    this.setup();
}

function Guideline( item, startVector, endVector )
{
    var line = new createjs.Shape();
    line.graphics.setStrokeStyle( 1 ).beginStroke( item.dotColor ).moveTo( startVector.x, startVector.y ).lineTo( endVector.x, endVector.y ).endStroke();
    item.addChild( line );
    console.log( "hello?" );
}
