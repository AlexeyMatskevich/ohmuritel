module Types
  class QueryType < Types::BaseObject
    field :product, Types::ProductType, "Returns a product", null: true do
      argument :id, ID, "Product id", required: true
    end

    field :products_autocomplete, [String], "Returns a autocomplete by name of product", null: false do
      argument :search, String, "Search autocomplete", required: true
    end

    field :reviews_connection, Types::ReviewType.connection_type, "Returns products", null: false do
      argument :product_id, ID, "Product id", required: true
    end

    field :products_connection, resolver: Resolvers::ProductsConnection
    field :products_count, Int, "Returns a count of products", null: false
    field :products_pages, function: Resolvers::ProductsPages

    field :search_products_count, Int, "Returns a count of products", null: false do
      argument :search, String, "Search with this name or preview description", required: true
    end

    field :search_products_pages, [Types::ProductType], "Returns paginated products", null: false do
      argument :search, String, "Search with this name or preview description", required: true
      argument :page_size, Int, "Page size", required: true
      argument :page, Int, "Number of page", required: true
    end

    field :product_name_taken, Boolean, "Checks for exists product with this name", null: false do
      argument :name, String, "Product name", required: true
    end

    field :user, Types::UserType, "Returns a user by id", null: true, authorize: true do
      argument :id, ID, "User ID", required: true
    end

    field :users, [Types::UserType], "Returns a list of users", null: false, authorize: true
    field :current_user, Types::UserType, "Returns current user", null: true
    field :user_email_taken, Boolean, "Checks for exists user with this name", null: false do
      argument :email, String, "User email", required: true
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
