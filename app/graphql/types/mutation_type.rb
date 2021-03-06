module Types
  class MutationType < Types::BaseObject
    implements ::Types::GraphqlAuth

    field :create_product, mutation: Mutations::CreateProduct
    field :create_direct_upload, mutation: Mutations::CreateDirectUpload
    field :create_review, mutation: Mutations::CreateReview
    field :delete_review, mutation: Mutations::DeleteReview
    field :add_product_to_basket, mutation: Mutations::AddProductToBasket
  end
end
