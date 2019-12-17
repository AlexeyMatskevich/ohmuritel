require "search_object"
require "search_object/plugin/graphql"

module Resolvers
  class ProductsConnection < BaseResolver
    include SearchObject.module(:graphql)
    include ProductsOrder

    type Types::ProductType.connection_type, null: false
    scope { Product.all }

    option :order, type: Enums::ProductOrder, description: "Product order", default: "creation"
  end
end
