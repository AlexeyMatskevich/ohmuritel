module Types
  class OrderType < Types::BaseObject
    description "Order data"

    field :id, ID, "ID of the order", null: false
    field :user, UserType, "Basket owner", null: false
    field :order_items, [OrderItemType], "Order positions", null: false
    field :order_count, Int, "Order count", null: false

    def order_count
      object.order_items.sum(:quantity)
    end
  end
end
