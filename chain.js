import {
    generateGenesisBlock,
    addBlock,
    validateBlockChain
} from './src/blockchain.js'
import { inspect } from 'util'

function stringGen(len) {
    let text = "3"
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    
    for (let i=0; i<len; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    return text
}

let chain = [generateGenesisBlock()]

console.log(inspect({chain}, { depth: null }))

for (let i=0; i<=20; ++i) {
    const calc = Math.floor(
        Math.random() * (10 * 200 - 1 * 200) + 1 * 200
    ) / (1 * 200)

    chain = addBlock(chain, {
        sender: stringGen(33),
        receiver: stringGen(33),
        amount: calc,
        currency: 'CRSTK'
    })    
}

console.log(inspect({chain}, { depth: null }))
console.log(inspect({ valid: validateBlockChain(chain) }, { depth: null }))

