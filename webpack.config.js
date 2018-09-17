const path = require('path');

const config = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'countdown.js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map'
};

module.exports = config;
