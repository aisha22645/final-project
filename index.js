/*login page*/

(function () {
    const loginTab = document.getElementById('login-tab');  
    const signupTab = document.getElementById('signup-tab');  
    const loginForm = document.getElementById('login-form');  
    const signupForm = document.getElementById('signup-form'); 

    
    // Tab switching logic
    loginTab?.addEventListener('click', () => {
        loginTab.classList.add('active');        // Highlights the login tab
        signupTab.classList.remove('active');    // Removes highlight from signup tab
        loginForm.classList.add('active');       // Shows the login form
        signupForm.classList.remove('active');   // Hides the signup form
    });

    signupTab?.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Form validation
    document.querySelectorAll('.form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Form submitted successfully!');
        });
    });
})();


/*game page*/

console.log("Welcome to TIC TAC TOE");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let audioGameover = new Audio("gameover.mp3");
let turn = "X";
let gameOver = false;
let isComputerMode = false; // Track if playing against the computer


// Function to Change the Turn
const changeTurn = () =>{
    return turn === "X" ?"0":"X";
}

// Function to Check for a win
    // [0 1 2]  Winning Possibility   [0 1 2]
    // [3 4 5]  ======>>>             [3 4 5]
    // [6 7 8]                        [6 7 8]

    const checkWin = () => {
        let boxtext = document.getElementsByClassName('boxtext');
        let wins =  [
            [0, 1, 2, 5, 5, 0],
            [3, 4, 5, 5, 15, 0],
            [6, 7, 8, 5, 25, 0],
            [0, 3, 6, -5, 15, 90],
            [1, 4, 7, 5, 15, 90],
            [2, 5, 8, 15.1, 15, 90],
            [0, 4, 8, 5, 15, 45],
            [2, 4, 6, 5, 15, -45],
        ];
    
        let isTie = true;
    
        wins.forEach(e => {
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
                (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
                (boxtext[e[0]].innerText !== "")) {
                document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
                gameOver = true;
    
                document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "200px";
                document.querySelector('.line').style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector('.line').style.width = "20vw";
                isTie = false;
            }
        });
    
        // Check for Tie
        Array.from(boxtext).forEach(element => {
            if (element.innerText === "") {
                isTie = false; // If any box is empty, it's not a tie
            }
        });
    
        if (!gameOver && isTie) {
            document.querySelector('.info').innerText = "It's a Tie!";
            gameOver = true;
        }
    };  
    


// Game Logic 
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
                
                if (isComputerMode && turn === "0") {
                    setTimeout(computerMove, 500); // Delay computer move for realism
                }
            }
        }
    });
});




// Add Listener to Reset
const resetGame = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.line').style.width = "0";
};

// Attach the reset function to the reset button
document.getElementById('reset').addEventListener('click', resetGame);

const toggleModeButton = document.getElementById("toggleMode");
toggleModeButton.addEventListener('click', () => {
    isComputerMode = !isComputerMode;
    toggleModeButton.innerText = isComputerMode ? "2 Player" : "Play with Computer";
    resetGame(); // Reset the game when mode changes
});

const computerMove = () => {
    let emptyBoxes = Array.from(document.getElementsByClassName('box')).filter(box => 
        box.querySelector('.boxtext').innerText === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.querySelector('.boxtext').innerText = "0";
        turn = changeTurn();
        audioTurn.play();
        checkWin();
        if (!gameOver) {
            document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
        }
    }
};

//code...

document.getElementById('themeSelect').addEventListener('change', (event) => {
    if (event.target.value === 'dark') {
        document.body.style.backgroundColor = 'black'; // Set dark background
        document.body.style.color = 'white'; // Set text color to white for dark theme
        // Change grid lines to white
        document.querySelectorAll('.box').forEach((box) => {
            box.style.borderColor = 'white'; // Set border color to white
        });
        document.querySelector('nav').style.backgroundColor = 'rgb(180, 32, 89)'; // Set nav background to default dark color
    } else {
        document.body.style.backgroundColor = 'white'; // Set light background
        document.body.style.color = 'black'; // Set text color to black for light theme
        document.querySelector('nav').style.backgroundColor = 'rgb(180, 32, 89)'; // Reset nav to default
    }
});
