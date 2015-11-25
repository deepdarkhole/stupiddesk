function GuideDrawer( item ) {

    this.item = item; 

    this.setup = function() {
        this.drawDots();
        this.drawGuides();
    }

    this.drawDots = function() {
        var offset = this.item.dotDiameter * .5;

        this.dots = new Array();
        
        for( var i = 0; i < this.item.alignment.allAlignments.length; i++ )
        {
            var aVector = this.item.alignment.allAlignments[i];

            // Create dots.
            var dot = new createjs.Shape();
            dot.x = aVector.x;// + offset;
            dot.y = aVector.y;// + offset;
            dot.graphics.beginFill( this.item.dotColor ).drawCircle( 0, 0, this.item.dotDiameter );
            this.item.addChild( dot );
            this.dots.push( dot );
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
