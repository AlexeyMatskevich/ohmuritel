module Mutations
  class CreateReview < BaseMutation
    argument :body, String, required: true do
      description "New products name"
    end

    argument :rating, Integer, required: true do
      description "New products weight"
    end

    argument :product_id, ID, required: true do
      description "New products description for preview page"
    end

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
