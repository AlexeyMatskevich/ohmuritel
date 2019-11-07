class Product < ApplicationRecord
  validates :name, presence: true, length: {maximum: 55}, uniqueness: {case_sensitive: false}
  validates :weight, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :price, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :preview_description, length: {maximum: 255}, presence: true
end
