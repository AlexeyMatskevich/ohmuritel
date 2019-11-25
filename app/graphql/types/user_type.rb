module Types
  class UserType < Types::BaseObject
    description "Data of a user"

    field :id, ID, null: false, description: "ID of the user"
    field :email, String, null: false, description: "Email address of the user"
    field :first_name, String, null: false, description: "First name of the user"
    field :last_name, String, null: false, description: "Last name of the user"
    field :full_name, String, null: false, description: "Full name of the user"

    def full_name
      # `object` references the user instance
      [object.first_name, object.last_name].compact.join(" ")
    end

    expose_authorization_rules :create?, with: ProductPolicy, field_name: "can_create_product"
  end
end
