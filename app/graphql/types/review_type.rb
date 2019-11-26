module Types
  class ReviewType < Types::BaseObject
    description "Data of review"

    field :id, ID, null: false, description: "ID of the review"
    field :body, String, null: false, description: "Review body"
    field :rating, Integer, null: false, description: "Review rating"
    field :author, UserType, null: false, description: "Review author"
    field :product, ProductType, null: false, description: "Related product"

    def author
      AssociationLoader.for(object.class, :user).load(object)
    end
  end
end
