export function changeLastCarac(str,caracAdd) {
    let cutLastCarac = str.slice(0, -1)
    return cutLastCarac + caracAdd
}

export function showList(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(`Senha ${i+1}: ${arr[i]}`)
    }
}