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

        var guideDotReferences = new Array( 6, 7, 8,
                                            3, 4, 5,
                                            0, 1, 2,
                                            6, 3, 0,
                                            7, 4, 1,
                                            8, 5, 2 )

        // Draw Guides.
        var guideIndex = 0;
        for( var i = 0; i < starts.length; i++ )
        {
            var guideLine = new GuideLine( this.item, starts[i], ends[i] );
            this.guides.push( guideLine );

            for( var j = 0; j < 3; j++ )
            {
                guideLine.addGuideDot( this.dots[ guideDotReferences[ guideIndex ] ] );
                guideIndex++;
            }
        }
    }

    this.hideActiveGuidesByDot = function( closestDot ) {
        if ( closestDot != null )
        {
            closestDot.show( this.item.dotColor );
        }

        this.hideGuides();
    }

    this.hideGuides = function() {
        for( var i = 0; i < this.guides.length; i++ )
        {
            this.guides[i].hide();
        }
    }

    this.showActiveGuidesByDot = function( closestDot ) {
        if ( closestDot != null ) 
        {
            closestDot.show( "red" );
        }

        this.showGuides( closestDot );
    }

    this.showGuides = function( dot ) {
        for( var i = 0; i < this.guides.length; i++ )
        {
            var guideColor = this.item.dotColor;
            if ( this.guides[i].containsDot( dot ) )
            {
                guideColor = "red";
            }

            this.guides[i].show( guideColor );
        }
    }


    this.setup();
}
