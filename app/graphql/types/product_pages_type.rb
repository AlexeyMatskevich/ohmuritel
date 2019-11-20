module Types
  class ProductPagesType < Types::BaseObject
    description "Product pages"

    field :id, ID, null: false, description: "Number of page"
    field :products, [Types::ProductType], null: false, description: "Returns a list of products"
  end
end
