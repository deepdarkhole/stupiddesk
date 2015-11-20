(function() {
    function Grid( xSize, ySize ) {
        this.Container_constructor();
        
        this.xSize = xSize;
        this.ySize = ySize;
        
        this.resizeGrid( stage.canvas.width * .5, stage.canvas.height * .5 );

        this.setup();
    }

    var p = createjs.extend( Grid, createjs.Container );

    p.resizeGrid = function( x, y ) {

        this.x = x;
        this.y = y;

    }

    p.setup = function() {
        /*
        var text = new createjs.Text( this.label, "20px Arial", "#fff" );
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth() + 30;
        var height = text.getMeasuredHeight() + 20;

        text.x = width/2;
        text.y = 10;

        var background = new createjs.Shape();
        background.graphics.beginFill( this.color ).drawRoundRect( 0, 0, width, height, 10 );

        this.addChild( background, text );
        this.on( "click", this.handleClick );
        this.on( "pressdown", this.handlePressDown );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOver );
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random() * 10;
        this.count = 0;
        this.wasPressed = false;
        */
    }

    p.drawGrid = function() {
        return;
        if ( this.lines != null && this.lines.length > 0 ) 
        {
            for( var i = 0; i < this.lines.length; i++ )
            {
                stage.removeChild( this.lines[i] );
            }
        }

        // Reinitialize Array
        this.lines = new Array();

        // Draw Gridlines
        var color = randomColor();
        var xIncrement = stage.canvas.height / this.xSize;
        var yIncrement = stage.canvas.width / this.ySize;

        for( var x = 0; x < this.xSize; x++ )
        {
            var line = new createjs.Shape();
            stage.addChild( line );

            line.graphics.setStrokeStyle( 1 ).beginStroke( color );
            var yVal = this.GetXByIndex( x );
            line.graphics.moveTo( 0, yVal );
            line.graphics.lineTo( stage.canvas.width, yVal );
            line.graphics.endStroke();

            this.lines.push( line );
        }

        for( var y = 0; y < this.ySize; y++ )
        {
            var line = new createjs.Shape();
            stage.addChild( line );

            line.graphics.setStrokeStyle( 1 ).beginStroke( color );
            var xVal = this.GetYByIndex( y );
            line.graphics.moveTo( xVal, 0 );
            line.graphics.lineTo( xVal, stage.canvas.height );
            line.graphics.endStroke();

            this.lines.push( line );
        }
    }

    p.GetCloserPosition = function( test, lower, upper ) {
        var lowTest = Math.abs( lower - test );
        var highTest = Math.abs( upper - test );
        return ( lowTest < highTest ) ? lower : upper ;
    }

    p.GetClosestGridPositionToPoint = function( xPos, yPos ) {
        // x val
        var xVal;
        var lastXVal;
        for( var x = 0; x < this.xSize; x++ )
        {
            xVal = this.GetYByIndex( x );
            if ( xVal < xPos ) 
            {
                lastXVal = xVal;
                continue;
            }

            var closer = this.GetCloserPosition( xPos, lastXVal, xVal );
            xVal = closer;
            break;
        }

        // y val
        var yVal;
        var lastYVal;
        for( var y = 0; y < this.ySize; y++ )
        {
            yVal = this.GetXByIndex( y );
            if ( yVal < yPos ) 
            {
                lastYVal = yVal;
                continue;
            }
            
            var closer = this.GetCloserPosition( yPos, lastYVal, yVal );
            yVal = closer;
            break;
        }

        return new GridPosition( xVal, yVal );
    }

    p.GetXByIndex = function( index ) {
        var xIncrement = stage.canvas.height / this.xSize;
        var offset = xIncrement * .5;
        return offset + (index * xIncrement);
    }

    p.GetYByIndex = function( index ) {
        var yIncrement = stage.canvas.width / this.ySize;
        var offset = yIncrement * .5;
        return offset + (index * yIncrement);
    }

    window.Grid = createjs.promote( Grid, "Container" );
} () );


//(function() {
function GridPosition( x, y ) {
    
    this.x = x;
    this.y = y;
    
}
//} () );
