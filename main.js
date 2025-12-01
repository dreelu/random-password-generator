import { changeLastCarac } from './utils.js'
import { testPersonCond} from './utils.js'
import { resetMenuOptions } from './utils.js'
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
    
    return menuOption
}


function generateMenu() {
    let genPasswordOptions = ['letters (capital) ○', 'letters (tiny) ○', 'numbes (0-9) ○', 'special simbyols (!@#$%^&*()_+) ○', 'done']

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
                console.log(rCarac)
                done = true
                break
            case -1:
                mainMenu()
        }
    }
}


function generatePassword(length, atteempt = 0) {
    
    if (atteempt > 50) {
        throw new Error('Não foi possível gerar uma senha válida após várias tentativas.')
    }


    let res = '';

    //Garantir o tamanho mínimo
    if (length > 3) {
        for (let i = 0; i < length; i++) {
            let indiceRandom = Math.floor((Math.random() * rCarac))
            res += rCarac[indiceRandom]
        }
    } else {
        for (let i = 0; i < 3; i++) {
            let indiceRandom = Math.floor((Math.random() * rCarac))
            res += rCarac[indiceRandom]
        }
    }



    //Verificar se a senha gerada cumpre os requisitos
    
    const hasTLetter = /[a-z]/.test(res)
    const hasCLetter = /[A-Z]/.test(res)
    const hasNumber = /[0-9]/.test(res)
    const hasSpecial = /[!@#$%^&*()_+]/.test(res)

    //Se não cumprir, gerar nova senha
    testPersonCond(putTLetter, hasTLetter, generatePassword(length, atteempt + 1))
    testPersonCond(putCletter, hasCLetter, generatePassword(length, atteempt + 1))
    testPersonCond(putNumber, hasNumber, generatePassword(length, atteempt + 1))
    testPersonCond(putSpecial, hasSpecial, generatePassword(length, atteempt + 1))

    return res
    
}
function flow() {
    let done = false
    while (!done) {
        mainMenu()

        switch (menuOption) {
            case 1:
                generateMenu()
                // generatePassword()
                break
            case 2:
            
            case 3:
                done = true
        }
    }
}

flow()