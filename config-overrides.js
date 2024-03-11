module.exports = function override(config, env) {
    config.ignoreWarnings = [
        {
            module: /node_modules/,
            message: /Failed to parse source map/,
        },
    ];

    return config;
};