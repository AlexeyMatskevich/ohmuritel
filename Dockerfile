FROM alexeymatskevichflatstack/ohmuritel-rails-node:1.0.1

ARG RAILS_ENV

COPY . /app/

RUN RAILS_ENV=$RAILS_ENV SECRET_KEY_BASE=$(bundle exec rake secret) bundle exec rails assets:precompile