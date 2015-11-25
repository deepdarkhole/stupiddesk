var AlignmentPoint = {   "TopLeft":0, 
                    "TopCenter":1,
                    "TopRight":2,
                    "MiddleLeft":3,
                    "MiddleCenter":4,
                    "MiddleRight":5,
                    "BottomLeft":6,
                    "BottomCenter":7,
                    "BottomRight":8 }

Object.freeze( Alignment );

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
}

//Alignment.prototype = {
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

    scaleFactor : {
        get : function() {
            return this.item.scaleFactor;
        }
    },
    
    height : {
        get : function() {
            return this.bitmap.getBounds().height * this.scaleFactor;
        }
    },

    width : { 
        get : function() {
            return this.bitmap.getBounds().width * this.scaleFactor;
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
    
    topLeft : {
        get : function() {
            var x = - (this.width * .5);
            var y = - (this.height * .5);
            var vector = new Vector( x, y );
            return vector;
        }
    }, 

    topCenter : {
        get : function() {
            var x = 0;
            var y = - (this.height * .5);
            var vector = new Vector( x, y );
            return vector;
        }
    }, 

    topRight : {
        get : function() {
            var x = (this.width * .5);
            var y = - (this.height * .5);
            var vector = new Vector( x, y );
            return vector;
        }
    }, 

    middleLeft : {
        get : function() {
            var x = - ( this.width * .5 );
            var y = 0;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    middleCenter : {
        get : function() {
            var x = 0;
            var y = 0;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    middleRight : {
        get : function() {
            var x = ( this.width * .5 );
            var y = 0;
            var vector = new Vector( x, y );
            return vector;
        }
    },

    bottomLeft : {
        get : function() {
            var x = - ( this.width * .5 );
            var y = ( this.height * .5 );
            var vector = new Vector( x, y );
            return vector;
        }
    },

    bottomCenter : {
        get : function() {
            var x = 0;
            var y = (this.height * .5 );
            var vector = new Vector( x, y );
            return vector;
        }
    },
    
    bottomRight : {
        get : function() {
            var x = ( this.width * .5 );
            var y = ( this.height * .5 );
            var vector = new Vector( x, y );
            return vector;
        }
    }
});

