require "rails_helper"

describe Mutations::AddProductToBasket do
  describe "add product to basket" do
    subject { gql_response.data[mutation_type] }
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

    def request
      mutation mutation_string, variables: {id: product.id}, context: {current_user: user}
    end

    let(:expected_result) { {"errors" => [], "success" => true} }

    it("return the success response") do
      request

      expect(subject).to eq(expected_result)
    end

    context "when basket already exist" do
      let(:order) { create(:order, item_count: 3, user: user) }

      it "change " do
        expect { request }.to change { order.order_items.sum(:quantity) }.by(1)
      end
    end

    context "when user is quest" do
      let(:user) { nil }
      let(:expected_result) {
        {"errors" => [{"field" => "_error", "message" => I18n.t("devise.failure.unauthenticated")}], "success" => false}
      }

      it "return the unauthenticated response" do
        request

        expect(gql_response.data[mutation_type]).to eq(expected_result)
      end
    end
  end
end
