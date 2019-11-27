module Types
  class ProductPagesType < Types::BaseObject
    description "Product pages"

    field :id, ID, "Number of page", null: false
    field :products, [Types::ProductType], "Returns a list of products", null: false
  end
end
