class ReviewPolicy < ApplicationPolicy
  def create?
    true
  end

  def destroy?
    user.role.admin? || (user.id == record.user_id)
  end
end
