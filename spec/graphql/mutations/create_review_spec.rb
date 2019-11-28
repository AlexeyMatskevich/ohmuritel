require "rails_helper"

RSpec.describe Mutations::CreateReview do
  subject { described_class }

  it { is_expected.to have_a_field(:review).of_type(Types::ReviewType) }

  describe "create Review" do
    let(:user) { create(:user) }
    let(:product) { create(:product) }

    let(:mutation_type) { "createReview" }
    let(:mutation_string) {
      <<-GRAPHQL
      mutation createReview($body: String!, $rating: Int!, $productId: ID!) {
        createReview(body: $body, rating: $rating, productId: $productId) {
          review {
            body
            rating
            product {
              id
            }
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
          body: "Example review",
          rating: 4,
          productId: product.id,
        },
        context: {current_user: user}
    end

    let(:expected_result) {
      {
        "review" => {
          "body" => "Example review",
          "rating" => 4,
          "product" => {
            "id" => product.id.to_s,
          },
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
