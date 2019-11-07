require "rails_helper"

RSpec.describe Types::QueryType do
  describe "get all users" do
    let!(:users) { create_pair(:user) }

    let(:query_type) { "users" }
    let(:query_string) {
      <<-GRAPHQL
      query USERS {
        users {
          email
        }
      }
      GRAPHQL
    }

    before do
      query query_string
    end

    it "returns all users" do
      expect(gql_response.data[query_type]).to match_array(
        users.map { |user| {"email" => user.email} }
      )
    end
  end

  describe "find user by email" do
    let!(:users) { create :user, email: "example@example.com" }

    let(:query_type) { "userByEmail" }
    let(:query_string) {
      <<-GRAPHQL
      query userByEmail($email: String!) {
        userByEmail(email: $email) {
          email
        }
      }
      GRAPHQL
    }

    before do
      query query_string, variables: {
        email: "example@example.com",
      }
    end

    it "returns all users" do
      expect(gql_response.data[query_type]).to eq({"email" => "example@example.com"})
    end
  end
end
