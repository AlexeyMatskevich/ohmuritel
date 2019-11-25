module Types
  class QueryType < Types::BaseObject
    field :product, Types::ProductType, null: true, description: "Returns a product" do
      argument :id, ID, required: true, description: "Product id"
    end

    field :products_autocomplete, [String], null: false, description: "Returns a autocomplete by name of product" do
      argument :search, String, required: true, description: "Search autocomplete"
    end

    field :reviews_connection, Types::ReviewType.connection_type, null: false, description: "Returns products" do
      argument :product_id, ID, required: true, description: "Product id"
    end

    field :products_connection, Types::ProductType.connection_type, null: false, description: "Returns products"
    field :products_count, Int, null: false, description: "Returns a count of products"
    field :products_pages, [ProductPagesType], null: false, description: "Returns paginated products" do
      argument :page_size, Int, required: true, description: "Page size"
      argument :page, Int, required: true, description: "Number of page"
    end

    field :search_products_count, Int, null: false, description: "Returns a count of products" do
      argument :search, String, required: true, description: "Search with this name or preview description"
    end

    field :search_products_pages, [Types::ProductType], null: false, description: "Returns paginated products" do
      argument :search, String, required: true, description: "Search with this name or preview description"
      argument :page_size, Int, required: true, description: "Page size"
      argument :page, Int, required: true, description: "Number of page"
    end

    field :product_name_taken, Boolean, null: false, description: "Checks for exists product with this name" do
      argument :name, String, required: true, description: "Product name"
    end

    field :user, Types::UserType, null: true, authorize: true, description: "Returns a user by id" do
      argument :id, ID, required: true, description: "User ID"
    end

    field :users, [Types::UserType], null: false, authorize: true, description: "Returns a list of users"
    field :current_user, Types::UserType, null: true, description: "Returns current user"
    field :user_email_taken, Boolean, null: false, description: "Checks for exists user with this name" do
      argument :email, String, required: true, description: "User email"
    end

    def product(id:)
      Product.find(id)
    end

    def reviews_connection(product_id:)
      Review.where(product_id: product_id).reverse_order
    end

    def products_autocomplete(search:)
      Product.search(search, fields: [:name], match: :word_start, limit: 10, load: false).map(&:name)
    end

    def search_products_count(search:)
      Product.search(search, load: false).total_count
    end

    def search_products_pages(page_size:, page:, search: nil)
      raise GraphQL::ExecutionError, "Page must be greater than 0" if page <= 0

      Product.search(search, per_page: page_size, page: page)
    end

    def products_pages(page_size:, page:)
      raise GraphQL::ExecutionError, "Page must be greater than 0" if page <= 0

      [{id: page, products: Product.limit(page_size).offset((page - 1) * page_size)}]
    end

    def products_count
      Product.count
    end

    def products_connection
      Product.all
    end

    def product_name_taken(name:)
      Product.exists?(name: name)
    end

    def users
      User.all
    end

    def current_user
      context[:current_user]
    end

    def user(id:)
      User.find(id)
    end

    def user_email_taken(email:)
      User.exists?(email: email)
    end
  end
end
