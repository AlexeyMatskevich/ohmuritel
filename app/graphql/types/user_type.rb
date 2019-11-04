module Types
  class UserType < Types::BaseObject
    description "Data of a user"

    field :id, ID, null: false do
      description "ID of the user"
    end

    field :email, String, null: false do
      description "Email address of the user"
    end

    field :first_name, String, null: false do
      description "First name of the user"
    end

    field :last_name, String, null: false do
      description "Last name of the user"
    end

    field :full_name, String, null: false do
      description "Full name of the user"
    end

    def full_name
      # `object` references the user instance
      [object.first_name, object.last_name].compact.join(" ")
    end
  end
end
