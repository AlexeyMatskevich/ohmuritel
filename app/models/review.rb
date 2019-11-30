class Review < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :body, length: {maximum: 255}, presence: true
  validates :rating, presence: true, numericality: {only_integer: true, greater_than: 0, less_than: 6}

  trigger.after(:insert) do
    <<~SQL
      UPDATE products
      SET
        reviews_count = reviews_count + 1,
        overall_rating = overall_rating + NEW.rating,
        rating = (overall_rating + NEW.rating)::float / (reviews_count + 1)
      WHERE id = NEW.product_id;
    SQL
  end

  trigger.after(:delete) do
    <<~SQL
      UPDATE products
      SET
        reviews_count = reviews_count - 1,
        overall_rating = overall_rating - OLD.rating,
        rating = (overall_rating - OLD.rating)::float / NULLIF((reviews_count - 1), 0)
      WHERE id = OLD.product_id;
    SQL
  end
end
