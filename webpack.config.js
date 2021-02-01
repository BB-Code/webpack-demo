const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssertsWebpackPlugin = require('optimize-css-asserts-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/dist/index'); 
const tsImportPluginFactory = require('ts-import-plugin')
const friendlyErrorsWebapckPlugin = require('friendly-errors-webapck-plugin')
const notifierPlugin = require('node-notifier');
const icon = path.join(__dirname, 'public/icon.jpg')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const SpeedMeasureWebpack5Plugin = require('speed-measure-webapck5-plugin')
const smw = new SpeedMeasureWebpack5Plugin();
module.exports = smw({

})
module.exports ={
    mode: 'development',
    entry: './src/index.js',
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
    },
    optimization:{
        minimize: true,
        minimizer:[
            new TerserWebpackPlugin()
        ]
    },
    scripts: {
        'build':'webpack'
    },
    devServer: {
        port: 3001,
        hot:true,
        open: true,
        contentBase: '../dist'
    },
    plugins:[
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename:'index.html',
            title: 'vue3 + Ts webpack',
            minify:{
                collapseWhitespace: true,//
                removeComments: true
            }
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssertsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new vueLoaderPlugin(),
        new friendlyErrorsWebapckPlugin({
            onErrors: (severity,errors)=>{
                notifierPlugin.notify({
                    title:'webpack compile failed',
                    message: `${severity}${errors[0].name}`,
                    subtitle: errors[0].file || '',
                    icon
                })
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode:'disabled',
            generateStatsFile: true,
        })
    ],
    module: {
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/presets-env'],
                        cacheDirectory:true
                    },
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'src')
                }
            },
            {
                test:'/\.ts$/',
                use: [
                    {
                        loader:'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransforms:()=>({
                                before:[
                                    tsImportPluginFactory({
                                        libraryName:'vant',
                                        libraryDirectory: 'es',
                                        style: (name)=>`${name}/style/less`
                                    })
                                ]
                            }),
                            compileOptions:{
                                module: 'es2015'
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test:/\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'cache-loader',
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        limit: 1024,
                        fallback:{
                            loader: 'file-loader',
                            options:{
                                name: '[name].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                use:[{
                    loader: 'url-loader',
                    options:{
                        limit:1024,
                        fallback:{
                            loader: 'file-loader',
                            options:{
                                name: '[name].[ext]'
                            }
                        }
                    },
                    
                },{
                    loader: 'image-webpack-loader',
                    options:{
                        mozjpeg:{
                            progressive: true
                        },
                        optipng:{
                            enabled: true
                        },
                        gifsicle:{
                            interlaced: false
                        },
                        webp:{
                            quality: 75
                        }
                    }
                }]
               
            }
        ]
    }
}