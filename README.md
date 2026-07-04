# Sci-Steel Assistant Page

Интерактивная static-страница для GitHub Pages, собранная по `tz_page.md` и архитектуре текущего проекта.

## Что внутри

- React + Vite + TypeScript.
- TailwindCSS для dark-first UI.
- Framer Motion для micro-interactions и lifecycle-анимаций.
- Mermaid.js для финальной архитектурной диаграммы.
- JSON-driven контент: `src/data/architecture.json` и `src/data/sections.json`.
- Локальные ассеты в `public/media/`, поэтому сборка не зависит от внешних изображений.

## Локальный запуск

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Готовые файлы появятся в `dist/`.

## GitHub Pages

В репозитории уже есть workflow `.github/workflows/deploy.yml`. Он собирает Vite-проект и публикует `dist` в GitHub Pages при push в `main`.

Минимальная форма этого workflow:

```yaml
name: Deploy Sci-Steel Assistant Page

on:
  push:
    branches: [main]
    paths:
      - "sci-steel-assistant-page/**"

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - uses: pnpm/action-setup@v4
        with:
          version: 11.7.0
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

Если деплой выполняется вручную, опубликуйте содержимое `sci-steel-assistant-page/dist`. В `vite.config.ts` установлен `base: './'`, поэтому сайт работает как project page и как standalone artifact.
