FROM php:8.2-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip mbstring \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan config:cache && php artisan route:cache

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=$PORT