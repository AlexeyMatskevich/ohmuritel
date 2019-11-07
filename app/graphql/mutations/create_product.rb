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

    def resolve(args)
      if context[:current_user].blank?
        return {
          errors: [
            {field: :_error, message: I18n.t("devise.failure.unauthenticated")},
          ],
          success: false,
          product: nil,
        }
      end

      product = Product.new args

      if product.save
        {
          errors: [],
          success: true,
          product: product,
        }
      else
        {
          errors: add_attribute_errors(product),
          success: false,
          product: nil,
        }
      end
    end
  end
end
