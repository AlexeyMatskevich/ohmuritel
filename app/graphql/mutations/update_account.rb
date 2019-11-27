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

      if user.blank?
        return {
          errors: [
            {field: :_error, message: I18n.t("devise.failure.unauthenticated")},
          ],
          success: false,
          user: nil,
        }
      end

      user.update_with_password args

      if user.errors.any?
        {
          errors: add_attribute_errors(user),
          success: false,
          user: nil,
        }
      else
        {
          errors: [],
          success: true,
          user: user,
        }
      end
    end
  end
end
