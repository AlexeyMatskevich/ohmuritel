module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    include ActionPolicy::GraphQL::Behaviour

    field :errors, [Types::AttributesError], null: false
    field :success, Boolean, null: false

    def valid(obj = nil)
      response = {
        errors: [],
        success: true,
      }

      obj ? response.merge({"#{underscore(obj)}": obj}) : response
    end

    def invalid(obj = nil)
      error(obj: obj)
    end

    def unauthenticated(obj = nil)
      errors = [{field: :_error, message: I18n.t("devise.failure.unauthenticated")}]

      error(obj: obj, errors: errors)
    end

    private

    def error(obj: nil, errors: nil)
      response = {
        errors: errors || add_attribute_errors(obj),
        success: false,
      }

      obj ? response.merge({"#{underscore(obj)}": nil}) : response
    end

    def underscore(obj)
      obj.is_a?(Class) ? obj.to_s.underscore : obj.class.to_s.underscore
    end

    def add_attribute_errors(obj)
      obj.errors.messages.map do |field, messages|
        {field: field.to_s.camelize(:lower), message: messages.first.capitalize}
      end
    end
  end
end
