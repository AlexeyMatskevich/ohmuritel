require "rails_helper"
require "action_policy/rspec/dsl"

describe UserPolicy do
  let(:user) { build_stubbed :admin }
  let(:record) { build_stubbed :user }

  let(:context) { {user: user} }

  describe_rule :show? do
    succeed "when user is admin"

    failed "when user in quest" do
      let(:user) { nil }
    end

    failed "when user in not admin" do
      before { user.role = "user" }

      succeed "when user is owner" do
        let(:user) { record }
      end
    end
  end
end
