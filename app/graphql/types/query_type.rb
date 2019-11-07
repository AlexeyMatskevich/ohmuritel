module Types
  class QueryType < Types::BaseObject
    field :users,
      [Types::UserType],
      null: false,
      description: "Returns a list of users"

    field :products,
      [Types::ProductType],
      null: false,
      description: "Returns a list of products"

    field :product_by_name, Types::ProductType, null: true do
      description "Returns product by name"

      argument :name, String, required: true do
        description "Product name"
      end
    end

    field :user, Types::UserType, null: true do
      description "Returns a user by id"

      argument :id, ID, required: true do
        description "User ID"
      end
    end

    field :user_by_email, Types::UserType, null: true do
      description "Returns a user by email"

      argument :email, String, required: true do
        description "User email"
      end
    end

    def products
      Product.all
    end

    def product_by_name(name:)
      Product.find_by_name(name)
    end

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end

    def user_by_email(email:)
      User.find_by_email(email)
    end
  end
end
