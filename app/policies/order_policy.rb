class OrderPolicy < ApplicationPolicy
  def show?
    user.role.admin? || (user.id == record.user_id)
  end
end
