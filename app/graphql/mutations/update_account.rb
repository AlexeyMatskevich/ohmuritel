module Mutations
  class Mutations::UpdateAccount < BaseMutation
    argument :first_name, String, required: true do
      description "New user's first name"
    end

    argument :last_name, String, required: true do
      description "New user's last name"
    end

    argument :current_password, String, required: true do
      description "User's current password"
    end

    argument :password, String, required: true do
      description "User's new password"
    end

    argument :password_confirmation, String, required: true do
      description "User's new password confirmation"
    end

    field :errors, [::Types::Auth::Error], null: false
    field :success, Boolean, null: false
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
