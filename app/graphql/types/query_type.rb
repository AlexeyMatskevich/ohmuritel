module Types
  class QueryType < Types::BaseObject
    field :product, Types::ProductType, null: true, description: "Returns a product" do
      argument :id, ID, required: true, description: "Product id"
    end

    field :products_connection, ProductConnection, null: false, description: "Returns a list of products with cursor"
    field :products_count, Int, null: false, description: "Returns a count of products"
    field :products_pages, [Types::ProductPagesType], null: false, description: "Returns a list of products" do
      argument :page_size, Int, required: true, description: "Page size"
      argument :page, Int, required: true, description: "Number of page"
    end

    field :product_by_name, Types::ProductType, null: true, description: "Returns product by name" do
      argument :name, String, required: true, description: "Product name"
    end

    field :user, Types::UserType, null: true, authorize: true, description: "Returns a user by id" do
      argument :id, ID, required: true, description: "User ID"
    end

    field :users, [Types::UserType], null: false, authorize: true, description: "Returns a list of users"
    field :current_user, Types::UserType, null: true, description: "Returns current user"
    field :user_by_email, Types::UserType, null: true, description: "Returns a user by email" do
      argument :email, String, required: true, description: "User email"
    end

    def product(id:)
      Product.find(id)
    end

    def products_count
      Product.count
    end

    def products_pages(page_size:, page:)
      raise GraphQL::ExecutionError, "Page must be greater than 0" if page <= 0

      [{id: page, products: Product.limit(page_size).offset((page - 1) * page_size)}]
    end

    def products_connection
      Product.all
    end

    def product_by_name(name:)
      Product.find_by_name(name)
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

    def user_by_email(email:)
      User.find_by_email(email)
    end
  end
end
