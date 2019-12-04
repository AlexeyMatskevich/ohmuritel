require "rails_helper"

describe Types::QueryType do
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
    describe "#products" do
      let!(:products) { create_pair(:product) }
      let(:page) { 1 }
      let(:variables) { {pageSize: 2, page: page} }
      let(:attributes) { "name" }
      let(:query_type) { "products" }
      let(:query_string) {
        <<~GRAPHQL
          query products($pageSize: Int!, $page: Int!, $order: ProductOrder) {
            products(pageSize: $pageSize, page: $page, order: $order) {
              #{attributes}
            }
          }
        GRAPHQL
      }

      before { query query_string, variables: variables }

      it "returns all products" do
        expect(gql_response.data[query_type]).to match_array(
          products.map { |product| {"name" => product.name} }
        )
      end

      context "when page less than one" do
        let(:page) { -1 }

        it "returns error" do
          expect(gql_response.errors.first["message"]).to eq "Page must be greater than 0"
        end
      end

      context "when product order by rating" do
        let!(:products) { [create(:product, rating: 3), create(:product, rating: 5), create(:product, rating: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "rating"} }
        let(:attributes) { "rating" }

        it "returns product ordered by rating" do
          expect(gql_response.data[query_type]).to match_array(
            products.sort { |a, b| b.rating <=> a.rating }.map { |product| {"rating" => product.rating} }
          )
        end
      end

      context "when product order by weight" do
        let!(:products) { [create(:product, weight: 3), create(:product, weight: 5), create(:product, weight: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "weight"} }
        let(:attributes) { "weight" }

        it "returns product ordered by weight" do
          expect(gql_response.data[query_type]).to match_array(
            products.sort { |a, b| b.weight <=> a.weight }.map { |product| {"weight" => product.weight} }
          )
        end
      end

      context "when product order by price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "price"} }
        let(:attributes) { "price" }

        it "returns product ordered by price" do
          expect(gql_response.data[query_type]).to match_array(
            products.sort { |a, b| b.price <=> a.price }.map { |product| {"price" => product.price} }
          )
        end
      end

      context "when product order by low price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "price"} }
        let(:attributes) { "price" }

        it "returns product ordered by price" do
          expect(gql_response.data[query_type]).to match_array(
            products.sort_by(&:price).map { |product| {"price" => product.price} }
          )
        end
      end

      context "when product order by weight" do
        let!(:products) { [create(:product, weight: 3), create(:product, weight: 5), create(:product, weight: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "weight"} }
        let(:attributes) { "weight" }

        it "returns product ordered by weight" do
          expect(gql_response.data[query_type]).to match_array(
            products.sort { |a, b| b.weight <=> a.weight }.map { |product| {"weight" => product.weight} }
          )
        end
      end
    end

    describe "#search_products" do
      let(:page) { 1 }
      let(:query_type) { "searchProducts" }
      let(:query_string) {
        <<~GRAPHQL
          query searchProducts($pageSize: Int!, $page: Int!, $search: String!) {
            searchProducts(pageSize: $pageSize, page: $page, search: $search) {
              name
              previewDescription
            }
          }
        GRAPHQL
      }

      let(:expected_result) {
        {
          "searchProducts" => [
            {
              "name" => "Pizza",
              "previewDescription" => "Describe",
            },
            {
              "name" => "Name",
              "previewDescription" => "Pizza with salami",
            },
          ],
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
      let(:variables) { {} }
      let(:attributes) { "name" }
      let(:query_type) { "productsConnection" }
      let(:query_string) {
        <<~GRAPHQL
          query productsConnection($cursor: String, $order: ProductOrder) {
              productsConnection(first: 12, after: $cursor, order: $order) {
                  edges {
                      node {
                          #{attributes}
                      }
                  }
              }
          }
        GRAPHQL
      }

      before do
        query query_string, variables: variables
      end

      it "returns all products" do
        expect(subject).to match_array(products.map { |product| {"name" => product.name} })
      end

      context "when product order by rating" do
        let!(:products) { [create(:product, rating: 3), create(:product, rating: 5), create(:product, rating: 4)] }
        let(:variables) { {order: "rating"} }
        let(:attributes) { "rating" }

        it "returns product ordered by rating" do
          expect(subject).to match_array(
            products.sort { |a, b| b.rating <=> a.rating }.map { |product| {"rating" => product.rating} }
          )
        end
      end

      context "when product order by weight" do
        let!(:products) { [create(:product, weight: 3), create(:product, weight: 5), create(:product, weight: 4)] }
        let(:variables) { {order: "weight"} }
        let(:attributes) { "weight" }

        it "returns product ordered by weight" do
          expect(subject).to match_array(
            products.sort { |a, b| b.weight <=> a.weight }.map { |product| {"weight" => product.weight} }
          )
        end
      end

      context "when product order by price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {order: "price"} }
        let(:attributes) { "price" }

        it "returns product ordered by price" do
          expect(subject).to match_array(
            products.sort { |a, b| b.price <=> a.price }.map { |product| {"price" => product.price} }
          )
        end
      end

      context "when product order by low price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {order: "price"} }
        let(:attributes) { "price" }

        it "returns product ordered by price" do
          expect(subject).to match_array(products.sort_by(&:price).map { |product| {"price" => product.price} })
        end
      end

      context "when product order by weight" do
        let!(:products) { [create(:product, weight: 3), create(:product, weight: 5), create(:product, weight: 4)] }
        let(:variables) { {order: "weight"} }
        let(:attributes) { "weight" }

        it "returns product ordered by weight" do
          expect(subject).to match_array(
            products.sort { |a, b| b.weight <=> a.weight }.map { |product| {"weight" => product.weight} }
          )
        end
      end
    end

    describe "#reviews_connection" do
      subject { gql_response.data.dig(query_type, "edges").map { |x| x["node"] } }

      let(:product) { create(:product) }
      let!(:reviews) { create_pair(:review, product: product) }
      let(:query_type) { "reviewsConnection" }
      let(:query_string) {
        <<~GRAPHQL
          query reviewsConnection($productId: ID!, $cursor: String) {
              reviewsConnection(first: 10, after: $cursor, productId: $productId) {
                  edges {
                      node {
                          body
                      }
                  }
              }
          }
        GRAPHQL
      }

      before do
        query query_string, variables: {productId: product.id}
      end

      it "returns all reviews" do
        expect(subject).to match_array(reviews.map { |review| {"body" => review.body} }.reverse)
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
