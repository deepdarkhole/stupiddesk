function GuideDrawer( item ) {

    this.item = item; 

    this.setup = function() {
        this.drawGuides();
    }

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

    this.hideGuides = function() {
        for( var i = 0; i < this.guides.length; i++ )
        {
            this.guides[i].hide();
        }
    }

    this.showGuides = function() {
        for( var i = 0; i < this.guides.length; i++ )
        {
            this.guides[i].show();
        }
    }


    this.setup();
}

function Guideline( item, startVector, endVector )
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
