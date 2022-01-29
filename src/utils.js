import { inspect } from 'util'

export function log(chain, depth) {
    console.log(inspect(chain, depth))
}

export function stringGen(len) {
    let text = "3"
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    
    for (let i=0; i<len; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    return text
}