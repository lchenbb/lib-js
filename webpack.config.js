const path = require('path');

module.exports = [
	{
		mode: 'production',
		entry: {
			'pryv': './src/index.js',
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
			libraryTarget: 'var',
			library: 'Pryv'
		},
		// Loaders
		module: {
			rules: [
				// JavaScript Files
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				// CSS Files
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				}
			]
		},
		devtool: 'source-map',
	},
	{
		mode: 'development',
		entry: {
			'pryv': './src/index.js',
		},
		output: {
			filename: '[name]-dev.js',
			path: path.resolve(__dirname, 'dist/tests/'),
			libraryTarget: 'var',
			library: 'Pryv'
		},
		// Loaders
		module: {
			rules: [
				// JavaScript/JSX Files
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				// CSS Files
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				}
			]
		},
		devtool: 'source-map',
	},
	{
		mode: 'development',
		entry: {
			'browser-tests': './test/browser-index.js',
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist/tests/'),
			libraryTarget: 'var',
			library: 'browserTest'
		},
		// Loaders
		module: {
			rules: [
				// JavaScript/JSX Files
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				// CSS Files
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				}
			]
		},
		devtool: 'source-map',
	}
];
