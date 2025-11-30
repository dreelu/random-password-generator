// Desafio de código

// Crie uma função que receba um número como argumento e gere uma senha desse tamanho. A senha deve conter:

//     pelo menos uma letra
//     apenas letras minúsculas
//     pelo menos um numero
//     pelo menos um destes caracteres especiais: !@#$%^&*()_+
//     o comprimento mínimo da senha deve ser 3. Se o número passado para a função for menor que 3, a função deve ignorar o argumento e retornar uma senha de comprimento 3.

function generatePassword(length, atteempt = 0) {
    if (atteempt > 10) {
        throw new Error('Não foi possível gerar uma senha válida após várias tentativas.')
    }

    const letras = 'abcdefghijklmnopqrstuvwxyz'
    const numeros = '1234567890'
    const especiais = '!@#$%^&*()_+'

    //Caracteres para a senha
    const rCarac = letras + numeros + especiais

    let res = '';


    // function clamp(val, min, max) {
    //     return Math.min(Math.max(val, min), max)
    // }

    //Garantir o tamanho mínimo
    if (length > 3) {
        for (let i = 0; i < length; i++) {
            //Aleatório
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
    
    const hasLetter = /[a-z]/.test(res)
    const hasNumber = /[0-9]/.test(res)
    const hasSpecial = /[!@#$%^&*()_+]/.test(res)

    //Se não cumprir, gerar nova senha
    if (!hasLetter || !hasNumber || !hasSpecial) {
        return generatePassword(length, atteempt + 1)
    }

    return res
    
}

console.log(generatePassword(3))