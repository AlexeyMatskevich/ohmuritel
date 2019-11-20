module Types
  class ProductConnection < GraphQL::Types::Relay::BaseConnection
    edge_type(ProductEdgeType)

    field :total_count, Integer, null: false

    def total_count
      object.nodes.size
    end
  end
end