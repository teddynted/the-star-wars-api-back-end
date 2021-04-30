const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
    plugins: [
        new CompressionPlugin({
            algorithm: 'gzip'
        }),
        new CopyWebpackPlugin([
            { copyPermissions: true, from: '.github/**' },
            { copyPermissions: true, from: 'resolvers/**' },
            { copyPermissions: true, from: 'schema.js' },
        ])
    ]
};
