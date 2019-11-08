FactoryBot.define do
  factory :user do
    # Use sequence to make sure that the value is unique
    sequence(:first_name) { |n| "Name-#{n}" }
    sequence(:last_name) { |n| "Last_name-#{n}" }
    sequence(:email) { |n| "user-#{n}@example.com" }
    sequence(:password) { |n| "12345Qq#{n}" }

    factory :admin do
      role { :admin }
    end
  end
end
