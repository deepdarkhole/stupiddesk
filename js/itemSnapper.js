function ItemSnapper( item ) {
    
    // Objects
    this.item = item;

    // Debugging
    this.hAlignLine = new createjs.Shape();
    this.vAlignLine = new createjs.Shape();
    this.item.addChild( this.hAlignLine );
    this.item.addChild( this.vAlignLine );

    this.clearDebugLines = function()
    {
        this.hAlignLine.graphics.clear();
        this.vAlignLine.graphics.clear();
    }

    this.getClosestAlignmentDotToPoint = function( point )
    {
        var aPoints = this.item.alignment.allAlignments;
        var itemPosition = new Vector( item.x, item.y );

        var closestIndex = 0;
        var closestPoint = itemPosition.add( aPoints[closestIndex] );
        var closestDistance = Vector.distance( closestPoint, point );

        for( var i = 0; i < aPoints.length; i++ )
        {
            var position = itemPosition.add( aPoints[i] );
            var distance = Vector.distance( position, point );
            if ( distance < closestDistance )
            {
                closestDistance = distance;
                closestIndex = i;
            }
        }
        
        var closestIndex = this.item.alignment.getClosestIndexByRotation( closestIndex, this.item.rotation );
        return this.item.guideDrawer.dots[closestIndex];
    }

    this.handleProximitySnapping = function( dot ) 
    {
        var horizontalCheck = dot.horizontalAlignmentPoint;     // y val
        var verticalCheck = dot.verticalAlignmentPoint;         // x val
        var pointToCheck = dot.dot.localToGlobal( 0, 0 );

        var snapThreshold = 5;
        var offset = new Vector( 0, 0 );
        var snap = new Vector( 0, 0 );

        var closestHorizontalItem;
        var closestVerticalItem;

        for( var i = 0; i < items.length; i++ )
        {
            var item = items[i];
            if ( item == this.item ) continue;
            if ( !item.rotation.isAtRightAngle ) continue;
            
            // Check horizontal alignments.
            var horizontalArray = item.alignment.horizontalAlignmentValues;
            for( var h = 0; h < horizontalArray.length; h++ )
            {
                var global = item.localToGlobal( 0, horizontalArray[h] );
                var diff = global.y - pointToCheck.y;
                var absDiff = Math.abs( diff );
                if ( absDiff < snapThreshold ) 
                {
                    if ( absDiff < offset.y || offset.y == 0 )
                    {
                        offset.y = diff;
                        snap.y = global.y;
                        closestHorizontalItem = item;
                    }
                }
            }

            // Check vertical alignments.
            var verticalArray = item.alignment.verticalAlignmentValues;
            for( var v = 0; v < verticalArray.length; v++ )
            {
                var global = item.localToGlobal( verticalArray[v], 0 );
                var diff = global.x - pointToCheck.x;
                var absDiff = Math.abs( diff );
                if ( absDiff < snapThreshold ) 
                {
                    if ( absDiff < offset.x || offset.x == 0 )
                    {
                        offset.x = diff;
                        snap.x = global.x;
                        closestVerticalItem = item;
                    }
                }
            }
        }

        // Debug Alignment Lines
        this.clearDebugLines();

        if ( closestHorizontalItem != null )
        {
            var horizontalItemPos = closestHorizontalItem.localToLocal( 0, 0, this.item );
            var test = this.item.globalToLocal( 0, global.y );
            this.hAlignLine.graphics.setStrokeStyle( 1 ).beginStroke( "red" ).moveTo( dot.dot.x, dot.dot.y ).lineTo( horizontalItemPos.x, dot.dot.y ).endStroke();
        } 

        if ( closestVerticalItem != null )
        {
            var verticalItemPos = closestVerticalItem.localToLocal( 0, 0, this.item );
            var test = this.item.globalToLocal( global.x, 0 );
            this.vAlignLine.graphics.setStrokeStyle( 1 ).beginStroke( "red" ).moveTo( dot.dot.x, dot.dot.y ).lineTo( dot.dot.x, verticalItemPos.y ).endStroke();
        }
        
        return offset;
    }

}
