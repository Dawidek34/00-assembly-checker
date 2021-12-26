input.onButtonPressed(Button.A, function () {
    Button_A = 1
})
input.onButtonPressed(Button.B, function () {
    Button_B = 1
})
let Button_B = 0
let Button_A = 0
let QC = 0
let IR_L = 0
let IR_R = 0
basic.forever(function () {
    if (QC == 0) {
        basic.showLeds(`
            . . . # .
            . . # . .
            . # # # #
            . . # . .
            . . . # .
            `)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        basic.showString("A")
        basic.clearScreen()
        music.playTone(523, music.beat(BeatFraction.Quarter))
    }
    if (Button_A == 1) {
        QC = 1
        basic.showLeds(`
            . # . . .
            . . # . .
            # # # # .
            . . # . .
            . # . . .
            `)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.showString("B")
        basic.clearScreen()
        music.playTone(587, music.beat(BeatFraction.Quarter))
    }
    if (Button_B == 1) {
        Button_A = 0
        basic.showArrow(ArrowNames.SouthEast)
        basic.clearScreen()
        music.playTone(698, music.beat(BeatFraction.Quarter))
        if (TobbieII.RBlock(512)) {
            Button_B = 0
            IR_R = 1
            music.playTone(698, music.beat(BeatFraction.Whole))
        }
    }
    if (IR_R == 1) {
        basic.showArrow(ArrowNames.SouthWest)
        basic.clearScreen()
        music.playTone(784, music.beat(BeatFraction.Quarter))
        if (TobbieII.LBlock(512)) {
            IR_R = 0
            IR_L = 1
            music.playTone(784, music.beat(BeatFraction.Whole))
        }
    }
    if (IR_L == 1) {
        TobbieII.rightward()
        basic.pause(1000)
        TobbieII.stopturn()
        TobbieII.leftward()
        basic.pause(1000)
        TobbieII.stopturn()
        TobbieII.forward()
        basic.pause(1000)
        TobbieII.stopwalk()
        TobbieII.backward()
        basic.pause(1000)
        TobbieII.stopwalk()
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        IR_L = 0
        basic.showIcon(IconNames.Yes)
    }
})
