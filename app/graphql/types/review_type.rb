module Types
  class ReviewType < Types::BaseObject
    description "Data of review"

    field :id, ID, null: false, description: "ID of the review"
    field :body, String, null: false, description: "Review body"
    field :rating, Integer, null: false, description: "Review rating"
    field :user, UserType, null: false, description: "Review author"
    field :product, ProductType, null: false, description: "Related product"
  end

  def user
    RecordLoader.for(User).load(obj.user_id)
  end

  def product
    RecordLoader.for(product).load(obj.user_id)
  end
end
