

var hangman = {
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    easyWordList: ["lead", "ore", "beat", "horn", "rage", "drum", "rock", "iron", "beam", "lode", "slug", "pipe", "roll", "reed", "shot", "shot", "gold", "feed", "hob", "doom", "mace", "palm", "edta", "mug", "skeg", "box", "run"],
    mediumWordList: ["metals", "thrash", "grunge", "hammer", "brass", "hammered", "hammers", "anvil", "rings", "triangle", "slide", "cable", "wedge", "cannon", "slugging", "fusion", "ingot", "rivet", "rolled", "weight", "dokken", "manacle", "manowar", "slayer", "dethklok", "brutal", "pipes", "glute", "ligature", "flames", "chock", "uranium", "mercury", "platinum", "stamp", "thallium", "armor", "measure", "barbell", "bismuth", "carbide", "cesium", "osmium", "peavey", "plater", "steel", "tungsten", "clang", "pressure", "robot", "bedplate", "bassist", "crook", "scale", "guitar", "maiden", "sludge", "thunder"],
    hardWordList: ["metalhead", "grindcore", "headbanger", "saturation", "hammering", "metallica", "baseplate", "boilermaker", "blackjack", "bulldozer", "metalocalypse", "distortion", "acetabulum", "quicksilver", "sledgehammer", "cuprimine", "ferrocene", "blastbeat", "doublekicker"],
    audio: {
        win: "assets/audio/win.mp3",
        lose: "assets/audio/lose.mp3",
        default: "assets/audio/tmtm.mp3"
    },
    currWord: "",
    wins: 0,
    losses: 0,
    difficulty: ["easy", "medium", "hard"],
    // Sets var currWord and returns a random word based on difficulty
    newWord: function (difficulty) {
        var r = Math.floor(Math.random());
        if (difficulty === 'easy') {
            this.currWord = this.easyWordList[r * this.easyWordList.length];
        } else if (difficulty === 'medium') {
            this.currWord = this.mediumWordList[r * this.mediumWordList.length];
        } else {
            this.currWord = this.hardWordList[r * this.hardWordList.length];
        }
        return this.currWord;
    },
    // Updates the #blanks on the screen according to the word length
    createBlanks: function (word) {
        var str="";
        for (var i = 0; i < word.length; i++) {
            str = str + "_ ";
        }
        $('#blanks').html(str);
    },
    // Converts character to lower case then returns true if it's a letter
    alphabetChecker: function(char) {
        if (this.alphabet.indexOf(char.toLowerCase()) == -1) {
            return false;
        } else {
            return true;
        }
    },
    updateScreenBlanks: function(char, index) {
        var curr = $('#blanks')[0].innerHTML;
        
    },



};