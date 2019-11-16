module Types
  class MutationType < Types::BaseObject
    implements ::Types::GraphqlAuth

    field :create_product, mutation: Mutations::CreateProduct
    field :create_direct_upload, mutation: Mutations::CreateDirectUpload
  end
end
