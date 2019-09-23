module Types
  class QueryType < Types::BaseObject
    field :users,
      [Types::UserType],
      null: false,
      description: "Returns a list of users in the martian library"

    def users
      User.all
    end
  end
end
