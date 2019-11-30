# This migration was auto-generated via `rake db:generate_trigger_migration'.
# While you can edit this file, any changes you make to the definitions here
# will be undone by the next auto-generated trigger migration.

class CreateTriggersReviewsInsertOrReviewsDelete < ActiveRecord::Migration[6.0]
  def up
    create_trigger("reviews_after_insert_row_tr", generated: true, compatibility: 1)
      .on("reviews")
      .after(:insert) do
      <<~SQL_ACTIONS
        UPDATE products
        SET
          reviews_count = reviews_count + 1,
          overall_rating = overall_rating + NEW.rating,
          rating = (overall_rating + NEW.rating)::float / (reviews_count + 1)
        WHERE id = NEW.product_id;
      SQL_ACTIONS
    end

    create_trigger("reviews_after_delete_row_tr", generated: true, compatibility: 1)
      .on("reviews")
      .after(:delete) do
      <<~SQL_ACTIONS
        UPDATE products
        SET
          reviews_count = reviews_count - 1,
          overall_rating = overall_rating - OLD.rating,
          rating = (overall_rating - OLD.rating)::float / NULLIF((reviews_count - 1), 0)
        WHERE id = OLD.product_id;
      SQL_ACTIONS
    end
  end

  def down
    drop_trigger("reviews_after_insert_row_tr", "reviews", generated: true)

    drop_trigger("reviews_after_delete_row_tr", "reviews", generated: true)
  end
end
