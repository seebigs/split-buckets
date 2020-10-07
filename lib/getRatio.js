const getHash = require('./getHash.js');

const MAX_HASH_VALUE = 0xffffffff; // Math.pow(2, 32)

function getBucketRatio(key, seed) {
    const hash = getHash(key || '', seed || 1);
    return hash / MAX_HASH_VALUE;
}

module.exports = getBucketRatio;
