class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items

  validates :user, presence: true
end
