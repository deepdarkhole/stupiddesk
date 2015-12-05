function GuideDrawer( item ) {

    this.item = item; 

    this.setup = function() {
        this.drawDots();
        this.drawGuides();
        this.line = new createjs.Shape();
        this.item.addChild( this.line );
        this.dashOffset = 0;
        this.offsetAdvanceSpeed = .5;
        this.offsetLimit = 100000;
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

        //console.log("min:"+min.x+" max:"+max.x);

        var starts = new Array( new Vector( min.x, min.y ),
                               // new Vector( min.x, 0 ),
                                new Vector( min.x, max.y ),
                                new Vector( min.x, min.y ),
                               // new Vector( 0,     min.y ),
                                new Vector( max.x, min.y ) );

        var ends   = new Array( new Vector( max.x, min.y ),
                                //new Vector( max.x, 0 ),
                                new Vector( max.x, max.y ),
                                new Vector( min.x, max.y ),
                              //  new Vector( 0,     max.y ),
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
        this.line.graphics.clear();

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

    this.showGuides = function( dot ) 
    {
        var alignment = this.item.alignment;

        this.line.graphics.clear();
        this.dashOffset += this.offsetAdvanceSpeed; 
        if ( this.dashOffset > this.offsetLimit ) this.dashOffset = 0;
        var offset = this.dashOffset;

        this.line.graphics.setStrokeStyle( 5, "square" ).setStrokeDash([10,10], offset).beginStroke( this.item.dotColor )
            .rect(-alignment.width/2 - itemHitboxPadding, -alignment.height/2 - itemHitboxPadding, alignment.width + 2*itemHitboxPadding, alignment.height + 2*itemHitboxPadding );


    }

    this.showGuidesActive = function() 
    {
      /*  for( var i = 0; i < this.guides.length; i++ )
        {
            var guideColor = this.item.dotColorActive;
            this.guides[i].hide();
            this.guides[i].show( guideColor );
        }*/

        var alignment = this.item.alignment;

        this.line.graphics.clear();
      //  this.line.graphics.setStrokeStyle( 5, "square" ).beginStroke( this.item.dotColor )
     //       .rect(-alignment.width/2 - itemHitboxPadding, -alignment.height/2 - itemHitboxPadding, alignment.width + 2*itemHitboxPadding, alignment.height + 2*itemHitboxPadding );
    }


    this.setup();
}
