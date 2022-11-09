class Player {
    constructor(name) {
        this.name = name
        this.piece_pos = 0
        this.prev_pos = 0
        this.current_pos = []
        this.hasWon = false
        // Grid positions on a 600px by 600px grid using a circle with D = 45px as player piece
        this.px_pos = [547.5, 487.5, 427.5, 367.5, 307.5, 247.5, 187.5, 127.5, 67.5, 7.5] 
    }

    render_piece = () => {
        return (`<div class="piece" id="${this.name}">${this.name}</div>`)
    }

    move_piece = (roll, check_win) => {
        console.log(this.piece_pos)
        this.prev_pos = this.piece_pos
        this.piece_pos += roll
        if (this.piece_pos > 99) {
            console.log(this.name + ': '+ "Over 100")
            const back_move = (this.piece_pos - 99)
            this.piece_pos = 99 - back_move
            console.log(this.name + ': '+ "Move back by:", back_move)
        }
        console.log(this.name + ': '+ "Move piece to:", (this.piece_pos+1))
        this.piece_pos.toString().split("").forEach((e) => {
            this.current_pos.push(e)
        })

        if (this.current_pos.length == 1) {
            $(`#${this.name}`).animate({
                left: this.px_pos[this.current_pos[0]] + 'px'
            }, {
                duration: 500,
                specialEasing: {
                    left: 'easeInOutQuad'
                }, complete: () => {
                    console.log(this.name + ': '+ 'Main Animation Complete')
                    this.check_piece_pos(check_win)
                }
            })
        } else {
            $(`#${this.name}`).animate({
                top: this.px_pos[this.current_pos[0]] + 'px',
                left: this.px_pos[this.current_pos[1]] + 'px'
            }, {
                duration: 500,
                specialEasing: {
                    top: 'easeInOutQuad',
                    left: 'easeInOutQuad'
                }, complete: () => {
                    console.log(this.name + ': '+ 'Main Animation Complete')
                    this.check_piece_pos(check_win)
                }
            })
        }
    }

    check_piece_pos = (check_win) => {
        this.current_pos = []
        switch (this.piece_pos) {
            case 2:
                this.move_event(this.px_pos[5], this.px_pos[0], check_win)
                this.piece_pos = 50
                console.log(this.name + ': '+ 'Change position to 51')
                break
            case 5:
                this.move_event(this.px_pos[2], this.px_pos[6], check_win)
                this.piece_pos = 26
                console.log(this.name + ': '+ 'Change position to 27')
                break
            case 19:
                this.move_event(this.px_pos[6], this.px_pos[9], check_win)
                this.piece_pos = 69
                console.log(this.name + ': '+ 'Change position to 70')
                break
            case 24:
                this.move_event(this.px_pos[0], this.px_pos[4], check_win)
                this.piece_pos = 4
                console.log(this.name + ': '+ 'Change position to 5')
                break
            case 33:
                this.move_event(this.px_pos[0], this.px_pos[0], check_win)
                this.piece_pos = 0
                console.log(this.name + ': '+ 'Change position to 1')
                break
            case 35:
                this.move_event(this.px_pos[5], this.px_pos[4], check_win)
                this.piece_pos = 54
                console.log(this.name + ': '+ 'Change position to 55')
                break
            case 46:
                this.move_event(this.px_pos[1], this.px_pos[8], check_win)
                this.piece_pos = 18
                console.log(this.name + ': '+ 'Change position to 19')
                break
            case 62:
                this.move_event(this.px_pos[9], this.px_pos[4], check_win)
                this.piece_pos = 94
                console.log(this.name + ': '+ 'Change position to 95')
                break
            case 64:
                this.move_event(this.px_pos[5], this.px_pos[1], check_win)
                this.piece_pos = 51
                console.log(this.name + ': '+ 'Change position to 52')
                break
            case 67:
                this.move_event(this.px_pos[9], this.px_pos[7], check_win)
                this.piece_pos = 97
                console.log(this.name + ': '+ 'Change position to 98')
                break
            case 86:
                this.move_event(this.px_pos[5], this.px_pos[6], check_win)
                this.piece_pos = 56
                console.log(this.name + ': '+ 'Change position to 57')
                break
            case 90:
                this.move_event(this.px_pos[6], this.px_pos[0], check_win)
                this.piece_pos = 60
                console.log(this.name + ': '+ 'Change position to 61')
                break
            case 98:
                this.move_event(this.px_pos[6], this.px_pos[8], check_win)
                this.piece_pos = 68
                console.log(this.name + ': '+ 'Change position to 69')
                break
            default:
                console.log(this.name + ': '+ "Current Pos:", (this.piece_pos + 1))
                if (this.piece_pos == 99) {
                    this.hasWon = true
                    console.log('WWWWWIIIIIINNNNN!!!!!')
                }
                console.log(this.piece_pos)
                check_win()
                break
        }
        
    }

    move_event = (topPX, leftPX, check_win) => {
        $(`#${this.name}`).animate({
            top: topPX + 'px',
            left: leftPX + 'px'
        }, {
            duration: 500,
            specialEasing: {
                top: 'easeInOutQuad',
                left: 'easeInOutQuad'
            }, complete: () => {
                console.log(this.name + ': '+ 'Move Animation Complete')
                check_win()
            }
        })
    }
}

