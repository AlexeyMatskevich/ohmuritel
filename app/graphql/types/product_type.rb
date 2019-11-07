module Types
  class ProductType < Types::BaseObject
    description "Data of product"

    field :id, ID, null: false do
      description "ID of the user"
    end

    field :name, String, null: false do
      description "Product name"
    end

    field :weight, Integer, null: false do
      description "Product weight"
    end

    field :price, Integer, null: false do
      description "Product price"
    end

    field :preview_description, String, null: false do
      description "Product description for preview"
    end
  end
end
