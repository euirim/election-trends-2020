// From https://stackoverflow.com/questions/10014271/generate-random-color-distinguishable-to-humans

const Colors = {};

Colors.names = {
    darkgrey: "#999999",
    black: "#000000",
    darkcyan: "#00a5a5",
    blue: "#0000ff",
    aqua: "#00ffff",
    lime: "#00ff00",
    red: "#ff0000",
    darkolivegreen: "#556b2f",
    darkkhaki: "#bdb76b",
    darkviolet: "#b507ff",
    orange: "#ffa500",
    darkred: "#b03060",
    darksalmon: "#e9967a",
    gold: "#ffd700",
    darkmagenta: "#8b008b",
    green: "#008000",
    khaki: "#00e68c",
    indigo: "#4b0082",
    brown: "#8b0000",
    magenta: "#ff00ff",
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