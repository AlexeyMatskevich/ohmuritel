class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  validates :order, :product, presence: true
end
