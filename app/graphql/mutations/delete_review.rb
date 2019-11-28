module Mutations
  class DeleteReview < BaseMutation
    argument :id, ID, "Review id", required: true

    def resolve(id:)
      review = Review.find(id)

      authorize! review, to: :destroy?

      review.destroy ? {errors: [], success: true} : {errors: add_attribute_errors(review), success: false}
    end
  end
end
