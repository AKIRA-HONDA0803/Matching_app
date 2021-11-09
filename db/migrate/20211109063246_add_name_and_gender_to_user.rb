class AddNameAndGenderToUser < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :name, :string
    change_column :users, :name, :string, null: false
    add_column :users, :gender, :integer, null: false, default: 0
  end

  def down
    change_column :users, :name, :string
  end
end
