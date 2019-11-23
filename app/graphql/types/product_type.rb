module Types
  class ProductType < Types::BaseObject
    description "Data of product"

    field :id, ID, null: false, description: "ID of the user"
    field :name, String, null: false, description: "Product name"
    field :weight, Integer, null: false, description: "Product weight"
    field :price, Integer, null: false, description: "Product price"
    field :preview_description, String, null: false, description: "Product description for preview"
    field :description, String, null: true, description: "Product description"
    field :image_url, Url, null: true, description: "Product image url"

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
