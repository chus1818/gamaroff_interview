class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :fb_id
      t.string :first_name

      t.timestamps
    end
  end
end
