FROM composer:2 AS dependencies

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader

FROM php:8.3-cli

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_sqlite

COPY --from=dependencies /app/vendor ./vendor
COPY . .

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database

# Pour une démo publique, l'initialisation de SQLite est relancée au démarrage.
# Une base managée doit être préférée pour une mise en production durable.
CMD ["sh", "-c", "php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
