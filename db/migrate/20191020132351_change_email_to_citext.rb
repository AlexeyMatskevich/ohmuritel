class ChangeEmailToCitext < ActiveRecord::Migration[6.0]
  def change
    enable_extension("citext")

    change_column :users, :email, :citext
  end
end
