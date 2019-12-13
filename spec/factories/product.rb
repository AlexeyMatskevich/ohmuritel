FactoryBot.define do
  factory :product do
    # Use sequence to make sure that the value is unique
    sequence(:name) { |n| "Name-#{n}" }
    weight { 25 }
    price { 15 }
    preview_description { "Description" }

    trait :with_image do
      image { FilesTestHelper.png }
    end

    trait :with_reviews do
      transient do
        review_count { 1 }
        review_rating { 4 }
      end

      after :create do |product, evaluator|
        create_list :review, evaluator.review_count, product: product, rating: evaluator.review_rating
      end
    end

    trait :reindex do
      after(:create) do |product|
        product.reindex(refresh: true)
      end
    end
  end
end
