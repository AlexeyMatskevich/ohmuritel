require "search_object"
require "search_object/plugin/graphql"

module Resolvers
  class ProductsPages < BaseResolver
    include SearchObject.module(:graphql)
    include Products

    type types[Types::ProductPagesType]

    scope { Product.all }

    option :order, type: Enums::ProductOrder, description: "Product order", default: "creation"
    option :pageSize, type: types.Int, description: "Page size", required: true, with: :apply_page_size
    option :page, type: types.Int, description: "Number of page", required: true, with: :apply_page

    def self.call(object, args, context)
      [{id: args.to_h["page"], products: new(filters: args.to_h, object: object, context: context).results}]
    end

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
