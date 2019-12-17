module Mutations
  class Mutations::UpdateAccount < BaseMutation
    argument :first_name, String, "New user's first name", required: true
    argument :last_name, String, "New user's last name", required: true
    argument :current_password, String, "User's current password", required: true
    argument :password, String, "User's new password", required: true
    argument :password_confirmation, String, "User's new password confirmation", required: true

    field :user, Types::UserType, null: true

    def resolve(args)
      user = context[:current_user]

      return unauthenticated(User) if user.blank?

      user.update_with_password args

      user.errors.any? ? invalid(user) : valid(user)
    end
  end
end
