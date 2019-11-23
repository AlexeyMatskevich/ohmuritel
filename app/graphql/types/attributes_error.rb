module Types
  class AttributesError < Types::BaseObject
    description "Form error"

    field :field, String, null: false, description: "Field of the error"
    field :message, String, null: false, description: "Error message"
    field :details, GraphQL::Types::JSON, null: true, description: "Error details"
  end
end
