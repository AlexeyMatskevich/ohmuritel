require "rails_helper"
require "action_policy/rspec/dsl"

describe ReviewPolicy do
  let(:user) { build_stubbed :user }
  let(:record) { build_stubbed :review }

  let(:context) { {user: user} }

  describe_rule :create? do
    succeed "when user with user role"
  end

  describe_rule :destroy? do
    succeed "when user is admin" do
      let(:user) { build_stubbed :admin }
    end

    failed "when user in quest" do
      let(:user) { nil }
    end

    failed "when user in not admin" do
      succeed "when user is owner" do
        let(:record) { build_stubbed :review, user: user }
      end
    end
  end
end
