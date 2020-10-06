/**
 * Pretty sure this config file is ONLY used for Jest, not for actual webpack :/
 */

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};
