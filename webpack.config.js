const Uglify = require('uglifyjs-webpack-plugin');
const Webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const path = require('path');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
    entry: [
        path.resolve(__dirname, 'assets') + '/development/js/scripts.js',
        path.resolve(__dirname, 'assets') + '/development/scss/style.scss',
    ],
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: 'bundle[chunkhash:8].min.js',
        crossOriginLoading: 'anonymous',
    },
    watch: true,
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:  /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    { loader: 'svg-sprite-loader', options: { } },
                    'svg-fill-loader',
                    'svgo-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new Uglify({
            test: /\.js(\?.*)?$/i,
            exclude: /\/node_modules/,
            parallel: true,
            sourceMap: true,
        })],
    },
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new LiveReloadPlugin({}),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle[chunkhash:8].min.css',
            chunkFilename: '[chunkhash:8].min.css'
        }),
        new HtmlBeautifyPlugin({
            replace: ['type="text/javascript"']
        }),
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha512'],
            enabled: true,
        }),
    ],
};
