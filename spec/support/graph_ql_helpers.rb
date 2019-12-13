module GraphQL
  module TestHelpers
    attr_accessor :gql_response

    # The returned results of a GraphQL query
    # @return [data] this is the bulk of the return to test.
    # @return [error] any time a query, mutation, subscription throws and error
    class GQLResponse
      attr_reader :data, :errors

      def initialize(args)
        @data = args["data"] || nil
        @errors = args["errors"] || nil
      end
    end

    # basic query to interact with the GraphQL API.
    # @param [query]
    def query(query, variables: {}, context: {})
      converted = variables.deep_transform_keys! { |key| key.to_s.camelize(:lower) } || {}

      res = OhmuritelSchema.execute(query, variables: converted, context: context, operation_name: nil)
      @gql_response = GQLResponse.new(res.to_h)
    end

    alias mutation query

    def query_hash(obj)
      obj.serializable_hash
        .except("created_at", "updated_at")
        .merge({"id" => obj[:id].to_s})
        .transform_keys { |key| key.to_s.camelize(:lower) }
    end
  end
end

RSpec.configure do |config|
  config.include GraphQL::TestHelpers
end
