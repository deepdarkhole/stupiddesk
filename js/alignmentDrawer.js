function AlignmentDrawer( item ) {
    
    // Objects
    this.item = item;

    // Variables
    this.snapThreshold = 5;
    this.shouldShowLongest = false;

    // Display
    this.alignLines = [];

    this.clearAlignmentLines = function()
    {
        for( var i = this.alignLines.length - 1; i >= 0; i-- )
        {
            this.alignLines[i].graphics.clear();
            this.item.removeChild( this.alignLines[i] );
        }

        this.alignLines = [];
    }
    
    this.drawAlignmentLines = function( allLineArrays ) //dot, closestHorizontalItem, closestVerticalItem )
    {
        var lineColor = "#5298EB";
        var lineToPos = new Vector( 0, 0 );

        var colinearityKeys = Object.keys( allLineArrays );
        for ( var i = 0; i < colinearityKeys.length; i++ )
        {
            var lineArray = allLineArrays[colinearityKeys[i]];

            for( var l = 0; l < lineArray.length; l++ )
            {
                var line = lineArray[l];
                var dot = line.dot.dot;
                var lineDisplay = new createjs.Shape();
                var otherItemPos = line.endItem.localToLocal( 0, 0, this.item );
                var lineToPos;

                if ( line.direction == AlignmentDirection.Left || line.direction == AlignmentDirection.Right )
                {
                    if ( this.item.alignment.isHorizontal )
                    {
                        lineToPos.x = dot.x;
                        lineToPos.y = otherItemPos.y;
                    } else {
                        lineToPos.x = otherItemPos.x;
                        lineToPos.y = dot.y;
                    }
                } else {
                    if ( this.item.alignment.isHorizontal )
                    {
                        lineToPos.x = otherItemPos.x;
                        lineToPos.y = dot.y;
                    } else {
                        lineToPos.x = dot.x;
                        lineToPos.y = otherItemPos.y;
                    }
                }

                lineDisplay.graphics.setStrokeStyle( 1 )
                                .beginStroke( lineColor )
                                .moveTo( dot.x, dot.y )
                                .lineTo( lineToPos.x, lineToPos.y )
                                .endStroke();

                lineDisplay.graphics.setStrokeStyle(1).setStrokeDash(0).beginStroke("white").beginFill(lineColor)
                    .drawCircle( lineToPos.x, lineToPos.y, 4 )
                    .endStroke()
                    .endFill()
                    .beginStroke("white").beginFill(lineColor)
                    .drawCircle( dot.x, dot.y, 4 )
                    .endStroke()
                    .endFill();

                

                this.alignLines.push( lineDisplay );
                this.item.addChild( lineDisplay );
            }
        }
        
        return;
    }
    
    this.getAllAlignmentArrays = function( alignments )
    {
        var alignmentArrays = {};

        for( var i = 0; i < alignments.length; i++ )
        {
           var a = alignments[i];
           if ( alignmentArrays[a.colinearAssignmentKey] == null )
           {
                alignmentArrays[a.colinearAssignmentKey] = []; 
           } 
            alignmentArrays[a.colinearAssignmentKey].push( a );
        }

        return alignmentArrays;
    }

    this.getAllAlignmentLines = function()
    {
        var dots = this.item.guideDrawer.dots;
        var alignmentLines = [];

        for ( var i = 0; i < dots.length; i++ )
        {
            var dotLines = this.getAlignmentLinesForDot( dots[i] );
            alignmentLines.push.apply( alignmentLines, dotLines );
        }

        return alignmentLines;
    }

    this.getAlignmentLinesForDot = function( dot )
    {
        var lineArray = [];
        var pointToCheck = dot.dot.localToGlobal( 0, 0 );
        var line;

        for( var i = 0; i < items.length; i++ )
        {
            var item = items[i];
            if ( item == this.item ) continue;
            if ( item.alignment == null ) console.log( "Why is this item's alignment undefined?" );
            if ( item.alignment == null || !item.alignment.isAtRightAngle ) continue;
            
            // Check horizontal alignments.
            var horizontalArray = item.alignment.horizontalAlignmentValues;
            var verticalArray = item.alignment.verticalAlignmentValues;
            
            for( var h = 0; h < horizontalArray.length; h++ )
            {
                var global = item.localToGlobal( 0, horizontalArray[h] );
                var diff = global.y - pointToCheck.y;
                var absDiff = Math.abs( diff );
                if ( absDiff < this.snapThreshold ) 
                {
                    line = new AlignmentLine( dot, item, pointToCheck, global );
                    lineArray.push( line );
                }
            }

            // Check vertical alignments.
            for( var v = 0; v < verticalArray.length; v++ )
            {
                var global = item.localToGlobal( verticalArray[v], 0 );
                var diff = global.x - pointToCheck.x;
                var absDiff = Math.abs( diff );
                if ( absDiff < this.snapThreshold ) 
                {
                    line = new AlignmentLine( dot, item, pointToCheck, global );
                    lineArray.push( line );
                }
            }
        }
        return lineArray;
    }

    this.handleAlignmentLines = function()
    {
        this.clearAlignmentLines();
    
        // get all alignments, for each alignment, determine direction/plane 
        var alignments = this.getAllAlignmentLines();

        //and sort into colinear arrays
        var alignmentArrays = this.getAllAlignmentArrays( alignments );

        // for each collinear set, choose the longest line and discard the rest
        if ( this.shouldShowLongest ) alignmentArrays = this.selectLongestAlignmentLines( alignmentArrays );

        // display
        this.drawAlignmentLines( alignmentArrays );
    }

    this.selectLongestAlignmentLines = function( alignmentArrays )
    {
        var colinearityKeys = Object.keys( alignmentArrays );
        var longestArrays = {};
        for ( var i = 0; i < colinearityKeys.length; i++ )
        {
            var lineArray = alignmentArrays[colinearityKeys[i]];

            var longestArray = [];
            var longestLine = lineArray[0];
            var longestLength = lineArray[0].length;

            for( var l = 1; l < lineArray.length; l++ )
            {
                if ( lineArray[l].length > longestLength )
                {
                    longestLine = lineArray[l];
                    longestLength = lineArray[l].length;
                }
            }

            longestArray.push( longestLine );
            longestArrays[colinearityKeys[i]] = longestArray;
        }
        return longestArrays;
    }
}

