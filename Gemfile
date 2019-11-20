source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.6.5"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 6.0.0"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
# Use Puma as the app server
gem "puma", "~> 3.11"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5"
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem "webpacker", "~> 4.0"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
gem "bcrypt", "~> 3.1.7"

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.2", require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "pry", "~> 0.12.2"
  gem "rspec-rails", "= 4.0.0.beta2"
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
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "git", "~> 1.5"
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "sniffer", "~> 0.3.2"
  gem "graphiql-rails"
  gem "letter_opener", "~> 1.7"
  gem "awesome_print", "~> 1.8"
  gem "pry-rails", "~> 0.3.9"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "graphql", "~> 1.9"
gem "graphql-batch", "~> 0.4.1"
gem "aasm", "~> 5.0"
gem "graphql-auth", git: "https://github.com/AlexeyMatskevich/graphql-auth.git"
gem "rack-cors", "~> 1.0"
gem "action_policy-graphql", "~> 0.3.1"
gem "enumerize", "~> 2.3"
gem "aws-sdk-s3", "~> 1.53", require: false
gem "faker", "~> 2.7"
