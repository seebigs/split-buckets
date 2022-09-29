# split-buckets
An installable library that will randomly group into evenly distributed buckets and give you the same result every time

- Perfect for A/B testing
- Release experiences only to a percentage of traffic
- Sticky by user id for consistent experiences (no cookies needed)
- Divide into as many buckets as you want

## Install
```
npm install split-buckets
```
Works in NodeJs and in browser bundles

## Use
```js
import SplitBuckets from 'split-buckets';

const test1 = new SplitBuckets('test1', [
    {
        weight: 0.5,
        value: 'red',
    },
    {
        weight: 0.5,
        value: 'blue',
    },
]);

test1.getBucket('XXX-XXX-XXX'); // returns 'red'
test1.getBucket('ZZZ-ZZZ-ZZZ'); // returns 'blue'
```
This creates a 50/50 split betwen "red" and "blue".

## new SplitBuckets()
```js
new SplitBuckets(groupName, allocations, seed)
```

### groupName {String}
A unique label for this group of buckets

The same `id` will always fall into the same bucket when given the same `groupName`, so providing a unique `groupName` will prevent users from always receiving the same type of experiences (always in the first bucket etc.)

### allocations {Array}
Defines how to split users into buckets. You can create as many buckets as you want, but the total percentage allocated cannot exceed 100%.

```js
[
    {
        weight: 0.05,
        value: 'one',
    },
    {
        weight: 0.15,
        value: 'two',
    },
]
```
- `weight` is what percentage of the total population should be allocated into that bucket. Number between 0 and 1.
- `value` will be returned when the `id` falls into that bucket. Can be any type of data.

Unallocated space means that some results will not fall into any of the buckets. For example, if you allocate 5% to bucket "one" and 15% to bucket "two" then 80% of the results will fall into bucket `undefined`

|"one"|"two"|undefined|
|---|---|---|
|--5--|------15-------|---------------------------------------80---------------------------------------|

### seed {Integer} [optional]
Used to compute the hash that determines which bucket and `id` belongs to

A custom seed is not necessary, but providing one keeps your results from being predictable unless the seed is known. Please note that using a seed based on timestamp or other variable values will destroy the stickiness that keeps an `id` in the same bucket each time.

## Methods

### getBucket(id)
Find which bucket a given `id` belongs to

Takes an `id` and returns the `value` of the bucket to which it has been allocated. The result is deterministic and will be the same every time.

## Algorithm

Bucketing is done using [MurmurHash3](https://www.sderosiaux.com/articles/2017/08/26/the-murmur3-hash-function--hashtables-bloom-filters-hyperloglog/) ported from [GaryCourt's implementation](https://github.com/garycourt/murmurhash-js).
