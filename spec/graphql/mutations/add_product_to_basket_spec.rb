require "rails_helper"

describe Mutations::AddProductToBasket do
  subject { described_class }

  describe "add product to basket" do
    let(:user) { create(:user) }
    let(:product) { create(:product) }

    let(:mutation_type) { "addProductToBasket" }
    let(:mutation_string) {
      <<-GRAPHQL
      mutation addProductToBasket($id: ID!) {
        addProductToBasket(id: $id) {
          errors {
            message
            field
          }
          success
        }
      }
      GRAPHQL
    }

    before { mutation mutation_string, variables: {id: product.id}, context: {current_user: user} }

    it "return the success response" do
      expect(gql_response.data[mutation_type]).to eq({"errors" => [], "success" => true})
    end

    context "when user is quest" do
      let(:user) { nil }
      let(:expected_result) {
        {"errors" => [{"field" => "_error", "message" => I18n.t("devise.failure.unauthenticated")}], "success" => false}
      }

      it "return the unauthenticated response" do
        expect(gql_response.data[mutation_type]).to eq(expected_result)
      end
    end
  end
end
