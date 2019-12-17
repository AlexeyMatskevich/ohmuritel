class ApplicationPolicy < ActionPolicy::Base
  authorize :user, allow_nil: true

  pre_check :deny_guests

  def deny_guests
    deny! if user.nil?
  end
end
