# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Codespaces backend environment variable

This frontend uses `import.meta.env.VITE_CODESPACE_NAME` to build backend URLs automatically when running inside GitHub Codespaces.

- If `VITE_CODESPACE_NAME` is defined, the frontend will call `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`.
- If `VITE_CODESPACE_NAME` is not defined, the frontend falls back to `http://localhost:8000/api/[component]/`.

Create a local `.env.local` file with a value for `VITE_CODESPACE_NAME`, or copy `.env.local.example` for the expected format.