function AlignmentLine( startDot, endItem, startPoint, endPoint ) 
{
    this.dot = startDot;
    this.endItem = endItem;
    this.startPoint = startPoint;
    this.endPoint = new Vector( endPoint.x, endPoint.y );

    this.setup = function()
    {
        this.direction = this.getDirection( startPoint, endPoint );
        this.plane = this.getPlane( this.dot, this.direction );
        this.colinearAssignment = new ColinearAssignment( this.direction, this.plane );
        this.colinearAssignmentKey = this.colinearAssignment.direction + "," + this.colinearAssignment.plane ;

        this.length = Vector.distance( this.endPoint, this.startPoint );
    }

    this.getDirection = function( start, end )
    {
        var startV = new Vector( start.x, start.y );
        var endV = new Vector( end.x, end.y );

        var dir = endV.subtract( startV ).unitRounded();
        var aDirection;

        if ( dir.x == 1 )       aDirection = AlignmentDirection.Right;
        else if ( dir.x == -1 ) aDirection = AlignmentDirection.Left;
        else if ( dir.y == 1 )  aDirection = AlignmentDirection.Up;
        else if ( dir.y == -1 ) aDirection = AlignmentDirection.Down;

        return aDirection;
    }

    this.getPlane = function( dot, direction )
    {
        var isHorizontal = direction == AlignmentDirection.Right || direction == AlignmentDirection.Left ;
        return ( isHorizontal ) ? dot.verticalAlignmentPoint : dot.horizontalAlignmentPoint;
    }

    this.setup();
}

function ColinearAssignment( direction, plane )
{
    this.direction = direction;
    this.plane = plane;
}
