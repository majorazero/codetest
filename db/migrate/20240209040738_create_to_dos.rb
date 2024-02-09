class CreateToDos < ActiveRecord::Migration[7.1]
  def change
    create_table :to_dos do |t|
      t.boolean :done
      t.string :description, null: false

      t.timestamps
    end
  end
end
