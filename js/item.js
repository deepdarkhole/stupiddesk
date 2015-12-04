(function() {
    function Item( img, position )
    {
        this.Container_constructor();
        // Dots Debugging
        this.dotColor = "#99FF00";
        this.dotDiameter = 2;
        this.setup( img , position);
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
            this.hitArea = hitArea;
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

        // Set position
        if(position == null)
        {
            var w = stage.canvas.width;
            var h = stage.canvas.height;

            this.x = (w * Math.random()) - (w * 0.5);
            this.y = (h * Math.random()) - (h * 0.5);
            this.setAlignment();
            this.rotation = Math.random() * 360;            
        }else{
            this.x = position.x;
            this.y = position.y;
            this.setAlignment();
            this.rotation = position.rotation;
        }  

        // Components
        this.itemSnapper = new ItemSnapper( this );
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
            this.closestAlignmentDot = this.itemSnapper.getClosestAlignmentDotToPoint( stagePoint );
            this.guideDrawer.showActiveGuidesByDot( this.closestAlignmentDot );

        } else {
            this.wasMoved = true;            
        }

        var snapOffset = this.itemSnapper.handleProximitySnapping( this.closestAlignmentDot );
        this.offsetX -= snapOffset.x;
        this.offsetY -= snapOffset.y;

        var testX = event.stageX - itemContainer.x - this.offsetX;
        var testY = event.stageY - itemContainer.y - this.offsetY;

        this.x = testX;
        this.y = testY;

        this.pressing = true;
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handlePressUp = function( event )
    {
        this.pressing = false;
        this.wasMoved = false;

        this.itemSnapper.clearDebugLines();
        this.guideDrawer.hideActiveGuidesByDot( this.closestAlignmentDot );
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
