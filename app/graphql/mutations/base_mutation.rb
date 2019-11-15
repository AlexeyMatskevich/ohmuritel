module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    include ActionPolicy::GraphQL::Behaviour

    field :errors, [Types::AttributesError], null: false
    field :success, Boolean, null: false

    def valid(obj)
      {
        errors: [],
        success: true,
        "#{obj.class.to_s.camelize(:lower)}": obj,
      }
    end

    def invalid(obj)
      {
        errors: add_attribute_errors(obj),
        success: false,
        "#{obj.class.to_s.camelize(:lower)}": nil,
      }
    end

    def add_attribute_errors(obj)
      obj.errors.messages.map do |field, messages|
        {field: field.to_s.camelize(:lower), message: messages.first.capitalize}
      end
    end
  end
end
