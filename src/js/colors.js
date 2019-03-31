// From https://stackoverflow.com/questions/10014271/generate-random-color-distinguishable-to-humans

const Colors = {};

Colors.names = {
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    brown: "#8b0000",
    darkcyan: "#008b8b",
    darkgrey: "#999999",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkred: "#b03060",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lime: "#00ff00",
    magenta: "#ff00ff",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    red: "#ff0000",
    silver: "#c0c0c0",
    yellow: "#ffff00"
};

Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};

export default Colors;