class AddCompositeIndexToOrderItem < ActiveRecord::Migration[6.0]
  def change
    add_index :order_items, [:order_id, :product_id], unique: true
  end
end
