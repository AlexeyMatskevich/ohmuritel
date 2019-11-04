class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.citext :name, null: false
      t.integer :weight, null: false
      t.integer :price, null: false
      t.string :preview_description, null: false

      t.timestamps
    end

    add_index :products, :name, unique: true
  end
end
