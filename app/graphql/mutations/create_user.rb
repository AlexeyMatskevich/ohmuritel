module Mutations
  class CreateUser < BaseMutation
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    field :user, Types::UserType, null: true

    def resolve(first_name:, last_name:, email:, password:, password_confirmation:)
      user = User.new(
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      )

      user.save ? {user: user, errors: []} : add_attribute_errors(user)
    end
  end
end
