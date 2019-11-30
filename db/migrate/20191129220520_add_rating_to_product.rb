class AddRatingToProduct < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :reviews_count, :integer, null: false, default: 0
    add_column :products, :overall_rating, :integer, null: false, default: 0
    add_column :products, :rating, :float
  end
end
