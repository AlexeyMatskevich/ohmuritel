FactoryBot.define do
  factory :user do
    # Use sequence to make sure that the value is unique
    first_name { "First name" }
    last_name { "Last name" }
    sequence(:email) { |n| "user-#{n}@example.com" }
    password { "12345678" }

    factory :admin do
      role { :admin }
    end
  end
end
