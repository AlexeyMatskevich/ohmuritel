module Types
  class AttributesError < Types::BaseObject
    description "Form error"

    field :field, String, null: false do
      description "Field of the error"
    end

    field :message, String, null: false do
      description "Error message"
    end

    field :details, GraphQL::Types::JSON, null: true do
      description "Error details"
    end
  end
end
