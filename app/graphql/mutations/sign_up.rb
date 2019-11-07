module Mutations
  class Mutations::SignUp < BaseMutation
    include ::Graphql::TokenHelper

    argument :first_name, String, required: true do
      description "New user's first name"
    end

    argument :last_name, String, required: true do
      description "New user's last name"
    end

    argument :email, String, required: true do
      description "New user's email"
    end

    argument :password, String, required: true do
      description "New user's password"
    end

    argument :password_confirmation, String, required: true do
      description "New user's password confirmation"
    end

    field :user, Types::UserType, null: true

    def resolve(args)
      response = context[:response]
      user = User.new args

      if user.save
        generate_access_token(user, response)

        {
          errors: [],
          success: true,
          user: user,
        }
      else
        {
          errors: add_attribute_errors(user),
          success: false,
          user: nil,
        }
      end
    end
  end
end
