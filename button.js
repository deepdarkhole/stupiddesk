(function() {
    function Button( label, color, img ) {
        this.Container_constructor();

        this.label = label;
        this.color = color;
        var maxSpeed = 0;
        this.xSpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.ySpeed = -maxSpeed + Math.random() * maxSpeed * 2;

        this.x = Math.random() * stage.canvas.width;
        this.y = Math.random() * stage.canvas.height;

        this.setup( img );
    }

    var p = createjs.extend( Button, createjs.Container );
    var pressing = false;

    p.setup = function( img ) {

        var sizeArray = new Array( 1, 3, 5, 7, 9 );
        this.widthIncrement  = sizeArray[ Math.floor( Math.random() * sizeArray.length ) ];
        this.heightIncrement = sizeArray[ Math.floor( Math.random() * sizeArray.length ) ];

        var bitmap = new createjs.Bitmap("./imgs/" + img);
        //bitmap.mouseEnabled = false;

        // add shadow
        var shadowSize = 5;
        bitmap.shadow = new createjs.Shadow("#c5c2bb", 3, 3, shadowSize);

        bitmap.scaleX = bitmap.scaleY = .5;
        this.addChild( bitmap );

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

        
 		
    }

    p.getRoundedNumber = function( number ) { 
        return Math.round( number / gridSize ) * gridSize; 
    }

    p.handleClick = function( evt ) {
        console.log( "type: " + evt.type + " target: " + evt.target + " stageX: " + evt.stageX );
    }

    p.handlePressMove = function( event ) {
        if ( !this.wasPressed )
        {
            this.offsetX = event.stageX - this.x;
            this.offsetY = event.stageY - this.y;
            this.wasPressed = true;
        }

        var testX = event.stageX - this.offsetX;
        var testY = event.stageY - this.offsetY;
        
        this.x = this.getRoundedNumber( testX );
        this.y = this.getRoundedNumber( testY );

        pressing = true;
    }

    p.handlePressUp = function( event ) {
        this.wasPressed = false;
        pressing = false;
    }

    p.handleRollOver = function( event ) {
    	if(pressing == true)
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


