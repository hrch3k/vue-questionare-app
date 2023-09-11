let entry = process.argv.pop()
if (entry && entry.indexOf('.js') === -1) {
  entry = null
}

const { defineConfig } = require('@vue/cli-service')

module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8888',
        ws: false,
      }
    }

  },
  pages: {
    index: {
      // Replace with your .js entry file path. 
      // To see the quiz example, use 'examples/quiz/main.js'
      // To see the support page example, use 'examples/support-page/main.js'
      entry: entry || 'examples/questionnaire/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}

