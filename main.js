import { changeLastCarac } from './utils.js'
import readlineSync from 'readline-sync'

let menuOption
const passInfo = { value: '', size: 0 }
let rCarac = passInfo.value

let putTLetter = false
let putCletter = false
let putNumber = false
let putSpecial = false

function mainMenu() {
    console.log('------------------')
    console.log('❶ - Generate new password')
    console.log('❷ - See recent passwords')
    console.log('❸ - Leave')
    console.log('------------------')

    menuOption = readlineSync.questionInt('Select an option: ')
    
    console.clear()
    return menuOption
}


function generateMenu() {
    let genPasswordOptions = ['letters (capital) ○', 'letters (tiny) ○', 'numbers (0-9) ○', 'special simbyols (!@#$%^&*()_+) ○', 'Done']

    //Reseting menu
    putTLetter = false
    putCletter = false
    putNumber = false
    putSpecial = false
    rCarac = ''

    const tinyLetter = 'abcdefghijklmnopqrstuvwxyz'
    const capitalLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYX'
    const numbers = '1234567890'
    const specials = '!@#$%^&*()_+'

    
    passInfo.size = readlineSync.questionInt('How long will be the password? ')
    
    let done = false

    while (!done) {

        let passwordOption = readlineSync.keyInSelect(genPasswordOptions, 'select at least one option: ')

        switch (passwordOption) {
            case 0:
                putTLetter = !putTLetter
                if (putTLetter) {
                    genPasswordOptions[0] = changeLastCarac(genPasswordOptions[0], '◉')
                    rCarac += tinyLetter
                } else {
                    genPasswordOptions[0] = changeLastCarac(genPasswordOptions[0], '○')
                    rCarac.replace(tinyLetter, '')
                }
                break
            case 1:
                putCletter = !putCletter
                if (putCletter) {
                    genPasswordOptions[1] =  changeLastCarac(genPasswordOptions[1], '◉')
                    rCarac += capitalLetter
                } else {
                    genPasswordOptions[1] =  changeLastCarac(genPasswordOptions[1], '○')
                    rCarac.replace(capitalLetter, '')
                }
                break
            case 2:
                putNumber = !putNumber
                if (putNumber) {
                    genPasswordOptions[2] =  changeLastCarac(genPasswordOptions[2], '◉')
                    rCarac += numbers
                } else {
                    genPasswordOptions[2] =  changeLastCarac(genPasswordOptions[2], '○')
                    rCarac.replace(numbers, '')
                }
                break
            case 3:
                putSpecial = !putSpecial
                if (putSpecial) {
                    genPasswordOptions[3] =  changeLastCarac(genPasswordOptions[3], '◉')
                    rCarac += specials
                } else {
                    genPasswordOptions[3] =  changeLastCarac(genPasswordOptions[3], '○')
                    rCarac.replace(specials, '')
                }
                break
            case 4:
                done = true
                break
            case -1:
                mainMenu()
        }
        console.clear()
    }
}


function generatePassword(length, attempt = 0) {


    length = passInfo.size

    if (attempt > 50) {
        throw new Error('Não foi possível gerar uma senha válida após várias tentativas.')
    }


    let res = '';

    //Garantir o tamanho mínimo
    if (length > 3) {
        for (let i = 0; i < length; i++) {
            let indiceRandom = Math.floor((Math.random() * rCarac.length))
            res += rCarac[indiceRandom]
        }
    } else {
        for (let i = 0; i < 3; i++) {
            let indiceRandom = Math.floor((Math.random() * rCarac.length))
            res += rCarac[indiceRandom]
        }
    }



    //Verificar se a senha gerada cumpre os requisitos
    
    const hasTLetter = /[a-z]/.test(res)
    const hasCLetter = /[A-Z]/.test(res)
    const hasNumber = /[0-9]/.test(res)
    const hasSpecial = /[!@#$%^&*()_+]/.test(res)

    //Se não cumprir, gerar nova senha
    if (putTLetter && !hasTLetter) return generatePassword(length, attempt + 1)
    if (putCletter && !hasCLetter) return generatePassword(length, attempt + 1)
    if (putNumber && !hasNumber) return generatePassword(length, attempt + 1)
    if (putSpecial && !hasSpecial) return generatePassword(length, attempt + 1)

    return console.log(`Senha: ${res}`)
    
}

function flow() {
    while (true) {
        mainMenu()

        switch (menuOption) {
            case 1:
                generateMenu()
                generatePassword(passInfo.size)
                break
            case 2:
            
            case 3:
                return
        }
    }
}

flow()