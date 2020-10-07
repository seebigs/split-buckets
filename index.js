const doGetBucket = require('./lib/getBucket.js');

function SplitBuckets(groupName, allocations, seed) {
    this.groupName = groupName || '';
    this.allocations = allocations || [];
    this.seed = seed || 1;
}

SplitBuckets.prototype.getBucket = function getBucket(id) {
    return doGetBucket(id, this.groupName, this.allocations, this.seed);
};

module.exports = SplitBuckets;
