require "rails_helper"

RSpec.describe Types::QueryType do
  describe "get all users" do
    let(:admin) { create :admin }
    let!(:users) {
      [
        admin,
        create(:user),
        create(:user),
      ]
    }

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
      query query_string, context: {current_user: admin}
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
      query query_string, variables: {email: "example@example.com"}
    end

    it "returns all users" do
      expect(gql_response.data[query_type]).to eq({"email" => "example@example.com"})
    end
  end

  describe "get products page" do
    let!(:products) { create_pair(:product) }
    let(:page) { 1 }
    let(:query_type) { "productsPages" }
    let(:query_string) {
      <<-GRAPHQL
      query productsPages($pageSize: Int!, $page: Int!) {
        productsPages(pageSize: $pageSize, page: $page) {
          id
          products {
            name
          }
        }
      }
      GRAPHQL
    }

    before do
      query query_string, variables: {pageSize: 2, page: page}
    end

    it "returns all products" do
      expect(gql_response.data[query_type].first["products"]).to match_array(
        products.map { |product| {"name" => product.name} }
      )
    end

    context "when page less than one" do
      let(:page) { -1 }

      it "returns error" do
        expect(gql_response.errors.first["message"]).to eq "Page must be greater than 0"
      end
    end
  end

  describe "find product by name" do
    let!(:product) { create :product, name: "example_name" }

    let(:query_type) { "productByName" }
    let(:query_string) {
      <<-GRAPHQL
      query productByName($name: String!) {
        productByName(name: $name) {
          name
        }
      }
      GRAPHQL
    }

    before do
      query query_string, variables: {name: "example_name"}
    end

    it "returns all users" do
      expect(gql_response.data[query_type]).to eq({"name" => "example_name"})
    end
  end
end
