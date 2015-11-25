function GuideDrawer( item ) {

    this.item = item; 

    this.setup = function() {
        this.drawDots();
        this.drawGuides();
    }

    this.drawDots = function() {
        var offset = this.item.dotDiameter * .5;

        this.dots = new Array();
        
        var horizontals = this.item.alignment.horizontalAlignmentPoints;
        var verticals = this.item.alignment.verticalAlignmentPoints;

        for( var h = 0; h < horizontals.length; h++ )
        {
            for( var v = 0; v < verticals.length; v++ )
            {
                var hAlignmentPoint = horizontals[h];
                var vAlignmentPoint = verticals[v];

                var dot = new GuideDot( this.item, hAlignmentPoint, vAlignmentPoint );
                this.dots.push( dot );
            }
        }
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
            var guideLine = new GuideLine( this.item, starts[i], ends[i] );
            this.guides.push( guideLine );
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
