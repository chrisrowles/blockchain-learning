import sha256 from 'crypto-js/sha256.js'

/**
 * Generate block 0 of the chain.
 * 
 * Creates the block, calculates the first hash for said block, merges the hash with the block object,
 * then returns it. E.g.
 * 
 * ```js
 * {
 *    timestamp: 1643441631070,
 *    data: 'Genesis Block',
 *    previousHash: '0',
 *    hash: 'e3feb361c230ce901e67ec4a8708f2f7ea1e0d4a47b8ba2e0551d473c179bc05'
 * }
 * ```
 * @returns {object}
 */
export function generateGenesisBlock() {
    const block = {
        timestamp: + new Date(),
        data: 'Genesis Block',
        previousHash: '0'
    }

    console.log({block})

    return {
        ...block,
        hash: calculateBlockHash(block)
    }
}

/**
 * Calculate the next block and add it to the chain.
 * 
 * 
 * @param {*} chain 
 * @param {*} data 
 * @returns 
 */
export function addBlock(chain, data) {
    // Grab the previousHash property from the previous block on the chain
    // and assign it to this new block's hash property
    const {hash: previousHash} = chain[chain.length - 1];
    
    // Create the new block, note that the previous Hash 
    const block = {
        timestamp: + new Date(),
        data,
        previousHash,
        nonce: 0
    }

    const newBlock = mineBlock(4, block);
    
    return chain.concat(newBlock);
}

export function validateBlockChain(chain) {
    function tce(chain, index) {
        if (index === 0) {
            return true
        }

        const { hash, ...currentBlockWithoutHash } = chain[index]
        const currentBlock = chain[index]
        const previousBlock = chain[index - 1]
        const isValidHash = (hash === calculateBlockHash(currentBlockWithoutHash))
        const isPreviousHashValid = (currentBlock.previousHash === previousBlock.hash)
        const isValidChain = (isValidHash && isPreviousHashValid)
  
        if (!isValidChain) {
            return false
        } else {
            return tce(chain, index -1)
        }
    }

    return tce(chain, chain.length - 1)
}

function mineBlock(difficulty, block) {
    function mine(block) {
        const newBlock = nextBlockNonce(block)
    
        return nextBlockDifficulty(difficulty, newBlock.hash)
            ? newBlock
            : () => mine(nextBlockNonce(block))
    }

    return trampoline(mine(nextBlockNonce(block)))
}

function updateBlockHash(block) {
    return { ...block, hash: calculateBlockHash(block) }
}

function calculateBlockHash({previousHash, timestamp, data, nonce = 1}) {
    return sha256(previousHash + timestamp + JSON.stringify(data) +  nonce).toString();
}
  
function nextBlockDifficulty(difficulty, hash) {
    return hash.substr(0, difficulty) === '0'.repeat(difficulty)
}

function nextBlockNonce(block) {
    return updateBlockHash({...block, nonce: block.nonce + 1})
}

function trampoline(fn) {
    let result = fn.apply(fn, ...arguments);
    
    while(result && typeof(result) === "function") {
        result = result();
    }
    
    return result;
}