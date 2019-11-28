module Mutations
  class CreateProduct < BaseMutation
    argument :name, String, "New products name", required: true
    argument :weight, Integer, "New products weight", required: true
    argument :price, Integer, "New products price", required: true
    argument :preview_description, String, "New products description for preview page", required: true
    argument :description, String, "New products description", required: false
    argument :image, String, "Signed blob ID generated via `createDirectUpload` mutation", required: true

    field :product, Types::ProductType, null: true

    def resolve(args)
      product = Product.new args

      authorize! product, to: :create?

      if product.save
        valid(product)
      else
        invalid(product)
      end
    end
  end
end
