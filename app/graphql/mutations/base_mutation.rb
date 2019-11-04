module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    field :errors, [Types::AttributesError], null: false

    def add_attribute_errors(obj)
      obj.errors.messages.map do |field, messages|
        {field: field.to_s.camelize(:lower), message: messages.first.capitalize}
      end
    end
  end
end
