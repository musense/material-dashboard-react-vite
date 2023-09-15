import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: '@actions', replacement: path.resolve(__dirname, 'src/actions/') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api/') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets/') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components/') },
      { find: '@hook', replacement: path.resolve(__dirname, 'src/hook/') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts/') },
      { find: '@reducers', replacement: path.resolve(__dirname, 'src/reducers/') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store/') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils/') },
      { find: '@views', replacement: path.resolve(__dirname, 'src/views/') },
    ]
  },
  server: {
    port: 80
  },
  preview: {
    port: 80
  },
})

