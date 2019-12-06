source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.6.5"

gem "rails", "~> 6.0.0"
gem "pg", ">= 0.18", "< 2.0"
gem "puma", "~> 4.3"
gem "sass-rails", "~> 5"
gem "webpacker", "~> 4.0"
gem "bcrypt", "~> 3.1.7"
gem "bootsnap", ">= 1.4.2", require: false
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "graphql", "~> 1.9"
gem "graphql-batch", "~> 0.4.1"
gem "aasm", "~> 5.0"
gem "graphql-auth", git: "https://github.com/AlexeyMatskevich/graphql-auth.git"
gem "rack-cors", "~> 1.0"
gem "action_policy-graphql", "~> 0.3.1"
gem "enumerize", "~> 2.3"
gem "aws-sdk-s3", "~> 1.53", require: false
gem "elasticsearch-rails", "~> 7.0"
gem "elasticsearch-model", "~> 7.0"
gem "searchkick", "~> 4.1"
gem "autosuggest", "~> 0.1.0"
gem "activerecord-import", "~> 1.0"
gem "hairtrigger", "~> 0.2.23"
gem "search_object_graphql", "~> 0.3"
gem "faker", "~> 2.7"
gem "friendly_id", "~> 5.3"
gem 'bonsai-elasticsearch-rails', github: 'omc/bonsai-elasticsearch-rails', branch: 'master'

group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "pry", "~> 0.12.2"
  gem "rspec-rails", "= 4.0.0.beta3"
  gem "rspec-graphql_matchers", "~> 1.1"
  gem "shoulda-matchers", "~> 4.1"
  gem "graphql-rails_logger", "~> 1.2"
  gem "factory_bot_rails", "~> 5.0"
  gem "rubocop-rspec", "~> 1.36"
  gem "rubocop-rails", "~> 2.3"
  gem "crystalball", "~> 0.7.0"
  gem "database_consistency", "~> 0.7.4"
  gem "bundler-audit", "~> 0.6.1"
  gem "brakeman", "~> 4.6"
  gem "standard"
end

group :development do
  gem "git", "~> 1.5"
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "sniffer", "~> 0.3.2"
  gem "graphiql-rails"
  gem "letter_opener", "~> 1.7"
  gem "awesome_print", "~> 1.8"
  gem "pry-rails", "~> 0.3.9"
  gem "meta_request", "~> 0.7.2"
end
