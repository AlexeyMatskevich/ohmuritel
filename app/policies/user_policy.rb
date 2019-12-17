class UserPolicy < ApplicationPolicy
  def show?
    user.role.admin? || (user.id == record.id)
  end
end
