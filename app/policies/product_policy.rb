class ProductPolicy < ApplicationPolicy
  def create?
    user.role.admin?
  end
end