require "rails_helper"

describe Mutations::DeleteReview do
  subject { described_class }

  describe "delete Review" do
    let(:user) { create(:user) }
    let(:review) { create(:review, user: user) }
    let(:review_id) { review.id }
    let(:mutation_type) { "deleteReview" }
    let(:mutation_string) {
      <<-GRAPHQL
      mutation deleteReview($id: ID!) {
        deleteReview(id: $id) {
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
      mutation mutation_string, variables: {id: review_id}, context: {current_user: user}
    end

    let(:expected_result) { {"errors" => [], "success" => true} }

    it "return the product object" do
      expect(gql_response.data[mutation_type]).to eq expected_result
    end
  end
end
