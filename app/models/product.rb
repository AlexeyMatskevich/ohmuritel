class Product < ApplicationRecord
  extend FriendlyId

  searchkick default_fields: %w[name^5 preview_description], word_start: [:name]
  has_rich_text :description
  has_one_attached :image
  has_many :reviews
  friendly_id :name, use: :slugged

  validates :name, presence: true, length: {maximum: 55}, uniqueness: {case_sensitive: false}
  validates :weight, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :price, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :preview_description, length: {maximum: 255}, presence: true

  def search_data
    {
      name: name,
      preview_description: preview_description,
    }
  end
end
