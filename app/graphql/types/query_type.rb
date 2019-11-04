module Types
  class QueryType < Types::BaseObject
    field :users,
      [Types::UserType],
      null: false,
      description: "Returns a list of users"

    field :user, Types::UserType, null: true do
      description "Returns a user by id"

      argument :id, ID, required: true do
        description "User ID"
      end
    end

    field :user_by_email, Types::UserType, null: true do
      description "Returns a user by email"

      argument :email, String, required: true do
        description "User email"
      end
    end

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end

    def user_by_email(email:)
      User.find_by_email(email)
    end
  end
end
