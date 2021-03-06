var word, wins = 0, losses = 0, diff = 'easy', isRunning = false;
var easyList = ["lead", "soul", "ash", "ore", "beat", "rage", "drum", "rock", "iron", "beam", "lode", "slug", "pipe", "roll", "shot", "gold", "feed", "doom", "mace", "palm", "mug", "box", "run", "gods", "prey", "tear", "pray", "cry", "war", "dark", "die", "kill", "hail", "amon", "hell", "hair", "ace", "tool"];

var mediumList = ["metals", "skull", "thrash", "grunge", "hammer", "brass", "hammered", "hammers", "anvil", "rings", "triangle", "slide", "cable", "wedge", "cannon", "slugging", "fusion", "ingot", "rivet", "rolled", "weight", "manacle", "manowar", "slayer", "dethklok", "brutal", "pipes", "ligature", "flames", "chock", "uranium", "mercury", "platinum", "stamp", "thallium", "armor", "measure", "barbell", "bismuth", "carbide", "cesium", "osmium", "peavey", "plate", "tungsten", "clang", "pressure", "robot", "plated", "bassist", "crook", "scale", "guitar", "maiden", "sludge", "thunder", "steel", "beast", "demon", "sorrow", "flames", "scream", "paranoid", "grave", "slayer", "battery", "entropy", "midgard", "fireball", "leather", "anvil", "heavy", "night", "reaper", "unearth", "napalm", "mastodon"];

var hardList = ["metalhead", "grindcore", "headbanger", "saturation", "distortion", "hammering", "metallica", "baseplate", "boilermaker", "blackjack", "bulldozer", "metalocalypse", "distortion", "acetabulum", "quicksilver", "sledgehammer", "cuprimine", "ferrocene", "blastbeat", "doublekicker", "trollhammeren", "lightning", "motorhead", "killswitch", "nightmare", "victorious", "insomnium", "dragonforce", "atomsmasher", "metropolice", "pentagram"];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var guessed = [];
var guesses = 0;

$(document).ready(function () {
    $('#instruction-tooltip').tooltip();
    $("#button-group").tooltip();
    $("#player")[0].play();        // Force audio to play (Some browsers don't repect the audio tag's autoplay it seems)
    $(document).on("keyup", function (event) {
        if (!isRunning) {      // First keypress populates play area
            getWord();
            createBlanks();
            isRunning = true;
        } else {
            run(event.key);    // Second and following keypresses loop through game logic
        }
    });
    $(document).on("touchend", function (event) {
        alert("Not yet ready for touch events...");
    });
});

function run(key) {
    var k = key.toLowerCase();  // Change the keypress to lower case

    if (alphabet.indexOf(k) != -1) {   // Pressed key is a letter; do other game logic
        for (var i = 0; i < word.length; i++) {  // Check if the letter is in the word
            if (word.charAt(i) == k) {                           // It is!
                if ($('#blanks').html().charAt(i * 2) == k) {      // Has it already been put on screen?
                    return;
                }
                else {
                    updateBlanks(k, i);              // Update the blank spaces
                    if (checkWin()) {                // Check for win
                        win();
                        return;
                    }
                    else {
                        updateGuessed(k);            // Update guessed letters
                    }
                }
            }
            else if (i == word.length - 1 && word.indexOf(k) == -1) {      // reached end of array with no match...
                updateGuessed(k);                // Update guessed letters
                if (checkLose()) {               // Check for game over
                    lose();
                    return;
                }
            }
        }
    }
}

function getWord() {
    if (diff === 'easy') {
        if (easyList.length == 0) {
            alert("No more words!!!");
        }
        word = easyList[Math.floor(Math.random() * easyList.length)];
    } else if (diff === 'medium') {
        if (mediumList.length == 0) {
            alert("No more words!!!");
        }
        word = mediumList[Math.floor(Math.random() * mediumList.length)];
    } else {
        if (hardList.length == 0) {
            alert("No more words!!!");
        }
        word = hardList[Math.floor(Math.random() * hardList.length)];
    }
    removeFromArray(diff, word);
}
function createBlanks() {
    // Change font size based on difficulty (word length)
    if (diff == 'medium') {
        $('#blanks').css('font-size', '3em');
    } else if (diff == 'hard') {
        $('#blanks').css('font-size', '2.05em');
    } else {
        $('#blanks').css('font-size', '4em');
    }
    var blanks = "_ ".repeat(word.length);
    $('#blanks').html(blanks);
}

