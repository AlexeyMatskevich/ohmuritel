module Mutations
  class CreateProduct < BaseMutation
    argument :name, String, required: true do
      description "New products name"
    end

    argument :weight, Integer, required: true do
      description "New products weight"
    end

    argument :price, Integer, required: true do
      description "New products price"
    end

    argument :preview_description, String, required: true do
      description "New products description for preview page"
    end

    argument :description, String, required: false do
      description "New products description"
    end

    field :product, Types::ProductType, null: true

    # message = I18n.t("devise.failure.unauthenticated") if context[:current_user].blank?
    def resolve(args)
      product = Product.new args

      begin
        if allowed_to?(:create?, product)
          product.save ?
            {errors: [], success: true, product: product} :
            {errors: add_attribute_errors(product), success: false, product: nil}
        else
          {errors: [{field: :_error, message: I18n.t("action_policy.unauthorized")}], success: false, product: nil}
        end
      rescue ActionPolicy::AuthorizationContextMissing
        {errors: [{field: :_error, message: I18n.t("devise.failure.unauthenticated")}], success: false, product: nil}
      end
    end
  end
end
