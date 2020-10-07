const SplitBuckets = require('./index.js');

describe('SplitBuckets', () => {

    it('#getBucket', () => {
        const split = new SplitBuckets('test1', [
            {
                weight: 0.5,
                value: 'one',
            },
            {
                weight: 0.5,
                value: 'two',
            },
        ]);
        expect(split.getBucket('XXX')).toBe('one');
        expect(split.getBucket('YYY')).toBe('two');
    });

    it('handles missing bucket config', () => {
        expect(new SplitBuckets().getBucket('id')).toBe(undefined);
    });

});
