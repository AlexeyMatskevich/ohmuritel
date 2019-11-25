class Review < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :body, length: {maximum: 255}, presence: true
  validates :rating, presence: true, numericality: {only_integer: true, greater_than: 0, less_than: 6}
end
