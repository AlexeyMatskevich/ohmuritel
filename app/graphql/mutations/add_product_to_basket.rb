module Mutations
  class AddProductToBasket < BaseMutation
    argument :id, ID, "ID of products", required: true

    def resolve(id:)
      user = context[:current_user]

      return unauthenticated if user.blank?

      order = Order.find_or_create_by(user: User.first)

      OrderItem.create!(order: order, product_id: id)

      valid
    end
  end
end
