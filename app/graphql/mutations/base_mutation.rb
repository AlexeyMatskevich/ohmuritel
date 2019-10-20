module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    field :errors, [Types::AttributesError], null: false

    def add_attribute_errors(obj)
      errors = obj.errors.map { |attribute, message|
        path = [attribute]
        {
          path: path,
          message: message,
        }
      }
      {
        "#{obj.model_name}": obj,
        errors: errors,
      }
    end
  end
end
