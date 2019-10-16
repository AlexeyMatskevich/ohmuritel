module Types
  class QueryType < Types::BaseObject
    field :users,
      [Types::UserType],
      null: false,
      description: "Returns a list of users"

    field :user, Types::UserType, null: false do
      description "Returns a user"
      argument :id, ID, required: true
    end

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end
  end
end
