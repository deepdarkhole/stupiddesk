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

    // Sizing
    this.x = function() {
        return this.bitmap.x;
    }

    this.y = function() {
        return this.bitmap.y;
    }

    this.scaleFactor = item.scaleFactor;
    
    this.height = function() {
        return this.bitmap.getBounds().height * this.scaleFactor;
    }

    this.width = function() {
        return this.bitmap.getBounds().width * this.scaleFactor;
    }

    // Orientation
    this.isHorizontal = function() {
        return this.item.rotation == 90 || this.item.rotation == 270; 
    }

    this.isVertical = function() {
        return this.item.rotation == 0 || this.item.rotation == 180; 
    }
    
    this.topLeft = function() {
        var x = this.x - (this.width * .5);
        var y = this.y - (this.height * .5);

        return new Vector( x, y );
    }

    this.middleCenter = function() {
        var x = this.x;
        var y = this.y;

        return new Vector( x, y );
    }
}

