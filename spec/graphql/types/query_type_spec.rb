require "rails_helper"

RSpec.describe Types::QueryType do
  describe "User" do
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

    describe "#user_email_taken" do
      subject { gql_response.data[query_type] }
      let(:name) { "example@example.com" }
      let!(:users) { create :user, email: "example@example.com" }

      let(:query_type) { "userEmailTaken" }
      let(:query_string) {
        <<-GRAPHQL
          query userEmailTaken($email: String!) {
            userEmailTaken(email: $email)
          }
        GRAPHQL
      }

      before do
        query query_string, variables: {email: name}
      end

      it { is_expected.to eq true }

      context "when email not taken" do
        let(:name) { "Not name" }

        it { is_expected.to eq false }
      end
    end
  end

  describe "Product" do
    describe "#products_pages" do
      let!(:products) { create_pair(:product) }
      let(:page) { 1 }
      let(:query_type) { "productsPages" }
      let(:query_string) {
        <<~GRAPHQL
          query productsPages($pageSize: Int!, $page: Int!) {
            productsPages(pageSize: $pageSize, page: $page) {
              totalCount
              pages{
                id
                products {
                  name
                }
              }
            }
          }
        GRAPHQL
      }

      before do
        query query_string, variables: {pageSize: 2, page: page}
      end

      it "returns all products" do
        expect(gql_response.data.dig(query_type, "pages").first["products"]).to match_array(
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

    describe "#search_products_pages" do
      let(:page) { 1 }
      let(:query_type) { "searchProductsPages" }
      let(:query_string) {
        <<~GRAPHQL
          query searchProductsPages($pageSize: Int!, $page: Int!, $search: String!) {
            searchProductsPages(pageSize: $pageSize, page: $page, search: $search) {
              totalCount
              pages{
                id
                products {
                  name
                  previewDescription
                }
              }
            }
          }
        GRAPHQL
      }

      let(:expected_result) {
        {
          "searchProductsPages" => {
            "totalCount" => 2,
            "pages" => [
              {
                "id" => "1",
                "products" => [
                  {
                    "name" => "Pizza",
                    "previewDescription" => "Describe",
                  },
                  {
                    "name" => "Name",
                    "previewDescription" => "Pizza with salami",
                  },
                ],
              },
            ],
          },
        }
      }

      before do
        create_pair(:product)
        create :product, :reindex, name: "Pizza", preview_description: "Describe"
        create :product, :reindex, name: "Name", preview_description: "Pizza with salami"
        Product.reindex
        query query_string, variables: {pageSize: 2, page: page, search: "Pizza"}
      end

      it "search product with Pizza in name or preview description" do
        expect(gql_response.data).to eq(expected_result)
      end

      context "when page less than one" do
        let(:page) { -1 }

        it "returns error" do
          expect(gql_response.errors.first["message"]).to eq "Page must be greater than 0"
        end
      end
    end

    describe "#products_connection" do
      subject { gql_response.data.dig(query_type, "edges").map { |x| x["node"] } }

      let!(:products) { create_pair(:product) }
      let(:query_type) { "productsConnection" }
      let(:query_string) {
        <<~GRAPHQL
          query productsConnection($cursor: String) {
              productsConnection(first: 12, after: $cursor) {
                  edges {
                      node {
                          name
                      }
                  }
              }
          }
        GRAPHQL
      }

      before do
        query query_string
      end

      it "returns all products" do
        expect(subject).to match_array(products.map { |product| {"name" => product.name} })
      end
    end

    describe "#search_products_connection" do
      let(:query_type) { "searchProductsConnection" }
      let(:query_string) {
        <<~GRAPHQL
          query searchProductsConnection($cursor: String, $search: String!) {
              searchProductsConnection(first: 12, after: $cursor, search: $search) {
                  edges {
                      node {
                          name
                          previewDescription
                      }
                  }
              }
          }
        GRAPHQL
      }

      let(:expected_result) {
        {
          "searchProductsConnection" => {
            "edges" => [
              {
                "node" => {
                  "name" => "Pizza",
                  "previewDescription" => "Describe",
                },
              },
              {
                "node" => {
                  "name" => "Name",
                  "previewDescription" => "Pizza with salami",
                },
              },
            ],
          },
        }
      }

      before do
        create_pair(:product)
        create :product, :reindex, name: "Pizza", preview_description: "Describe"
        create :product, :reindex, name: "Name", preview_description: "Pizza with salami"
        Product.reindex
        query query_string, variables: {search: "Pizza"}
      end

      it "search product with Pizza in name or preview description" do
        expect(gql_response.data).to eq(expected_result)
      end
    end

    describe "#products_autocomplete" do
      let(:query_type) { "productsAutocomplete" }
      let(:query_string) {
        <<-GRAPHQL
          query productsAutocomplete($search: String!) {
            productsAutocomplete(search: $search)
          }
        GRAPHQL
      }

      before do
        create_pair(:product)
        create :product, :reindex, name: "Pizza"
        create :product, :reindex, name: "Pizza with salami"
        Product.reindex
        query query_string, variables: {search: "Pi"}
      end

      it "return autocomplete for Pi" do
        expect(gql_response.data).to eq({"productsAutocomplete" => ["Pizza", "Pizza with salami"]})
      end
    end

    describe "product_name_taken" do
      subject { gql_response.data[query_type] }

      let(:name) { "example_name" }
      let!(:product) { create :product, name: "example_name" }

      let(:query_type) { "productNameTaken" }
      let(:query_string) {
        <<-GRAPHQL
          query productNameTaken($name: String!) {
            productNameTaken(name: $name)
          }
        GRAPHQL
      }

      before do
        query query_string, variables: {name: name}
      end

      it { is_expected.to eq true }

      context "when name not taken" do
        let(:name) { "Not name" }

        it { is_expected.to eq false }
      end
    end
  end
end
