import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "d11d5521d667.ngrok-free.app",
      "http://127.0.0.1:4040"
    ]
  }
});
