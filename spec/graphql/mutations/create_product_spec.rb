require "rails_helper"

RSpec.describe Mutations::CreateProduct do
  subject { described_class }

  it { is_expected.to have_a_field(:product).of_type(Types::ProductType) }

  describe "create Product" do
    let(:user) { build_stubbed(:user) }
    let(:mutation_type) { "createProduct" }
    let(:mutation_string) {
      <<-GRAPHQL
      mutation createProduct($name: String!, $weight: Int!, $price: Int!, $previewDescription: String!) {
        createProduct(name: $name, weight: $weight, price: $price, previewDescription: $previewDescription) {
          product {
            id
            name
            weight
            price
            previewDescription
          }
          errors {
            message
            field
            details
          }
          success
        }
      }
      GRAPHQL
    }

    before do
      mutation mutation_string,
        variables: {
          name: "Example product",
          weight: 30,
          price: 5,
          previewDescription: "Some description",
        },
        context: {current_user: user}
    end

    context "when a user authenticated" do
      it "return the product object" do
        expect(gql_response.data[mutation_type]["product"]).to include("name" => "Example product")
      end
    end

    context "when a user not authenticated" do
      let(:user) { nil }
      let(:expected_error) {
        {
          "details" => nil,
          "field" => "_error",
          "message" => "You need to sign in or sign up before continuing.",
        }
      }

      it "return the error message" do
        expect(gql_response.data[mutation_type]["errors"]).to include(expected_error)
      end
    end
  end
end
