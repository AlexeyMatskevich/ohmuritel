unless ENV["RAILS_ENV"] == "production"
  GraphQL::RailsLogger.configure do |config|
    config.skip_introspection_query = true
  end
end
