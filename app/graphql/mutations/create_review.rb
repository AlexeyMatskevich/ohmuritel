module Mutations
  class CreateReview < BaseMutation
    argument :body, String, required: true, description: "New products name"
    argument :rating, Integer, required: true, description: "New products weight"
    argument :product_id, ID, required: true, description: "New products description for preview page"

    field :review, Types::ReviewType, null: true

    def resolve(body:, rating:, product_id:)
      review = Review.new(body: body, rating: rating, product_id: product_id, user: context[:current_user])

      authorize! review, to: :create?

      if review.save
        valid(review)
      else
        invalid(review)
      end
    end
  end
end
