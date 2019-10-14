ARG GEMFILE_SHA
ARG YARN_SHA
FROM alexeymatskevichflatstack/ohmuritel-rails-node:$GEMFILE_SHA$YARN_SHA

ARG RAILS_ENV

COPY . /app/

RUN RAILS_ENV=$RAILS_ENV SECRET_KEY_BASE=$(bundle exec rake secret) bundle exec rails assets:precompile