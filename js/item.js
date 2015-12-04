(function() {
    function Item( img, position )
    {
        this.Container_constructor();
        // Dots Debugging
        this.dotColor = "#99FF00";
        this.dotDiameter = 2;

        this.setup( img , position);
        this.setAlignment();
    }

    var p = createjs.extend( Item, createjs.Container );

    p.setup = function( img, position )
    {
       // Bitmap        
        var bitmap = new createjs.Bitmap( itemQueue.getResult(img) );   //var bitmap = new createjs.Bitmap(imgPath + img);
        var bounds = bitmap.getBounds();
        var hitArea = new createjs.Shape();
        var hitAreaGraphics = hitArea.graphics;

        bitmap.scaleX *= itemScaleFactor;
        bitmap.scaleY *= itemScaleFactor;

        if(bounds)
        {
            bitmap.x = -bounds.width * .5 * itemScaleFactor;
            bitmap.y = -bounds.height * .5 * itemScaleFactor;
            var halfPadding = itemHitboxPadding * .5;
            hitAreaGraphics.beginFill("rgba(0,0,0,0.2)").drawRect(bitmap.x - halfPadding, bitmap.y - halfPadding, bounds.width * itemScaleFactor + itemHitboxPadding, bounds.height * itemScaleFactor + itemHitboxPadding).endFill();
        }

        // Dynamic Shadow
        var shadowSize = 5;
        bitmap.shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 2, 2, shadowSize); //"#c5c2bb"
        bitmap.scaleX = bitmap.scaleY = itemScaleFactor;

        // Set position
        if(position == null)
        {
            var w = stage.canvas.width;
            var h = stage.canvas.height;

            this.x = (w * Math.random()) - (w * 0.5);
            this.y = (h * Math.random()) - (h * 0.5);
            this.rotation = Math.random() * 360;            
        }else{
            this.x = position.x;
            this.y = position.y;
            this.rotation = position.rotation;            
        }   

        // Event Listeners 
        this.on( "click", this.handleClick );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOut );

        // Visual 
        this.bitmap = bitmap;   
        this.addChild( bitmap );
        if(debug)
        {
            this.addChild(hitArea);            
        }else{
            this.hitArea = hitArea;
        }          

        // Basics
        this.name = img;
        this.tickEnabled = false;
        this.cursor = "pointer";
        this.offset = Math.random() * 10;
        this.count = 0;
        this.pressing = false;
        this.wasMoved = false; 

        //console.log("x:" + this.x +" y:" + this.y);

        // Debugging
        this.hAlignLine = new createjs.Shape();
        this.vAlignLine = new createjs.Shape();
        this.addChild( this.hAlignLine );
        this.addChild( this.vAlignLine );
    }

    p.clearDebugLines = function()
    {
        this.hAlignLine.graphics.clear();
        this.vAlignLine.graphics.clear();
    }

    p.getClosestAlignmentDotToPoint = function( point )
    {
        var aPoints = this.alignment.allAlignments;
        var itemPosition = new Vector( this.x, this.y );

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
        
        var closestIndex = this.alignment.getClosestIndexByRotation( closestIndex, this.rotation );
        return this.guideDrawer.dots[closestIndex];
    }

    p.getClosestAlignmentPoint = function()
    {
        var closestDistance;
        var closestVector;

        for( var i = 0; i < this.alignment.allAlignments.length; i++ )
        {
            var alignmentVector = this.alignment.allAlignments[i];
        }
    }

    p.getNextRotationValue = function( rotation )
    {
        var stepCount = 4;
        for( var i = 0; i < stepCount; i++ )
        {
            var stepAngle = ( 360 / stepCount ) * (i+1);
            if ( rotation >= stepAngle ) continue;

            if ( i == stepCount - 1 ) return 0;
            return stepAngle;
        }
    }

    p.getRoundedNumber = function( number )
    { 
        return Math.round( number / gridSize ) * gridSize; 
    }

    p.handleClick = function( evt )
    {
        if ( this.wasMoved ) return;
        this.rotation = this.getNextRotationValue( this.rotation );
    }

    p.handlePressMove = function( event )
    {
        if ( !this.pressing )
        {
            this.offsetX = event.stageX - itemContainer.x - this.x;
            this.offsetY = event.stageY - itemContainer.y - this.y;
            this.wasMoved = false;

            var stagePoint = new Vector( event.stageX - itemContainer.x, event.stageY - itemContainer.y );
            this.closestAlignmentDot = this.getClosestAlignmentDotToPoint( stagePoint );
            this.guideDrawer.showActiveGuidesByDot( this.closestAlignmentDot );

        } else {
            this.wasMoved = true;            
        }

        var snapOffset = this.handleProximitySnapping( this.closestAlignmentDot );

        var testX = event.stageX - itemContainer.x - this.offsetX;
        var testY = event.stageY - itemContainer.y - this.offsetY;

        this.x = ( snapOffset.x != 0 ) ? snapOffset.x - itemContainer.x : testX;
        this.y = ( snapOffset.y != 0 ) ? snapOffset.y - itemContainer.y : testY;

        this.x = testX + snapOffset.x;
        this.y = testY + snapOffset.y;

        // Restore debug.
        this.x = testX;
        this.y = testY;

        this.pressing = true;
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handlePressUp = function( event )
    {
        this.pressing = false;
        this.wasMoved = false;

        this.clearDebugLines();
        this.guideDrawer.hideActiveGuidesByDot( this.closestAlignmentDot );
    }
    
    p.handleProximitySnapping = function( dot ) 
    {
        var horizontalCheck = dot.horizontalAlignmentPoint;     // y val
        var verticalCheck = dot.verticalAlignmentPoint;         // x val
        var pointToCheck = dot.dot.localToGlobal( 0, 0 );

        var snapThreshold = 10;
        var offset = new Vector( 0, 0 );
        var snap = new Vector( 0, 0 );

        var closestHorizontalItem;
        var closestVerticalItem;

        for( var i = 0; i < items.length; i++ )
        {
            var item = items[i];
            if ( item == this ) continue;
            
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
            var horizontalItemPos = closestHorizontalItem.localToLocal( 0, 0, this );
            var test = this.globalToLocal( 0, global.y );
            this.hAlignLine.graphics.setStrokeStyle( 1 ).beginStroke( "red" ).moveTo( dot.dot.x, dot.dot.y ).lineTo( horizontalItemPos.x, dot.dot.y ).endStroke();
        } 

        if ( closestVerticalItem != null )
        {
            var verticalItemPos = closestVerticalItem.localToLocal( 0, 0, this );
            var test = this.globalToLocal( global.x, 0 );
            this.vAlignLine.graphics.setStrokeStyle( 1 ).beginStroke( "red" ).moveTo( dot.dot.x, dot.dot.y ).lineTo( dot.dot.x, verticalItemPos.y ).endStroke();
        }
        
        return offset;
    }

    p.handleRollOver = function( event )
    {
    	if(this.pressing == true)
    		return;

        this.guideDrawer.showGuides();
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handleRollOut = function( event )
    {
        this.guideDrawer.hideGuides();
    }

    p.setAlignment = function ()
    {
        // Alignment
        this.alignment = new Alignment( this );

        // Guides
        this.guideDrawer = new GuideDrawer( this );
        this.guideDrawer.hideGuides();
    }

    window.Item = createjs.promote( Item, "Container" );

} () );
