import { defineConfig } from 'vite';

export default defineConfig({
  // 使用相对路径，确保在 GitHub Pages 的二级目录下也能正确加载资源
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 确保构建后的代码不会因为混淆导致某些 ID 无法匹配
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
