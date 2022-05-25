function W_color () {
	
}
function COLOR () {
    let strip: neopixel.Strip = null
    R = mooncar.ColorSensorRead(mooncar.Channel.Red)
    G = mooncar.ColorSensorRead(mooncar.Channel.Green)
    B = mooncar.ColorSensorRead(mooncar.Channel.Blue)
    serial.writeLine("R:" + R + "___G:" + G + "___B:" + B)
    if (R > 200 && G > 200 && B > 200) {
        strip.showColor(neopixel.rgb(50, 50, 50))
    } else {
        if (R > G && R > B) {
            strip.showColor(neopixel.rgb(50, 0, 0))
            music.playTone(349, music.beat(BeatFraction.Eighth))
        } else {
            if (G > R && G > B) {
                strip.showColor(neopixel.rgb(0, 50, 0))
                music.playTone(349, music.beat(BeatFraction.Eighth))
            } else {
                if (B > R && B > G) {
                    strip.showColor(neopixel.rgb(0, 0, 50))
                    music.playTone(349, music.beat(BeatFraction.Eighth))
                } else {
                    if (R < 80 && G < 80 && B < 80) {
                        strip.showColor(neopixel.colors(NeoPixelColors.Black))
                    }
                }
            }
        }
    }
    basic.pause(500)
    strip.show()
}
mooncar.IRRemote(function () {
    basic.showNumber(mooncar.IRRead())
    serial.writeString("" + (mooncar.IRRead()))
    basic.pause(100)
    basic.showNumber(0)
})
function buzzer () {
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(294, music.beat(BeatFraction.Quarter))
    music.playTone(349, music.beat(BeatFraction.Quarter))
    Y = 0
    X = 500
}
function IR () {
    if (mooncar.LineFollowerSensor() == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else {
        if (mooncar.LineFollowerSensor() == 1) {
            basic.showLeds(`
                # . . . .
                # . . . .
                # . . . .
                # . . . .
                # . . . .
                `)
        } else {
            if (mooncar.LineFollowerSensor() == 2) {
                basic.showLeds(`
                    . . . . #
                    . . . . #
                    . . . . #
                    . . . . #
                    . . . . #
                    `)
            } else {
                basic.showLeds(`
                    # . . . #
                    # . . . #
                    # . . . #
                    # . . . #
                    # . . . #
                    `)
            }
        }
    }
}
function M_color () {
	
}
let X = 0
let Y = 0
let B = 0
let G = 0
let R = 0
mooncar.ColorSensorinit()
buzzer()
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
mooncar.EnIR()
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        Y = 1
        X += 80
        basic.showNumber(Y)
    }
    if (Y == 1) {
        Y = 0
        music.playTone(X, music.beat(BeatFraction.Whole))
    }
    if (X > 1100) {
        X = 500
    }
    if (input.buttonIsPressed(Button.B)) {
        mooncar.IRcommand(5)
    }
})
