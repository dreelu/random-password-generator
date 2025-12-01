export function changeLastCarac(str,caracAdd) {
    let cutLastCarac = str.slice(0, -1)
    return cutLastCarac + caracAdd
}

export function testPersonCond(var1, var2, cond) {
    if (var1) {
        if (!var2) {
            return cond
        }
    }
}

export function resetMenuOptions(var1, var2, var3, var4, str) {
    var1 = false
    var2 = false
    var3 = false
    var4 = false
    str = ''

    //OIi rs essa função era pra ta funcionando mas n funciona concerta pra mim thcaaau

    return 
}

let a = true
let b = true
let c = true
let d = true
let e = 'oi'

console.log(resetMenuOptions(a, b, c, d, e))