function updateBlanks(letter, index) {
    var string = $('#blanks')[0].innerHTML;                    // Get array of underscores...
    if (index == 0) {                                          // If it's the first character
        string = letter + string.slice(1, string.length - 1);
        $('#blanks').html(string);
    }
    else {
        string = string.slice(0, index * 2) + letter + string.slice(index * 2 + 1, string.length);
        $('#blanks').html(string);
    }
}

function checkWin() {
    var u = $('#blanks').html();
    if (u.indexOf('_') == -1) {
        // Win!
        return true;
    }
}
function checkLose() {
    if (guesses == 6) {
        return true;
    }
}

function updateGuessed(char) {
    // Add to guessed array if not already in it
    if (guessed.indexOf(char) == -1) {
        guessed.push(char);
        guessed.push(" "); // Add a space as a separate array item to keep array searchable
        $('#guessed-letters').html(guessed);
        if (word.indexOf(char) == -1) {
            revealBody();
        }
    }
}

function reset() {
    guesses = 0;
    isRunning = false;
    $('#blanks').html("?");
    $('#guessed-letters').html("?");
    guessed = [];
    $('.body-container img').css('visibility', 'hidden');
    $('.body-container img:first-child').css('visibility', 'visible');
}

function revealBody() {
    guesses += 1;
    var img = "body" + guesses;
    $("#" + img).css('visibility', 'visible');
}

function win() {
    changeAudio('win');
    wins += 1;
    $('#num-wins').html(wins);
    $("#correct-words").prepend("<p>" + word + "</p>");
    togglePane(true);
    reset();
}
function lose() {
    changeAudio('lose');
    losses += 1;
    $('#num-losses').html(losses);
    togglePane(false);
    setTimeout(function () {
        reset();
    }, 3000);

}


// Clicking the difficulty buttons
$('#easy').click(function (event) {
    changeDiff($(this).attr('id'));
});
$('#medium').click(function (event) {
    changeDiff($(this).attr('id'));
});
$('#hard').click(function (event) {
    changeDiff($(this).attr('id'));
});

function changeDiff(w) {
    diff = w;
    var g = $('#blanks').html();
    $(".btn").removeClass('btn-dark');
    $(".btn").addClass('btn-secondary');
    $("#" + w).addClass('btn-dark');
    if (g.indexOf('?') != -1) {
        // New game tooltip here
        $('#button-group').tooltip('show');
        setTimeout(function () {
            $('#button-group').tooltip('hide');
        }, 3000);
        reset();
    }
    else {
        for (var i = 0; i < g.length; i++) {
            if (g[i] !== '_' && g[i] !== ' ') {
                var res = confirm("This will start a new game, are you sure?");
                if (res) {
                    // New game tooltip here
                    $('#button-group').tooltip('show');
                    setTimeout(function () {
                        $('#button-group').tooltip('hide');
                    }, 3000);
                    reset();
                }
                i = g.length;
            }
            if (i == g.length - 1) {
                // New game tooltip here
                $('#button-group').tooltip('show');
                setTimeout(function () {
                    $('#button-group').tooltip('hide');
                }, 3000);
                reset();
            }
        }
    }
}

function togglePane(status) {
    var $wl = $('#winloss');
    if (status) {
        // Show win pane
        $wl.css('border-color', 'green');
        $wl.css('color', 'green');
        $wl.html('You win!!');
        $wl.show("500");
        setTimeout(function () {
            $wl.hide("1000");
        }, 2000);
    }
    else {
        // Show lose pane
        $wl.css('border-color', 'red');
        $wl.css('color', 'red');
        $wl.html("You lose!! The word was '" + word + "'");
        $wl.show("500");
        setTimeout(function () {
            $wl.hide("1000");
        }, 2000);
    }
}
function changeAudio(state) {
    var $p = $('#player')[0];
    $p.pause();
    if (state === "win") {
        var win = document.createElement("audio");
        win.setAttribute("src", "assets/audio/win.ogg");
        win.play();
        setTimeout(function () {
            $p.play();
        }, 3000);
    } else {
        var lose = document.createElement("audio");
        lose.setAttribute("src", "assets/audio/lose-short.ogg");
        lose.play();
        setTimeout(function () {
            $p.play();
        }, 3000);
    }
}

function removeFromArray(array, word) {
    if (array === 'easy') {
        easyList.splice(easyList.indexOf(word), 1);
    } else if (array === "medium") {
        mediumList.splice(mediumList.indexOf(word), 1);
    } else {
        hardList.splice(hardList.indexOf(word), 1);
    }
}