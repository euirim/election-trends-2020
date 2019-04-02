// From https://stackoverflow.com/questions/10014271/generate-random-color-distinguishable-to-humans

const Colors = {};

Colors.names = {
    darkgrey: "#999999",
    black: "#000000",
    aqua: "#00ffff",
    blue: "#0000ff",
    darkcyan: "#00a5a5",
    lime: "#00ff00",
    red: "#ff0000",
    darkviolet: "#b507ff",
    darkkhaki: "#bdb76b",
    darkolivegreen: "#556b2f",
    orange: "#ffa500",
    darkred: "#b03060",
    darksalmon: "#e9967a",
    gold: "#ffd700",
    magenta: "#ff00ff",
    green: "#008000",
    khaki: "#00e68c",
    indigo: "#4b0082",
    brown: "#8b0000",
    darkmagenta: "#8b008b",
    navy: "#000080",
    olive: "#808000",
    darkorange: "#ff8c00",
    pink: "#ffc0cb",
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