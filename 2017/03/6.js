const input = 361527;
let y = 0;
let x = 0;
let radius = 0;
let direction = 0;
let values = {0: {0: 1}};

function getValue(x, y) {
    let tl = 0; // Top left
    let t = 0; // Top
    let tr = 0; // Top Right
    let r = 0; // Right
    let br = 0; // Bottom right
    let b = 0; // Bottom
    let bl = 0; // Bottom left
    let l = 0; // Left

    // Check top left
    if (values[x-1] && values[x-1][y+1]) tl = values[x-1][y+1];
    // Check top
    if (values[x] && values[x][y+1]) t = values[x][y+1];
    // Check top Right
    if (values[x+1] && values[x+1][y+1]) tr = values[x+1][y+1];
    // Check right
    if (values[x+1] && values[x+1][y]) r = values[x+1][y];
    // Check left
    if (values[x-1] && values[x-1][y]) l = values[x-1][y];
    // Check bottom left
    if (values[x-1] && values[x-1][y-1]) bl = values[x-1][y-1];
    // Check bottom
    if (values[x] && values[x][y-1]) b = values[x][y-1];
    // Check bottom Right
    if (values[x+1] && values[x+1][y-1]) br = values[x+1][y-1];

    return (tl + t + tr + r + br + b + bl + l);
}

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
    if(values[x]) {
        values[x][y] = getValue(x, y);
    } else {
        values[x] = {};
        values[x][y] = getValue(x, y);
    }
    console.log("%s: (%s, %s) = %s", i, x, y, values[x][y]);
    if (values[x][y] > input) {
        console.log(values[x][y]);
        break;
        exit();
    }
}
