(function() {
    function Button( label, color, img ) {
        this.Container_constructor();

        this.label = label;
        this.color = color;
        var maxSpeed = 0;
        this.xSpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.ySpeed = -maxSpeed + Math.random() * maxSpeed * 2;

        var w = stage.canvas.width;
        var h = stage.canvas.height;

        this.x = (w * Math.random()) - (w * 0.5);
        this.y = (h * Math.random()) - (h * 0.5);

        this.tickEnabled = false;
        this.setup( img );
        this.pressing = false;
        this.wasMoved = false;
    }

    var p = createjs.extend( Button, createjs.Container );

    p.setup = function( img ) {

        var sizeArray = new Array( 1, 3, 5, 7, 9 );
        this.widthIncrement  = sizeArray[ Math.floor( Math.random() * sizeArray.length ) ];
        this.heightIncrement = sizeArray[ Math.floor( Math.random() * sizeArray.length ) ];

        var bitmap = new createjs.Bitmap("./imgs/items/" + img);
        var bounds = bitmap.getBounds();

        var scaleFactor = .5;
        bitmap.scaleX *= scaleFactor;
        bitmap.scaleY *= scaleFactor;

        bitmap.x = -bounds.width * .5 * scaleFactor;
        bitmap.y = -bounds.height * .5 * scaleFactor;

        // add shadow
        var shadowSize = 5;
        bitmap.shadow = new createjs.Shadow("#c5c2bb", 3, 3, shadowSize);

        this.addChild( bitmap );

        var hit = new createjs.Shape();

        this.background = new createjs.Shape();
        this.background.alpha = 0.1;

        this.resize();

        this.on( "click", this.handleClick );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOver );

        this.cursor = "pointer";

        this.offset = Math.random() * 10;
        this.count = 0;
        this.wasPressed = false;
        this.wasMoved = false;    
    }

    p.getNextRotationValue = function( rotation ) {
        var stepCount = 4;
        for( var i = 0; i < stepCount; i++ )
        {
            var stepAngle = ( 360 / stepCount ) * (i+1);
            console.log( "Testing step angle: " + stepAngle );
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
    	
        this.background.graphics.clear();

        var width = this.widthIncrement * gridSize;
        var height = this.heightIncrement * gridSize;
        
        this.background.graphics.beginFill( this.color ).drawRoundRect( 0, 0, width, height, 5 );

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        
    }

    window.Button = createjs.promote( Button, "Container" );
} () );
