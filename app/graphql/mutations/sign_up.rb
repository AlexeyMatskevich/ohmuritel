module Mutations
  class Mutations::SignUp < BaseMutation
    include ::Graphql::TokenHelper

    argument :first_name, String, "New user's first name", required: true
    argument :last_name, String, "New user's last name", required: true
    argument :email, String, "New user's email", required: true
    argument :password, String, "New user's password", required: true
    argument :password_confirmation, String, "New user's password confirmation", required: true

    field :user, Types::UserType, null: true

    def resolve(args)
      response = context[:response]
      user = User.new args

      if user.save
        generate_access_token(user, response)

        valid(user)
      else
        invalid(user)
      end
    end
  end
end
