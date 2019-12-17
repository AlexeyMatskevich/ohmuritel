module Types
  class AttributesError < Types::BaseObject
    description "Form error"

    field :field, String, "Field of the error", null: false
    field :message, String, "Error message", null: false
    field :details, GraphQL::Types::JSON, "Error details", null: true
  end
end
