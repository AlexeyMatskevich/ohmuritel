require "rails_helper"

RSpec.describe Mutations::CreateProduct do
  subject { described_class }

  it { is_expected.to have_a_field(:product).of_type(Types::ProductType) }

  describe "create Product" do
    let(:user) { build_stubbed(:admin) }

    let(:mutation_type) { "createProduct" }
    let(:mutation_string) {
      <<-GRAPHQL
      mutation createProduct($name: String!, $weight: Int!, $price: Int!, $previewDescription: String!, $image: String!) {
        createProduct(name: $name, weight: $weight, price: $price, previewDescription: $previewDescription, image: $image) {
          product {
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
          image: FilesTestHelper.blob_for_png.signed_id,
        },
        context: {current_user: user}
    end

    let(:expected_result) {
      {
        "product" => {
          "name" => "Example product",
          "weight" => 30,
          "price" => 5,
          "previewDescription" => "Some description",
        },
        "errors" => [],
        "success" => true,
      }
    }

    it "return the product object" do
      expect(gql_response.data[mutation_type]).to eq expected_result
    end
  end
end
