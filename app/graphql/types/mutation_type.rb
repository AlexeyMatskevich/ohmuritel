module Types
  class MutationType < Types::BaseObject
    implements ::Types::GraphqlAuth

    field :create_product, mutation: Mutations::CreateProduct
  end
end
