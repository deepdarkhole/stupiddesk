var AlignmentPoint = {   "Left":0, 
                    "Center":1,
                    "Right":2,
                    "Top":3,
                    "Middle":4,
                    "Bottom":5 }

Object.freeze( AlignmentPoint );

function Alignment( item ) {
    
    // Objects
    this.item = item;
    this.bitmap = item.bitmap;

    this.allAlignments = new Array( this.topLeft,
                                    this.topCenter,
                                    this.topRight,
                                    this.middleLeft,
                                    this.middleCenter,
                                    this.middleRight,
                                    this.bottomLeft,
                                    this.bottomCenter,
                                    this.bottomRight );
    
    this.horizontalAlignmentPoints = new Array( AlignmentPoint.Top,
                                                AlignmentPoint.Middle,
                                                AlignmentPoint.Bottom );

    this.verticalAlignmentPoints = new Array( AlignmentPoint.Left,
                                                AlignmentPoint.Center,
                                                AlignmentPoint.Right );
                                                    
        

    this.getValueFromAlignmentPoint = function( alignmentPoint ) {
        var alignmentValue;
        switch( alignmentPoint )
        {
            case( AlignmentPoint.Left ):
                alignmentValue = this.left;
            break;

            case( AlignmentPoint.Center ):
                alignmentValue = this.center;
            break;

            case( AlignmentPoint.Right ):
                alignmentValue = this.right;
            break;

            case( AlignmentPoint.Top ):
                alignmentValue = this.top;
            break;

            case( AlignmentPoint.Middle ):
                alignmentValue = this.middle;
            break;

            case( AlignmentPoint.Bottom ):
                alignmentValue = this.bottom;
            break;
        }

        return alignmentValue;
    }

    this.getClosestIndexByRotation = function( index, rotation ) {
        var indexArray = new Array( 0, 1, 2, 3, 4, 5, 6, 7, 8 );

        switch( rotation )
        {
            case( 90 ):
                indexArray = new Array( 6, 3, 0, 7, 4, 1, 8, 5, 2 );
            break;

            case( 180 ):
                indexArray = new Array( 8, 7, 6, 5, 4, 3, 2, 1, 0 );
            break;

            case( 270 ):
                indexArray = new Array( 2, 5, 8, 1, 4, 7, 0, 3, 6 );
            break;
        }

        return indexArray[ index ];
    }
}

Object.defineProperties( Alignment.prototype, {
    // Sizing
    x : {
        get : function() {
            return this.bitmap.x;
        }
    },

    y : {
        get : function() {
            return this.bitmap.y;
        }
    },

    height : {
        get : function() {
            var bounds = this.bitmap.getBounds();
            if(bounds)
                return bounds.height * itemScaleFactor;
            return 0;
        }
    },

    width : { 
        get : function() {
            var bounds = this.bitmap.getBounds();
            if(bounds)
                return bounds.width * itemScaleFactor;
            return 0;
        }
    },

    // Orientation
    isHorizontal : {
        get : function() {
            return this.item.rotation == 90 || this.item.rotation == 270; 
        }
    },

    isVertical : {
        get : function() {
            return this.item.rotation == 0 || this.item.rotation == 180; 
        }
    },
    
    // Absolute
    absTop : {
        get : function() {
            return - ( this.height * .5 );
        }
    },

    absBottom : {
        get : function() {
            return ( this.height * .5 );
        }
    },

    absLeft : {
        get : function() {
            return - ( this.width * .5 );
        }
    },

    absRight : {
        get : function() {
            return ( this.width * .5 );
        }
    },

    // Individual
    top : {
        get : function() {
            var value; 
            switch( this.item.rotation )
            {
                case ( 0 ):
                    value = this.absTop;
                break;

                case ( 90 ):
                    value = this.absLeft;
                break;

                case ( 180 ):
                    value = this.absBottom;
                break;

                case ( 270 ):
                    value = this.absRight;
                break;
            }
            return value;
        }
    },

    center : {
        get : function() {
            return 0;
        }
    }, 

    bottom : {
        get : function() {
            var value; 
            switch( this.item.rotation )
            {
                case ( 0 ):
                    value = this.absBottom;
                break;

                case ( 90 ):
                    value = this.absLeft;
                break;

                case ( 180 ):
                    value = this.absTop;
                break;

                case ( 270 ):
                    value = this.absRight;
                break;
            }

            return value;
        }
    },

    left : {
        get : function() {
            var value;
            switch( this.item.rotation )
            {
                case ( 0 ):
                    value = this.absLeft;
                break;

                case ( 90 ):
                    value = this.absTop;
                break;

                case ( 180 ):
                    value = this.absRight;
                break;

                case ( 270 ):
                    value = this.absBottom;
                break;
            }

            return value;
        }
    },

    middle : {
        get : function() {
            return 0;
        }
    },

    right : {
        get : function() {
            var value;
            switch( this.item.rotation )
            {
                case ( 0 ):
                    value = this.absRight;
                break;

                case ( 90 ):
                    value = this.absBottom;
                break;

                case ( 180 ):
                    value = this.absLeft;
                break;

                case ( 270 ):
                    value = this.absTop;
                break;
            }

            return value;
        }
    },

    // combination.
    topLeft : {
        get : function() {
            var x = this.left;
            var y = this.top;
            var vector = new Vector( x, y );
            return vector;
        }
    }, 

    topCenter : {
        get : function() {
            var x = this.center;
            var y = this.top;
            var vector = new Vector( x, y );
            return vector;
        }
    }, 

    topRight : {
        get : function() {
            var x = this.right;
            var y = this.top;
            var vector = new Vector( x, y );
            return vector;
        }
    }, 

    middleLeft : {
        get : function() {
            var x = this.left;
            var y = this.middle;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    middleCenter : {
        get : function() {
            var x = this.center;
            var y = this.middle;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    middleRight : {
        get : function() {
            var x = this.right;
            var y = this.middle;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    bottomLeft : {
        get : function() {
            var x = this.left;
            var y = this.bottom;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    bottomCenter : {
        get : function() {
            var x = this.center;
            var y = this.bottom;
            var vector = new Vector( x, y );
            return vector;
        }
    },
    
    bottomRight : {
        get : function() {
            var x = this.right;
            var y = this.bottom;
            var vector = new Vector( x, y );
            return vector;
        }
    }
});

