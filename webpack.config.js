const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/ts/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              }
            }
          }
        ]
      },
      {
        test: /\.png$/,
        loader: 'file-loader?name=./img/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|otf|eot|ttf|svg)$/,
        loader: 'file-loader?name=./font/[name].[ext]'
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader?name=./music/[name].[ext]',
      }
    ],
  },
  resolve: {
    extensions: [".ts"]
  }
}
