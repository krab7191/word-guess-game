var guess, wins, losses, diff = 'easy';
var easyList = ["lead", "ore", "beat", "horn", "rage", "drum", "rock", "iron", "beam", "lode", "slug", "pipe", "roll", "reed", "shot", "shot", "gold", "feed", "hob", "doom", "mace", "palm", "edta", "mug", "skeg", "box", "run"];
var mediumList = ["metals", "thrash", "grunge", "hammer", "brass", "hammered", "hammers", "anvil", "rings", "triangle", "slide", "cable", "wedge", "cannon", "slugging", "fusion", "ingot", "rivet", "rolled", "weight", "dokken", "manacle", "manowar", "slayer", "dethklok", "brutal", "pipes", "glute", "ligature", "flames", "chock", "uranium", "mercury", "platinum", "stamp", "thallium", "armor", "measure", "barbell", "bismuth", "carbide", "cesium", "osmium", "peavey", "plater", "steel", "tungsten", "clang", "pressure", "robot", "bedplate", "bassist", "crook", "scale", "guitar", "maiden", "sludge", "thunder"];
var hardList = ["metalhead", "grindcore", "headbanger", "saturation", "hammering", "metallica", "baseplate", "boilermaker", "blackjack", "bulldozer", "metalocalypse", "distortion", "acetabulum", "quicksilver", "sledgehammer", "cuprimine", "ferrocene", "blastbeat", "doublekicker"];


$(document).ready(function() {
    console.log("Document is ready");
    document.onkeyup = function(event) {
        start();
    };
});

function start() {
    // Pick a random word, based on chosen difficulty
    var word = getWord();
    console.log(word);
}

function getWord() {
    var word;
    if (diff === 'easy') {
        word = easyList[Math.floor(Math.random() * easyList.length)];
    } else if (diff === 'medium') {
        word = mediumList[Math.floor(Math.random() * mediumList.length)];
    } else {
        word = hardList[Math.floor(Math.random() * hardList.length)];
    }
    return word;
}