import { defineConfig } from 'vite'

export default defineConfig({
    base: '/rock-paper-scissors/', // or '/' if repo is user/organization page
    build: {
        outDir: 'docs'
    }
})