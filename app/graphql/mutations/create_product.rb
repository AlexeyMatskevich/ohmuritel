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

    argument :image, String, required: true do
      description "Signed blob ID generated via `createDirectUpload` mutation"
    end

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
