module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],plugins: [
    // 使用babel-plugin-component按需导入element ui组件
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
