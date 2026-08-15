FROM composer:2 AS dependencies

WORKDIR /app/backend
COPY backend/composer.json backend/composer.lock ./
# Les scripts Laravel appellent artisan, qui n'est copié que dans l'étape finale.
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader --no-scripts

FROM php:8.3-cli

WORKDIR /app/backend
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev pkg-config \
    && docker-php-ext-install pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

COPY --from=dependencies /app/backend/vendor ./vendor
COPY backend .

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database \
    && php artisan package:discover --ansi

CMD ["sh", "-c", "export APP_KEY=\"${APP_KEY:-base64:$(php -r 'echo base64_encode(random_bytes(32));')}\" && mkdir -p database && touch database/database.sqlite && php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
