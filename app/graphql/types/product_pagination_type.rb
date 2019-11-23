module Types
  class ProductPaginationType < Types::BaseObject
    description "Product pages"

    field :total_count, Int, null: false, description: "Number of page"
    field :pages, [ProductPagesType], null: false, description: "Returns a list of pages"
  end
end
