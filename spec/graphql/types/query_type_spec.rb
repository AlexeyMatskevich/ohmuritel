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

      before { query query_string, context: {current_user: admin} }

      let(:expected_result) { users.map { |user| {"email" => user.email} } }

      it("returns all users") { expect(gql_response.data[query_type]).to match_array(expected_result) }
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

      before { query query_string, variables: {email: name} }

      it { is_expected.to eq true }

      context "when email not taken" do
        let(:name) { "Not name" }

        it { is_expected.to eq false }
      end
    end
  end

  describe "Product" do
    describe "#products" do
      subject { gql_response.data[query_type] }
      let!(:products) { create_pair(:product) }
      let(:page) { 1 }
      let(:variables) { {pageSize: 2, page: page} }
      let(:attribute) {}
      let(:query_type) { "products" }
      let(:query_string) {
        <<~GRAPHQL
          query products($pageSize: Int!, $page: Int!, $order: ProductOrder) {
            products(pageSize: $pageSize, page: $page, order: $order) {
              id
              #{attribute}
            }
          }
        GRAPHQL
      }

      before { query query_string, variables: variables }

      let(:expected_result) { products.map { |product| query_hash(product).slice("id") } }

      it { is_expected.to match_array(expected_result) }

      context "when page less than one" do
        let(:page) { -1 }

        it("returns error") { expect(gql_response.errors.first["message"]).to eq "Page must be greater than 0" }
      end

      context "when product order by rating" do
        let!(:products) { Array.new(3) { |i| create(:product, :with_reviews, review_rating: 5 - i).reload } }
        let(:variables) { {pageSize: 3, page: page, order: "rating"} }
        let(:attribute) { "rating" }

        let(:expected_result) {
          products.sort { |a, b| b.rating <=> a.rating }.map { |product| query_hash(product).slice("id", attribute) }
        }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by weight" do
        let!(:products) { [create(:product, weight: 3), create(:product, weight: 5), create(:product, weight: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "weight"} }
        let(:attribute) { "weight" }

        let(:expected_result) {
          products.sort { |a, b| b.weight <=> a.weight }.map { |product| query_hash(product).slice("id", attribute) }
        }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "price"} }
        let(:attribute) { "price" }

        let(:expected_result) {
          products.sort { |a, b| b.price <=> a.price }.map { |product| query_hash(product).slice("id", attribute) }
        }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by low price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {pageSize: 3, page: page, order: "price"} }
        let(:attribute) { "price" }
        let(:expected_result) { products.sort_by(&:price).map { |product| query_hash(product).slice("id", attribute) } }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by reviews" do
        let(:variables) { {pageSize: 3, page: page, order: "reviews"} }
        let!(:products) {
          Array.new(3) { |i| query_hash(create(:product, :with_reviews, review_count: i)).slice("id") }
        }

        it { is_expected.to match_array(products) }
      end
    end

    describe "#search_products" do
      let(:page) { 1 }
      let!(:products) {
        [
          create(:product, :reindex, name: "Pizza", preview_description: "Describe"),
          create(:product, :reindex, name: "Name", preview_description: "Pizza with salami"),
        ]
      }

      let(:query_type) { "searchProducts" }
      let(:query_string) {
        <<~GRAPHQL
          query searchProducts($pageSize: Int!, $page: Int!, $search: String!) {
            searchProducts(pageSize: $pageSize, page: $page, search: $search) {
              id
              name
              previewDescription
            }
          }
        GRAPHQL
      }

      let(:expected_result) { products.map { |product| query_hash(product).slice("id", "name", "previewDescription") } }

      before do
        create_pair(:product)
        Product.reindex
        query query_string, variables: {pageSize: 2, page: page, search: "Pizza"}
      end

      it "search product with Pizza in name or preview description" do
        expect(gql_response.data[query_type]).to eq(expected_result)
      end

      context "when page less than one" do
        let(:page) { -1 }

        it("returns error") { expect(gql_response.errors.first["message"]).to eq "Page must be greater than 0" }
      end
    end

    describe "#products_connection" do
      subject { gql_response.data.dig(query_type, "edges").map { |x| x["node"] } }

      let!(:products) { create_pair(:product) }
      let(:variables) { {} }
      let(:attribute) {}
      let(:query_type) { "productsConnection" }
      let(:query_string) {
        <<~GRAPHQL
          query productsConnection($cursor: String, $order: ProductOrder) {
              productsConnection(first: 12, after: $cursor, order: $order) {
                  edges {
                      node {
                          id
                          #{attribute}
                      }
                  }
              }
          }
        GRAPHQL
      }

      before { query query_string, variables: variables }

      let(:expected_result) { products.map { |product| query_hash(product).slice("id") } }

      it("returns all products") { expect(subject).to match_array(expected_result) }

      context "when product order by rating" do
        let!(:products) { Array.new(3) { |i| create(:product, :with_reviews, review_rating: 5 - i).reload } }
        let(:variables) { {order: "rating"} }
        let(:attribute) { "rating" }

        let(:expected_result) {
          products.sort { |a, b| b.rating <=> a.rating }.map { |product| query_hash(product).slice("id", attribute) }
        }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by weight" do
        let!(:products) { [create(:product, weight: 3), create(:product, weight: 5), create(:product, weight: 4)] }
        let(:variables) { {order: "weight"} }
        let(:attribute) { "weight" }

        let(:expected_result) {
          products.sort { |a, b| b.weight <=> a.weight }.map { |product| query_hash(product).slice("id", attribute) }
        }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {order: "price"} }
        let(:attribute) { "price" }

        let(:expected_result) {
          products.sort { |a, b| b.price <=> a.price }.map { |product| query_hash(product).slice("id", attribute) }
        }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by low price" do
        let!(:products) { [create(:product, price: 3), create(:product, price: 5), create(:product, price: 4)] }
        let(:variables) { {order: "price"} }
        let(:attribute) { "price" }
        let(:expected_result) { products.sort_by(&:price).map { |product| query_hash(product).slice("id", attribute) } }

        it { is_expected.to match_array(expected_result) }
      end

      context "when product order by reviews" do
        let(:variables) { {order: "reviews"} }
        let!(:products) {
          Array.new(3) { |i| query_hash(create(:product, :with_reviews, review_count: i)).slice("id") }
        }

        it { is_expected.to match_array(products) }
      end
    end

    describe "#reviews_connection" do
      subject { gql_response.data.dig(query_type, "edges").map { |x| x["node"] } }

      let!(:product) { create(:product, :with_reviews, review_count: 2) }
      let(:product_id) { product.id }
      let(:query_type) { "reviewsConnection" }
      let(:query_string) {
        <<~GRAPHQL
          query reviewsConnection($productId: ID!, $cursor: String) {
              reviewsConnection(first: 10, after: $cursor, productId: $productId) {
                  edges {
                      node {
                          id
                          body
                      }
                  }
              }
          }
        GRAPHQL
      }

      before { query query_string, variables: {product_id: product_id} }

      let(:expected_result) { product.reviews.map { |review| query_hash(review).slice("id", "body") }.reverse }

      it { is_expected.to match_array(expected_result) }

      context "when use slug instead of id" do
        let(:productId) { product.slug }

        it { is_expected.to match_array(expected_result) }
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

      before { query query_string, variables: {name: name} }

      it { is_expected.to eq true }

      context "when name not taken" do
        let(:name) { "Not name" }

        it { is_expected.to eq false }
      end
    end
  end

  describe "Order" do
    describe "#current_order" do
      let(:user) { create(:user) }
      let!(:order) { create(:order, user: user) }
      let(:query_type) { "currentOrder" }
      let(:query_string) {
        <<~GRAPHQL
          query currentOrder {
            currentOrder {
              id
              orderCount
              orderItems {
                quantity
                product {
                  id
                  name
                }
              }
              user {
                id
                email
              }
            }
          }
        GRAPHQL
      }

      before { query query_string, context: {current_user: user} }

      let(:expected_result) {
        {
          "id" => order.id.to_s,
          "orderCount" => 2,
          "orderItems" => [
            {
              "quantity" => order.order_items.first.quantity,
              "product" => query_hash(order.order_items.first.product).slice("id", "name"),
            },
            {
              "quantity" => order.order_items.second.quantity,
              "product" => query_hash(order.order_items.second.product).slice("id", "name"),
            },
          ],
          "user" => query_hash(user).slice("id", "email"),
        }
      }

      it "search product with Pizza in name or preview description" do
        expect(gql_response.data[query_type]).to eq(expected_result)
      end
    end
  end
end
