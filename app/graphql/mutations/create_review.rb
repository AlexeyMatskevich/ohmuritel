module Mutations
  class CreateReview < BaseMutation
    argument :body, String, "New products name", required: true
    argument :rating, Integer, "New products weight", required: true
    argument :product_id, ID, "New products description for preview page", required: true

    field :review, Types::ReviewType, null: true

    def resolve(body:, rating:, product_id:)
      product = Product.friendly.find(product_id)

      review = Review.new(body: body, rating: rating, product: product, user: context[:current_user])

      authorize! review, to: :create?

      review.save ? valid(review) : invalid(review)
    end
  end
end
