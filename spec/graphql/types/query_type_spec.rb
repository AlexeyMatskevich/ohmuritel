require "rails_helper"

RSpec.describe Types::QueryType do
  describe "users" do
    let!(:users) { create_pair(:user) }

    let(:query) do
      %(query {
        users {
          email
        }
      })
    end

    subject(:result) do
      OhmuritelSchema.execute(query).as_json
    end

    it "returns all users" do
      expect(result.dig("data", "users")).to match_array(
        users.map { |user| {"email" => user.email} }
      )
    end
  end

  describe "user_by_email" do
    let!(:users) { create :user, email: "example@example.com" }

    let(:query) do
      %(query {
        userByEmail(email: "example@example.com") {
          email
        }
      })
    end

    subject(:result) do
      OhmuritelSchema.execute(query).as_json
    end

    it "find user with email" do
      expect(result.dig("data", "userByEmail")).to eq({"email" => "example@example.com"})
    end
  end
end
