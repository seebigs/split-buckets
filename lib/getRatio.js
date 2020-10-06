import getHash from './getHash.js';

const MAX_HASH_VALUE = 0xffffffff; // Math.pow(2, 32)

export default function getBucketRatio(key, seed) {
    const hash = getHash(key || '', seed || 1);
    return hash / MAX_HASH_VALUE;
}
