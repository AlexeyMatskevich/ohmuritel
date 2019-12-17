module Types
  class UserType < Types::BaseObject
    description "Data of a user"

    field :id, ID, "ID of the user", null: false
    field :email, String, "Email address of the user", null: false
    field :first_name, String, "First name of the user", null: false
    field :last_name, String, "Last name of the user", null: false
    field :full_name, String, "Full name of the user", null: false

    def full_name
      # `object` references the user instance
      [object.first_name, object.last_name].compact.join(" ")
    end

    expose_authorization_rules :create?, with: ProductPolicy, field_name: "can_create_product"
  end
end