let player1_toPlay = true
let player1 = new Player('P1')
let player2 = new Player('P2')
let blue_prev_roll = 0
let red_prev_roll = 0

$(document).ready(function(){
    const colors_bg = ["skyblue", "bisque", "khaki", "greenyellow", "coral", "hotpink"]

    $('#banner').on("click", () => {
        console.log('prepending alert')
        $('#alert').prepend(
            `<h1>Red Player Wins!</h1> <div>
            <a class="play-btn">Play Again</a>
            </div>
            <p>Made by <span><a href="https://twitter.com/JLacerna214" target="_blank">Jelo Lacerna</a></span></p>
            `
        )
        $('#play-area').css({
            opacity: 0.4
        })
        show_win_screen()
        $('#red-roll-btn').on('click', () => {})
        $('#blue-roll-btn').on('click', () => {})
    })

    const gameloop = (check_win) => {

        render_board()
        render_pieces()

        roll_btn_init(check_win)

        $('#start-btn').on("click", () => {
            show_game(check_win)
            
        })
    }

    const show_game = (check_win) => {
        $('#splash-screen').animate({
            opacity: 0
        }, {
            duration: 1000,
            specialEasing: {
                opacity: 'easeInOutQuad'
            }, complete: () => {
                $('#play-area').animate({
                    opacity: 1
                }, {
                    duration: 1000,
                    specialEasing: {
                        opacity: 'easeInOutQuad'
                    }, complete: () => {
                        $('#splash-screen').hide()
                        $('#alert-container').show()
                        roll_btn_init(check_win)
                    }
                })
            }
        })
    }
    
    const render_board = () => {
        var i = 0
        var new_color
        while (i < 100) {
            $("#board").prepend(`<div id="block-${i}" class="block">${i+1}</div>`)
            new_color = colors_bg[Math.floor(Math.random()*colors_bg.length)];
            $(`#block-${i}`).css("background-color", new_color)
            i++
        }
    }

    const render_pieces = () => {
        const pieces = player1.render_piece() + " " + player2.render_piece()
        $('#piece-container').append(pieces)
    }

    const check_win = () => {
        let pre_pos = 0
        let cur_pos = 0
        let turn = '<h1>Your Turn</h1>'

        if (!player1_toPlay) {
            pre_pos = player1.prev_pos + 1
            cur_pos = player1.piece_pos + 1
            $('#blue-prev-pos').html(pre_pos)
            $('#blue-cur-pos').html(cur_pos)

            $('#red-turn').html(turn)
            $('#blue-turn').html('')
        } else {
            pre_pos = player2.prev_pos + 1
            cur_pos = player2.piece_pos + 1
            $('#red-prev-pos').html(pre_pos)
            $('#red-cur-pos').html(cur_pos)

            $('#blue-turn').html(turn)
            $('#red-turn').html('')
        }


        console.log('Player 1 has won? ', player1.hasWon)
        console.log('Player 2 has won? ', player2.hasWon)
        if (player1.hasWon) {
            console.log("Player 1 has won!")
            $('#red-roll-btn').on('click', () => {})
            $('#blue-roll-btn').on('click', () => {})
            $('#alert').prepend(
                `<h1>Blue Player Wins!</h1> <div>
                <a class="play-btn">Play Again</a>
                </div>
                <p>Made by <span><a href="https://twitter.com/JLacerna214" target="_blank">Jelo Lacerna</a></span></p>
                `
                )
            $('#play-area').css({
                opacity: 0.4
            })
            show_win_screen()
            
        } else if (player2.hasWon) {
            console.log("Player 2 has won!")
            $('#red-roll-btn').on('click', () => {})
            $('#blue-roll-btn').on('click', () => {})
            $('#alert').prepend(
                `<h1>Red Player Wins!</h1> <div>
                <a class="play-btn">Play Again</a>
                </div>
                <p>Made by <span><a href="https://twitter.com/JLacerna214" target="_blank">Jelo Lacerna</a></span></p>
                `
            )
            $('#play-area').css({
                opacity: 0.4
            })
            show_win_screen()
        }
    }

    const roll_btn_init = (check_win) => {
        $('#blue-roll').click(() => {
            if (player1_toPlay) {
                let result = Math.ceil(Math.random()*6)
                let img = ""

                $('#blue-cur-roll').html(result)
                $('#blue-prev-roll').html(blue_prev_roll)
                blue_prev_roll = result

                player1.move_piece(result, check_win)
                player1_toPlay = false

                switch (result) {
                    case 1:
                        img = '<img src="./content/dice/Alea_1.png" alt=""></img>'
                        break
                    case 2:
                        img = '<img src="./content/dice/Alea_2.png" alt=""></img>'
                        break
                    case 3:
                        img = '<img src="./content/dice/Alea_3.png" alt=""></img>'
                        break
                    case 4:
                        img = '<img src="./content/dice/Alea_4.png" alt=""></img>'
                        break
                    case 5:
                        img = '<img src="./content/dice/Alea_5.png" alt=""></img>'
                        break
                    case 6:
                        img = '<img src="./content/dice/Alea_6.png" alt=""></img>'
                        break
                }

                $('#blue-res').html(img)
            }
        })

        $('#red-roll').click(() => {
            if (!player1_toPlay) {
                let result = Math.ceil(Math.random()*6)
                let img = ""

                $('#red-cur-roll').html(result)
                $('#red-prev-roll').html(red_prev_roll)
                red_prev_roll = result

                player2.move_piece(result, check_win)
                player1_toPlay = true

                switch (result) {
                    case 1:
                        img = '<img src="./content/dice/Alea_1.png" alt=""></img>'
                        break
                    case 2:
                        img = '<img src="./content/dice/Alea_2.png" alt=""></img>'
                        break
                    case 3:
                        img = '<img src="./content/dice/Alea_3.png" alt=""></img>'
                        break
                    case 4:
                        img = '<img src="./content/dice/Alea_4.png" alt=""></img>'
                        break
                    case 5:
                        img = '<img src="./content/dice/Alea_5.png" alt=""></img>'
                        break
                    case 6:
                        img = '<img src="./content/dice/Alea_6.png" alt=""></img>'
                        break
                }

                $('#red-res').html(img)
            }
        })
    }

    const show_win_screen = () => {
        $('#alert-container').animate({
            opacity: 1,
            zoom: '150%'
        },{
            duration: 1000,
            specialEasing: {
                opacity: 'easeOutCubic',
                zoom: 'easeOutElastic'
            }, complete: () => {
                $('.play-btn').on('click', reset_game)
                $('.roll-btn').prop("disabled", true)
            }
        })
    }

    const reset_game = () => {
        
        $('#alert-container').animate({
            opacity: 0,
        }, {
            duration: 1000,
            specialEasing: {
                opacity: 'easeOutCubic',
            }, complete: () => {
                $('#play-area').css({
                    opacity: 1
                })
                player1_toPlay = true
                player1 = new Player('P1')
                player2 = new Player('P2')
                blue_prev_roll = 0
                red_prev_roll = 0
                
                $('#board').html(' ')
                $('#piece-container').html('')

                $('#red-prev-pos').html('1')
                $('#red-cur-pos').html('1')

                $('#blue-prev-pos').html('1')
                $('#blue-cur-pos').html('1')

                $('#blue-cur-roll').html('0')
                $('#red-cur-roll').html('0')

                $('#blue-prev-roll').html('0')
                $('#red-prev-roll').html('0')

                $('#blue-turn').html('<h1>Your Turn</h1>')
                $('#red-turn').html('')

                $('.roll-btn').prop("disabled", false)
                $('#alert').html(' ')

                gameloop(check_win)
            }
        })
    }

    gameloop(check_win)
})
