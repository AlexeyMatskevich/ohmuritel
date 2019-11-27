module Types
  class ReviewType < Types::BaseObject
    description "Data of review"

    field :id, ID, "ID of the review", null: false
    field :body, String, "Review body", null: false
    field :rating, Integer, "Review rating", null: false
    field :author, UserType, "Review author", null: false
    field :product, ProductType, "Related product", null: false

    def author
      AssociationLoader.for(object.class, :user).load(object)
    end
  end
end
