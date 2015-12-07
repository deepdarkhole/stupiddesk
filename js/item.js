(function() {
    function Item( img, position )
    {
        this.Container_constructor();
        // Dots DebuggingFFDE00
        this.dotColorActive = "#000000";
        this.dotColor = "#FFDE00";
        this.dotDiameter = 2;
        this.img = img;
        this.position = position;

        if( itemQueue.getResult(img) )
        {
            this.setupWithAnimation();
        }
    }

    var p = createjs.extend( Item, createjs.Container );

    p.setupWithAnimation = function()
    {
        this.setup( this.img , this.position);
        this.alpha = 0;
        createjs.Tween.get(this).to({alpha: 1}, 1000);
    }

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
        this.on( "mousedown", this.handlePressDown );
        this.on( "mouseover", this.handleMouseOver );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOut );

        // Basics
        this.name = img;
        this.tickEnabled = false;
        this.cursor = "pointer";
        this.offset = Math.random() * 10;
        this.count = 0;
        this.pressing = false;
        this.wasMoved = false; 
        this.quickRotated = false;

        // Visual 
        this.bitmap = bitmap;   
        this.addChild( bitmap );
        if(debug)
        {
                        
            this.hitArea = hitArea;
            // show hitbox
            //this.addChild(hitArea);
            // show image name
            var text = new createjs.Text(this.name, "20px Arial", "#FFFFFFF");
            text.x = text.getBounds().width * -0.5;
            text.y = bounds.height * 0.5;
            text.textBaseline = "alphabetic";
            this.addChild( text );
        }else{
            this.hitArea = hitArea;
        }  

        // Set position
        if(position == null)
        {
            var w = stage.canvas.width;
            var h = stage.canvas.height;

            this.x = (w * Math.random()) - (w * 0.5);
            this.y = (h * Math.random()) - (h * 0.5);
            this.setAlignment();
            this.rotation = this.currentRotation = Math.random() * 360;            
        }else{
            this.x = position.x;
            this.y = position.y;
            this.setAlignment();
            this.rotation = this.currentRotation = position.rotation;
        }  

        // Components
        this.itemSnapper = new ItemSnapper( this );
    }

    p.offsetBy = function( x, y, callback )
    {
        var tX = this.x + x;
        var tY = this.y + y;


        console.log(this.x, this.y, tX, tY);

        createjs.Tween.get(this).to({x: tX, y: tY}, 200).call( callback );
    }

    p.getNextRotationValue = function( rotation )
    {
        var stepCount = 4;
        if( rotation % (360/stepCount) != 0 )
        {
            for( var i = 0; i < stepCount; i++ )
            {
                var stepAngle = ( 360 / stepCount ) * (i+1);
                if ( rotation >= stepAngle ) continue;

                if ( i == stepCount - 1 ) return 0;
                return stepAngle;
            }
        } else {
            return rotation + 360 /stepCount;
        }
    }

    p.getRoundedNumber = function( number )
    { 
        return Math.round( number / gridSize ) * gridSize; 
    }

    p.handleClick = function( evt )
    {
        if ( this.wasMoved || this.quickRotated) return;


        this.currentRotation = this.getNextRotationValue( this.currentRotation );

        createjs.Tween.get(this).to({rotation: this.currentRotation}, 200, createjs.Ease.backOut);
        knollChanged = true;

    }

    p.handleMouseOver = function( event )
    {
        this.guideDrawer.showGuides();
    }

    p.handlePressDown = function( event )
    {
        this.cursor = "move";

        if( this.currentRotation % (360/4) != 0 )
        {
            this.currentRotation = this.getNextRotationValue( this.currentRotation );
            createjs.Tween.get(this).to({rotation: this.currentRotation}, 200, createjs.Ease.backOut);
            this.quickRotated = true;
        }
    }

    p.handlePressMove = function( event )
    {
        if ( !this.pressing )
        {
            this.offsetX = event.stageX - itemContainer.x - this.x;
            this.offsetY = event.stageY - itemContainer.y - this.y;
            this.wasMoved = false;

            var stagePoint = new Vector( event.stageX - itemContainer.x, event.stageY - itemContainer.y );
            this.guideDrawer.showActiveGuidesByDot( this.closestAlignmentDot );

        } else {
            this.wasMoved = true;            
        }

        var snapOffset = this.itemSnapper.getClosestSnapOffset();

        var testX = event.stageX - itemContainer.x - this.offsetX;
        var testY = event.stageY - itemContainer.y - this.offsetY;

        this.x = testX;
        this.y = testY;

        this.pressing = true;
        this.hovering = false;
        this.parent.setChildIndex( this , this.parent.numChildren-1);

        this.guideDrawer.showGuidesActive();
        knollChanged = true;

    }


    p.handlePressUp = function( event )
    {
        this.pressing = false;
        this.hovering = true;
        this.wasMoved = false;
        this.cursor = "pointer";
        
        this.itemSnapper.clearDebugLines();
        this.guideDrawer.showGuides();
        //this.guideDrawer.hideActiveGuidesByDot( this.closestAlignmentDot );


        this.quickRotated = false;
    }
    

    p.handleRollOver = function( event )
    {
    	if(this.pressing == true)
        {
    		return;
        }

        this.hovering = true;
        this.guideDrawer.showGuides();
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handleRollOut = function( event )
    {
        this.hovering = false;
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

    p.testMouseOver = function ()
    {
        if ( !this.hovering ) return; 
        this.guideDrawer.showGuides( );
    }

    window.Item = createjs.promote( Item, "Container" );

} () );
