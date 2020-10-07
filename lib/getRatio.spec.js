const { nanoid } = require('nanoid');
const getRatio = require('./getRatio.js');

describe('getRatio', () => {

    it('handles missing key', () => {
        expect(getRatio()).toEqual(expect.any(Number));
    });

    it('returns a ratio', () => {
        const ratio = getRatio('foo');
        expect(ratio).toEqual(expect.any(Number));
        expect(ratio).toBeGreaterThan(0);
        expect(ratio).toBeLessThan(1);
    });

    it('is deterministic', () => {
        expect(getRatio('XXX-XXX-XXX')).toBe(getRatio('XXX-XXX-XXX'));
    });

    it('is well distributed', () => {
        const reps = 1000000;
        const results = {};
        for (let i = 0; i < 10; i += 1) {
            results[i] = 0;
        }
        for (let i = 0; i < reps; i += 1) {
            const id = nanoid();
            const bucket = parseInt(getRatio(id) * 10, 10);
            results[bucket] += 1;
        }
        for (let i = 0; i < 10; i += 1) {
            expect(results[i]).toBeLessThan(reps * 0.101);
        }
    });

});
