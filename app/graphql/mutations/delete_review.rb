module Mutations
  class DeleteReview < BaseMutation
    argument :id, ID, "Review id", required: true

    def resolve(id:)
      review = Review.find(id)

      authorize! review, to: :destroy?

      review.destroy ? valid : invalid(review)
    end
  end
end
