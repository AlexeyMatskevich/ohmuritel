module Mutations
  class AddProductToBasket < BaseMutation
    argument :id, ID, "ID of products", required: true

    def resolve(id:)
      user = context[:current_user]

      return unauthenticated if user.blank?

      order = Order.find_or_create_by(user: user)

      order_item = OrderItem.find_by(order: order, product_id: id)

      order_item ? order_item.update(quantity: order_item.quantity + 1) : OrderItem.create(order: order, product_id: id)

      valid
    end
  end
end
