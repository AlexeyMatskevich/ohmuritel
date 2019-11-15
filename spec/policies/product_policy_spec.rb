require "rails_helper"
require "action_policy/rspec/dsl"

describe ProductPolicy do
  let(:user) { build_stubbed :admin }
  let(:record) { build_stubbed :product }

  let(:context) { {user: user} }

  describe_rule :create? do
    succeed "when user is admin"

    failed "when user in not admin" do
      before { user.role = "user" }
    end
  end
end
