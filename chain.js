import {
    generateGenesisBlock,
    addBlock,
    validateBlockChain
} from './src/blockchain.js'

import { log, stringGen } from './src/utils.js'

// Generate block 0 and output to console
let chain = [generateGenesisBlock()]
log(chain, { depth: null })

// Begin adding more blocks
for (let i=0; i<=5; ++i) {
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

// Output chain to console
log({chain}, { depth: null })
log({valid: validateBlockChain(chain)}, { depth: null })

