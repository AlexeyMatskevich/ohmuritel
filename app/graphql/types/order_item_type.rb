module Types
  class OrderItemType < Types::BaseObject
    description "Order position data"

    field :id, ID, "ID of the order", null: false
    field :product, ProductType, "Product", null: false
    field :quantity, Integer, "Product price", null: false
  end
end
