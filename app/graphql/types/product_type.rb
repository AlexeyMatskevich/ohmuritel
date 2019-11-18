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

    field :description, String, null: true do
      description "Product description"
    end

    field :image_url, Url, null: true do
      description "Product image url"
    end

    def description
      AssociationLoader.for(object.class, :rich_text_description).load(object).then do |desc|
        next if desc.nil?

        desc
      end
    end

    def image_url
      AssociationLoader.for(object.class, image_attachment: :blob).load(object).then do |image|
        next if image.nil?

        Rails.application.routes.url_helpers.rails_blob_url(image, host: ActiveStorage::Current.host)
      end
    end
  end
end
