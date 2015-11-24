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
        bitmap.x = -bounds.width * .5;
        bitmap.y = -bounds.height * .5;

        // add shadow
        var shadowSize = 5;
        bitmap.shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 2, 2, shadowSize); //"#c5c2bb"
        bitmap.shadow.a = 0;
        bitmap.scaleX = bitmap.scaleY = .7;

        this.addChild( bitmap );

        var hit = new createjs.Shape();
        //hit.graphics.beginFill("#fff").drawRect( bitmap.sourceRect );
        //bitmap.hitArea = hit;
		// need to make a larger hit area than the bitmpa

        this.background = new createjs.Shape();
        this.background.alpha = 0.1;
        //this.addChild( this.background );

        this.resize();

        this.on( "click", this.handleClick );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOver );

        this.cursor = "pointer";

        //this.mouseChildren = false;

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
        //this.alpha = event.type == "rollover" ? 0.4 : 1 ; 
        // put image above other images
        //this.parent.setChildIndex(this, this.parent.numChildren-1)
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.resize = function( event ) {
    	
        this.background.graphics.clear();

        var width = this.widthIncrement * gridSize;
        var height = this.heightIncrement * gridSize;
        
        //this.background.graphics.beginFill( this.color ).drawRoundRect( -width * .5, -height * .5, width, height, 5 );
        this.background.graphics.beginFill( this.color ).drawRoundRect( 0, 0, width, height, 5 );

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        
    }

    window.Button = createjs.promote( Button, "Container" );
} () );
