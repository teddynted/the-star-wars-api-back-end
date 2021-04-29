const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
    mode: 'production',
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.graphql$/,
                use: [{ loader: 'graphql-import-loader' }]
            }
        ],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
};
