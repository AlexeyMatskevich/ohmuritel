require "search_object"
require "search_object/plugin/graphql"

module Resolvers
  class Products < BaseResolver
    include SearchObject.module(:graphql)
    include ProductsOrder

    type types[Types::ProductType]

    scope { Product.all }

    option :order, type: Enums::ProductOrder, description: "Product order", default: "creation"
    option :pageSize, type: types.Int, description: "Page size", required: true, with: :apply_page_size
    option :page, type: types.Int, description: "Number of page", required: true, with: :apply_page

    def apply_page_size(scope, value)
      @page_size = value
      scope.limit(value)
    end

    def apply_page(scope, value)
      raise GraphQL::ExecutionError, "Page must be greater than 0" if value <= 0
      scope.offset(@page_size * (value - 1))
    end
  end
end
