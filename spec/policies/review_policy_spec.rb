require "rails_helper"
require "action_policy/rspec/dsl"

describe ReviewPolicy do
  let(:user) { build_stubbed :user }
  let(:record) { build_stubbed :review }

  let(:context) { {user: user} }

  describe_rule :create? do
    succeed "when user with user role"
  end
end
