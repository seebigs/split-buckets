const getBucket = require('./getBucket.js');

describe('getBucket', () => {

    const id = 'abc';
    const groupName = 'test1';
    const allocations = [
        {
            weight: 0.5,
            value: 'one',
        },
        {
            weight: 0.5,
            value: 'two',
        },
    ];

    it('handles missing bucket config', () => {
        expect(getBucket()).toBe(undefined);
    });

    it('changes based on id', () => {
        expect(getBucket('XXX-XXX-XXX', groupName, allocations)).toBe('one');
        expect(getBucket('ZZZ-ZZZ-ZZZ', groupName, allocations)).toBe('two');
    });

    it('changes based on groupName', () => {
        expect(getBucket(id, 'foo', allocations)).toBe('one');
        expect(getBucket(id, 'bar', allocations)).toBe('two');
    });

    it('changes based on seed', () => {
        expect(getBucket(id, groupName, allocations, 1)).toBe('two');
        expect(getBucket(id, groupName, allocations, 2)).toBe('one');
    });

});
