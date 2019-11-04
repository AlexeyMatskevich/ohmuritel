Rails.application.routes.draw do
  devise_for :users, skip: :all

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  root "ohmuritel#index"

  # IMPORTANT #
  # This `match` must be the *last* route in routes.rb
  match "*path", to: "ohmuritel#index", via: :all
end
