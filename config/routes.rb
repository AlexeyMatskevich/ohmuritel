Rails.application.routes.draw do
  devise_for :users, skip: :all

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  root "ohmuritel#index"

  get "*all", to: "ohmuritel#index", constraints: lambda { |req|
    req.path.exclude? "rails/active_storage"
  }
end
