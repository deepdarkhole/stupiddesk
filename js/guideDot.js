function GuideDot( item, horizontalAlignmentPoint, verticalAlignmentPoint )
{
    this.item = item;
    this.horizontalAlignmentPoint = horizontalAlignmentPoint;
    this.verticalAlignmentPoint = verticalAlignmentPoint;

    this.setup = function() {
        this.dot = new createjs.Shape();
        var xVal = this.item.alignment.getValueFromAlignmentPoint( verticalAlignmentPoint );
        var yVal = this.item.alignment.getValueFromAlignmentPoint( horizontalAlignmentPoint );

        this.dot.x = xVal;
        this.dot.y = yVal;
        //this.dot.graphics.beginFill( this.item.dotColor ).drawCircle( 0, 0, this.item.dotDiameter );

        this.show();

        this.item.addChild( this.dot );
    }

    this.hide = function() {
        //this.dot.graphics.clear(); 
    }

    this.show = function( color ) {
        this.hide();
        if ( color == null ) color = this.item.dotColor;
        //this.dot.graphics.beginFill( color ).drawCircle( 0, 0, this.item.dotDiameter );
    }

    this.setup();
}
