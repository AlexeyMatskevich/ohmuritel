module Types
  class ProductType < Types::BaseObject
    description "Data of product"

    field :id, ID, "ID of the user", null: false
    field :name, String, "Product name", null: false
    field :weight, Integer, "Product weight", null: false
    field :price, Integer, "Product price", null: false
    field :preview_description, String, "Product description for preview", null: false
    field :description, String, "Product description", null: true
    field :image_url, Url, "Product image url", null: true
    field :rating, Integer, "Product rating", null: true

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
