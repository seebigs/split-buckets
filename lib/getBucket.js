import each from 'seebigs-each';
import getRatio from './getRatio.js';

export default function getBucket(id, groupName, allocations, seed) {
    let bucketValue;

    let allocated = 0;
    const allocatedBuckets = [];
    each(allocations, (bucketAllocation) => {
        const { weight, value } = bucketAllocation;
        allocatedBuckets.push({
            min: allocated,
            max: allocated + weight,
            value,
        });
        allocated += weight;
        if (allocated > 1) {
            throw new Error('Bucket allocation exceeds 100%');
        }
    });

    const ratio = getRatio(`${id}${groupName}`, seed);

    each(allocatedBuckets, (bucket) => {
        if (ratio >= bucket.min && ratio < bucket.max) {
            bucketValue = bucket.value;
            return false; // break out of loop
        }
        return true;
    });

    return bucketValue;
}
