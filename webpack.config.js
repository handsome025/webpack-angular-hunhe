var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

function getEntry() {
	var entry = {};
	glob.sync(__dirname + '/app/view-*.js').forEach(function (name) {
		var n = name.match(/view-([^/]+?)\.js/)[1];

		entry[n] = './app/view-'+n+'.js';
	});

	return entry;
}

module.exports = {
	entry: getEntry(),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '/js/[name].js',
		publicPath:"../",
		sourceMapFilename: '[file].map'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2
		}),
		new webpack.ProvidePlugin({
			$: __dirname+'/vendor/jquery-2.1.4.js',
			jQuery: __dirname+'/vendor/jquery-2.1.4.js'
		}),
		new ExtractTextPlugin({
			filename: '/css/style.css',
			allChunks: false
		})
		// new webpack.HotModuleReplacementPlugin()
		// new OpenBrowserPlugin({url:'http://localhost:8888'})
	],
	// devServer: {
	// 	hot: true,
	// 	watchOptions: {
	// 	    aggregateTimeout: 300,
	// 	    poll: 1000
	// 	}
	// },
	resolve: {
		alias: {
			jquery: __dirname+'/vendor/jquery-2.1.4.js',
		},
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|gif|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]?[hash:4]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 8,
							},
							pngquant: {
								quality: '75-90',
								speed: 4
							}
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}]
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader']
				})
			},
			/*{
				test: /\.js$/,
				use: ['script-loader'],
				exclude: /js/
			}*/
		]
	}
}
