let play_board = ["", "", "", "", "", "", "", "", "", ]
let board_isFull = false
let winner_declared = false
let matched_positions = []


const player = "O"
const computer = "X"
const board_container = document.querySelector('.play-area')
const winner = document.querySelector('#winner')
const reset_btn = document.querySelector('#reset-btn')

const render_board = () => {
    board_container.innerHTML = ""
    play_board.forEach((e,i) => {
        if (!winner_declared) {
            board_container.innerHTML += `<div id="block-${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
        } else {
            board_container.innerHTML += `<div id="block-${i}" class="block">${play_board[i]}</div>`
            document.querySelector(`#block-${i}`).classList.add("occupied")
        }
        if (e == player || e == computer) {
            document.querySelector(`#block-${i}`).classList.add("occupied")
        }
    })
    if (winner_declared) {
        matched_positions.forEach((e, i) => {
            let block = document.querySelector(`#block-${e}`)
            block.classList.remove("occupied")
            block.classList.add("match")
        })
    }
}

const addPlayerMove = e => {
    if (play_board[e] == "") {
        play_board[e] = player
        game_loop()
        addComputerMove()
    }
}

const addComputerMove = () => {
    if (!winner_declared) {
        do {
            console.log("Computer Moving")
            selected = Math.floor(Math.random() * 9)
        } while (play_board[selected] != "")
        play_board[selected] = computer
        game_loop()
    }
}

const game_loop = () => {
    render_board()
    check_board_complete()
    check_for_winner()
}

const check_board_complete = () => {
    let flag = true
    play_board.forEach(e => {
        if (e != player && e != computer) {
            flag = false
        }
    })
    board_isFull = !flag
}

const check_for_winner = () => {
    let res = check_match()
    if (res != "") {
        if (board_isFull) {
            if (res == player) {
                winner.innerText = "The Player Wins!"
                winner.classList.add("playerWin")
            } else if (res == computer) {
                winner.innerText = "The Computer Wins!"
                winner.classList.add("computerWin")
            }
            board_isFull = true
        }
         else {
            winner.innerText = "Draw!"
            winner.classList.add("draw")
        }
        winner_declared = true
        render_board()
    }
}

// loop through all possible match lines
const check_match = () => {
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            matched_positions = [i, i + 1, i + 2]
            return play_board[i]
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            matched_positions = [i, i + 3, i + 6]
            return play_board[i]
        }
    }
    if (check_line(0, 4, 8)) {
        matched_positions = [0, 4, 8]
        return play_board[0]
    }
    if (check_line(2, 4, 6)) {
        matched_positions = [2, 4, 6]
        return play_board[2]
    }
    return ""
}

// check for matches
const check_line = (a, b, c) => {
    return (
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a] == player || play_board[a] == computer)
    )
}

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", "", ]
    board_isFull = false
    winner_declared = false
    matched_positions = []
    winner.classList.remove("playerWin")
    winner.classList.remove("computerWin")
    winner.classList.remove("draw")
    winner.innerText = ""
    render_board()
}

render_board()