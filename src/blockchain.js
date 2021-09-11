import sha256 from 'crypto-js/sha256.js'

export function generateGenesisBlock() {
    const block = {
        timestamp: + new Date(),
        data: 'Genesis Block',
        previousHash: '0'
    }

    return {
        ...block,
        hash: calculateBlockHash(block)
    }
}

export function addBlock(chain, data) {
    const {
        hash: previousHash
    } = chain[chain.length - 1];
    
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