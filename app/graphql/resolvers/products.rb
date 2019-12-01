module Resolvers
  module Products
    def apply_order_with_creation(scope)
      scope
    end

    def apply_order_with_weight(scope)
      scope.order(weight: :desc)
    end

    def apply_order_with_price(scope)
      scope.order(price: :desc)
    end

    def apply_order_with_reviews(scope)
      scope.order(reviews_count: :desc)
    end

    def apply_order_with_rating(scope)
      scope.order(rating: :desc)
    end
  end
end
