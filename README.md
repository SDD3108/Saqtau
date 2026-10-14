# Saqtau AI

Корпоративный сайт SaqtauAI. Обычный Next.js App Router, React, Tailwind CSS, shadcn/ui, Axios, i18next (RU / EN / KZ), Zustand, Zod, JWT и Lucide.

## Запуск

Нужен Node.js 22.13+ (рекомендуется Node.js 24 LTS). Откройте корневую папку `Saqtau-next`, содержащую `package.json`, `front-end` и `backend`:

```bash
npm install
npm run dev
```

Сайт: http://localhost:3000. API: http://127.0.0.1:4000.
Одна команда запускает оба процесса; Ctrl+C останавливает их. Заявки работают локально сразу, без Cloudflare и внешней базы данных. SQLite-файл создаётся автоматически в `backend/data/demo.sqlite`, не попадает в Git и сохраняется между запусками. В разработке временный JWT-ключ создаётся автоматически при старте сервера.

Если запускаете из папок отдельно, сначала выполните `npm install` в корне, затем в двух терминалах:

```bash
cd front-end
npm run dev
```

```bash
cd backend
npm run dev
```

## Структура, как в SDD3108/Diploma

- `front-end/app` — маршруты App Router, layout и глобальные стили.
- `front-end/src/pageBuilders/MainPageBuilder` — сборка главной страницы.
- `front-end/src/common/header`, `footer` — общие шапка и подвал.
- `front-end/src/components/sections` — Hero, Technology, App, Progress, Team, FAQ, CTA.
- `front-end/src/components/Logo`, `Wave`, `Countdown` — небольшие компоненты.
- `front-end/src/feature/DemoRequest` — форма и её валидация.
- `front-end/src/hooks` — хук таймера.
- `front-end/src/store/DemoStore` — Zustand.
- `front-end/src/ui` — используемые компоненты shadcn/ui.
- `front-end/src/utils` — Axios-клиент, тексты, вспомогательные функции.
- `front-end/i18n.js` — настройка переводов.
- `front-end/public` — логотип, фото, изображения приложения.
- `backend/server.js` — сервер Express.
- `backend/src/routes`, `services`, `db`, `validation` — API, JWT, SQLite, Zod.

Прикладной код — JavaScript/JSX. Алиас `@/` указывает на `front-end/`, поэтому импорты выглядят как `@/src/ui/button`, аналогично Diploma. Папка `app` находится рядом с `src`, как в проекте-образце.

## Проверки и production

```bash
npm run lint
npm test
npm run build
```

Для production скопируйте `backend/.env.example` в `backend/.env`. Укажите:

- `DEMO_JWT_SECRET`: случайная строка минимум 32 символа. Можно сгенерировать через `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`.
- `FRONTEND_ORIGIN`: реальный origin сайта, например `https://saqtauai.com`, без пути.
- `DATABASE_PATH`: путь к SQLite на постоянном диске; относительный путь отсчитывается от `backend/`.
- `HOST`: по умолчанию `127.0.0.1`; для контейнера может понадобиться `0.0.0.0`.

Запустите backend с `NODE_ENV=production`, затем Next.js через `npm run start -w front-end`. На одном Node.js-сервере после сборки можно запустить оба через `npm start` при установленном `NODE_ENV=production`.

При раздельном размещении задайте `BACKEND_URL` в окружении frontend **до `npm run build`**: Next.js rewrites проксирует `/api/*` на сервер. Для локального запуска используется `http://127.0.0.1:4000`. Деплой frontend в Vercel возможен; backend должен работать отдельно на Node.js-хостинге с постоянным диском. SQLite не предназначен для временного файлового хранилища serverless-функций. Существующая закрытая версия ChatGPT Sites остаётся старым предпросмотром и не обновляется этим архивом.

## Поведение

Сохранены дизайн, адаптивность, галерея, 3 языка, плавающая шапка, форма, разделы о компании и точный таймер `2026-10-20T14:00:00+05:00`. После нуля появляется сообщение о наступлении плановой даты, а не неподтверждённое утверждение о доступности в магазинах.

`GET /api/demo` выдаёт JWT на 30 минут; `POST /api/demo` проверяет origin, JWT, JSON и Zod, сохраняет данные в SQLite. Повторный email не создаёт дубль. Есть honeypot, ограничение размера запроса и лимит запросов. Лимит по IP без доверия к произвольным forwarded-заголовкам; если сайт находится за reverse proxy, настройте доверенные proxy и per-client rate limiting перед массовым запуском.

Форма сохраняет заявки, но не отправляет email. Публичного endpoint для чтения заявок нет. JWT здесь защищает запрос формы и не является авторизацией пользователя. Ранее собранные заявки в базе опубликованного Sites не переносятся автоматически.

Секреты, зависимости и результаты сборки не входят в архив. Vite, Vinext, Cloudflare Workers и D1 в этой версии не используются.
