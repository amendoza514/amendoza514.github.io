// module.exports = {
//     entry: "./src/entry.js",
//     output: {
//         filename: "./dist/bundle.js"
//     },
//     devtool: 'source-map'
// }

// module.exports = {
//     entry: "./src/entry.js",
//     output: {
//         filename: "./dist/bundle.js"
//     },
//     devtool: 'source-map'
// }

var path = require('path');
module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.join(__dirname),
        filename: './dist/bundle.js',
        devtoolModuleFilenameTemplate: '[resourcePath]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env']
                    }
                },
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*']
    }
};