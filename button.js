(function() {
    function Button( label, color, img ) {
        this.Container_constructor();

        this.label = label;
        this.color = color;


        this.setup( img );
    }

    var p = createjs.extend( Button, createjs.Container );

    p.setup = function( img ) {
        var maxSpeed = 0;
        this.xSpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.ySpeed = -maxSpeed + Math.random() * maxSpeed * 2;

        var w = stage.canvas.width;
        var h = stage.canvas.height;

        this.x = (w * Math.random()) - (w * 0.5);
        this.y = (h * Math.random()) - (h * 0.5);

        this.tickEnabled = false;

        // Bitmap
        var bitmap = new createjs.Bitmap("./imgs/items/" + img);
        var bounds = bitmap.getBounds();
        this.scaleFactor = .7;
        bitmap.scaleX *= this.scaleFactor;
        bitmap.scaleY *= this.scaleFactor;

        bitmap.x = -bounds.width * .5 * this.scaleFactor;
        bitmap.y = -bounds.height * .5 * this.scaleFactor;

        this.bitmap = bitmap;
        this.addChild( bitmap );

        // add shadow
        var shadowSize = 5;
        bitmap.shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 2, 2, shadowSize); //"#c5c2bb"
        bitmap.scaleX = bitmap.scaleY = this.scaleFactor;

        var hit = new createjs.Shape();

        this.resize();

        this.on( "click", this.handleClick );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOver );

        this.cursor = "pointer";

        this.offset = Math.random() * 10;
        this.count = 0;
        this.pressing = false;
        this.wasMoved = false;    
    }

    p.getNextRotationValue = function( rotation ) {
        var stepCount = 4;
        for( var i = 0; i < stepCount; i++ )
        {
            var stepAngle = ( 360 / stepCount ) * (i+1);
            if ( rotation >= stepAngle ) continue;

            if ( i == stepCount - 1 ) return 0;
            return stepAngle;
        }
    }

    p.getRoundedNumber = function( number ) { 
        return Math.round( number / gridSize ) * gridSize; 
    }

    p.handleClick = function( evt ) {
        if ( this.wasMoved ) return;
        this.rotation = this.getNextRotationValue( this.rotation );
    }

    p.handlePressMove = function( event ) {
        if ( !this.wasPressed )
        {
            this.offsetX = event.stageX - this.x;
            this.offsetY = event.stageY - this.y;
            this.wasPressed = true;
            this.wasMoved = false;
        } else {
            this.wasMoved = true;            
        }

        var testX = event.stageX - this.offsetX;
        var testY = event.stageY - this.offsetY;
        
        this.x = this.getRoundedNumber( testX );
        this.y = this.getRoundedNumber( testY );

        this.pressing = true;
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handlePressUp = function( event ) {
        this.wasPressed = false;
        this.pressing = false;
        this.wasMoved = false;
    }

    p.handleRollOver = function( event ) {
    	if(this.pressing == true)
    		return;
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.resize = function( event ) {
        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        
    }

    p.setAlignment = function () {
        // Alignment
        this.alignment = new Alignment( this );

        var dotColor = "#99FF00";
        var diameter = 2;
        var offset = diameter * .5;

        for( var i = 0; i < this.alignment.allAlignments.length; i++ )
        {
            var aVector = this.alignment.allAlignments[i];

            // Create dots.
            var dot= new createjs.Shape();
            dot.graphics.beginFill( dotColor ).drawCircle( aVector.x - offset, aVector.y - offset, diameter );
            this.addChild( dot );
        }
    }

    window.Button = createjs.promote( Button, "Container" );

} () );
