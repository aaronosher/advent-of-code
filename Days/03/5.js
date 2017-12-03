const input = 361527;
let y = 0;
let x = 0;
let radius = 0;
let direction = 0;

for(let i = 1; i < input;)
{
    i++;
    switch(direction)
    {
        case 0:  // going right
            if(x == 0)// special case to increase radius - passing middle
            {
                radius = radius  + 1;
                x = x + 1;
            } else if(x == radius) {
                direction = 1;
                y = y + 1;
            } else {
                x = x + 1;
            }
            break;
        case 1: // going up
            if(y == radius) {
                direction = 2;
                x = x - 1;
            } else {
                y = y + 1;
            }
            break;
        case 2: // going left
            if(x == -radius)
            {
                direction = 3;
                y = y -1;
            } else {
                x = x - 1;
            }
            break;
        case 3: // going down
            if(y == -radius)
            {
                direction = 0;
                x = x + 1;
            } else {
                y = y - 1;
            }
            break;
    }
    console.log("%s: (%s, %s)", i, x, y);
}
console.log("Result %s", Math.abs(x)+Math.abs(y))
