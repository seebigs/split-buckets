const SplitBuckets = require('./index.js');

describe('SplitBuckets', () => {

    it('#getBucket', () => {
        const split = new SplitBuckets('test1', [
            {
                weight: 0.5,
                value: 'red',
            },
            {
                weight: 0.5,
                value: 'blue',
            },
        ]);
        expect(split.getBucket('XXX-XXX-XXX')).toBe('red');
        expect(split.getBucket('ZZZ-ZZZ-ZZZ')).toBe('blue');
    });

    it('handles missing bucket config', () => {
        expect(new SplitBuckets().getBucket('id')).toBe(undefined);
    });

});
