import {
    generateGenesisBlock,
    addBlock,
    validateBlockChain
} from './src/blockchain.js'
import { inspect } from 'util'

const amount = '0.00756'
const currency = 'CRSTK'
const sender = '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5'
const receiver = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'

let chain = [generateGenesisBlock()]

console.log(inspect({chain}, { depth: null }))

chain = addBlock(chain, {
    sender,
    receiver,
    amount,
    currency
})

console.log(inspect({chain}, { depth: null }))

console.log(inspect(validateBlockChain(chain), { depth: null }))

