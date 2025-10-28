# 🛠 Инструкция по сборке проекта с автоматической генерацией Sitemap

## Проблема

Файлы `package.json` и `vite.config.ts` находятся в режиме **readonly** и не могут быть отредактированы для добавления автоматической генерации sitemap.xml при сборке.

## Решение

Созданы альтернативные build-скрипты, которые выполняют два шага:
1. **Генерация sitemap.xml** из backend API
2. **Сборка проекта** через `npm run build`

---

## 📋 Доступные варианты сборки

### Вариант 1: Node.js скрипт (рекомендуется)

**Кросс-платформенный** - работает на Windows, macOS, Linux

```bash
node build.js
```

**Преимущества:**
- Работает везде, где установлен Node.js
- Цветной вывод в консоль
- Обработка ошибок
- Не требует дополнительных прав

---

### Вариант 2: Bash скрипт (Linux/macOS)

```bash
# Сначала дайте права на выполнение (один раз)
chmod +x build.sh

# Запуск
./build.sh
```

или

```bash
bash build.sh
```

---

### Вариант 3: PowerShell скрипт (Windows)

```powershell
.\build.ps1
```

---

## 🔄 Что происходит при сборке?

### Шаг 1: Генерация sitemap.xml

Скрипт `scripts/generate-sitemap.js` выполняет:

1. Отправляет запрос к backend API:
   ```
   https://functions.poehali.dev/ef8dba09-e4a9-4cda-8f1c-29b8444eea2a
   ```

2. Получает динамический XML с актуальными страницами из базы данных

3. Сохраняет файл в `public/sitemap.xml`

4. Выводит информацию о размере файла

### Шаг 2: Сборка проекта

Запускается стандартная команда `npm run build` (или `vite build`), которая:

1. Компилирует TypeScript
2. Оптимизирует React компоненты
3. Минифицирует CSS/JS
4. Копирует файлы из `public/` (включая новый sitemap.xml) в `dist/`

---

## 📦 Результат

После успешной сборки:

- **dist/sitemap.xml** - актуальный sitemap со всеми страницами
- **dist/** - готовая сборка для деплоя

---

## ⚙️ Как работают скрипты

### build.js (Node.js)

```javascript
1. Запускает node scripts/generate-sitemap.js
2. Ждет завершения генерации sitemap
3. Запускает npm run build
4. Ждет завершения сборки
5. Выводит сообщение об успехе
```

**Обработка ошибок:**
- Если sitemap не сгенерировался - процесс останавливается
- Если сборка провалилась - выводится ошибка

### build.sh (Bash)

Аналогичная логика для Linux/macOS с использованием bash

### build.ps1 (PowerShell)

Аналогичная логика для Windows PowerShell

---

## 🚀 Использование в CI/CD

### GitHub Actions

```yaml
- name: Build project with sitemap
  run: node build.js
```

### GitLab CI

```yaml
build:
  script:
    - node build.js
```

### Docker

```dockerfile
RUN node build.js
```

---

## 🔍 Проверка результата

После сборки проверьте:

```bash
# Проверка наличия файла
ls -lh dist/sitemap.xml

# Просмотр содержимого (первые 20 строк)
head -n 20 dist/sitemap.xml
```

---

## ❓ FAQ

### Q: Почему не используется prebuild hook в package.json?

**A:** Файл `package.json` находится в режиме readonly и не может быть изменен.

### Q: Почему не используется Vite плагин напрямую?

**A:** Файл `vite.config.ts` также readonly. Плагин создан (`vite-plugin-sitemap.ts`), но не может быть подключен в конфиг.

### Q: Можно ли использовать старый способ сборки?

**A:** Да, `npm run build` продолжает работать, но без автоматической генерации sitemap.xml

### Q: Что делать, если API недоступен?

**A:** Скрипт завершится с ошибкой. Проверьте доступность:
```bash
curl https://functions.poehali.dev/ef8dba09-e4a9-4cda-8f1c-29b8444eea2a
```

---

## 📝 Ручная генерация sitemap (без сборки)

Если нужно просто обновить sitemap без сборки:

```bash
node scripts/generate-sitemap.js
```

Файл будет создан в `public/sitemap.xml`

---

## 🎯 Рекомендации

1. **Используйте `node build.js`** как основной способ сборки
2. Добавьте в `.gitignore` если нужно:
   ```
   public/sitemap.xml
   ```
3. В CI/CD используйте только `node build.js`
4. Проверяйте логи сборки на наличие ошибок генерации sitemap

---

## 📊 Структура файлов

```
project/
├── build.js              # ✅ Кросс-платформенный build скрипт
├── build.sh              # ✅ Bash скрипт для Linux/macOS
├── build.ps1             # ✅ PowerShell скрипт для Windows
├── scripts/
│   └── generate-sitemap.js  # 🔄 Генератор sitemap
├── public/
│   └── sitemap.xml       # 📄 Генерируется автоматически
├── vite-plugin-sitemap.ts   # 🔌 Плагин (не используется, т.к. vite.config.ts readonly)
└── dist/                 # 📦 Результат сборки
    └── sitemap.xml       # ✅ Копируется из public/
```
