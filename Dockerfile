FROM composer:2 AS dependencies

WORKDIR /app/backend
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader

FROM php:8.3-cli

WORKDIR /app/backend
RUN docker-php-ext-install pdo pdo_sqlite

COPY --from=dependencies /app/backend/vendor ./vendor
COPY backend .

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database

CMD ["sh", "-c", "mkdir -p database && touch database/database.sqlite && php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
