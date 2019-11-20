module Types
  class ProductEdgeType < GraphQL::Types::Relay::BaseEdge
    node_type(ProductType)
  end
end
