import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

const devConfig = {
    server: {
        port: 3000,
        cors: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5001',
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: (proxy, _options) => {
                    proxy.on('error', (err, _req, _res) => {
                        console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                },
            }
        }
    },
};

const prodConfig = {
    base: '/app/',
    server: {
        port: 5000,
        cors: true,
        proxy: {
            '/api': {
                target: import.meta.env.VITE_API_URL,
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: (proxy, _options) => {
                    proxy.on('error', (err, _req, _res) => {
                        console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                },
            }
        }
    },
}
const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

// https://vitejs.dev/config/
export default defineConfig({
    base: '/', // This is the equivalent of the publicPath
    envDir: '../', // This is the equivalent of the path to the .env file in the root directory

    // For the build, we want to put the assets in the static directory
    build: {
        assetsDir: "static",
    },
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    ...config
})