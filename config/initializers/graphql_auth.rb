GraphQL::Auth.configure do |config|
  config.token_lifespan = 4.hours
  config.jwt_secret_key = if Rails.env.production?
    Rails.application.credentials.jwt_secret_key
  else
    "8760dbbe7a615ed48ed99f6a0aef206a26a853d0820ad877c0251a43e7c931e100cb7506b0f6d5b7d7e6d1af02f38afe1832476451301ae85d65804264f5cf4f"
  end

  config.app_url = if Rails.env.production?
    "https://#{ENV["HEROKU_APP_NAME"]}.herokuapp.com"
  else
    "http://localhost:3000"
  end

  config.user_type = "Types::UserType"

  # Devise allowed actions
  # Don't forget to enable the lockable setting in your Devise user model if you plan on using the lock_account feature
  config.allow_sign_up = true
  # config.allow_lock_account = false
  # config.allow_unlock_account = false

  # Allow custom mutations for signup and update account
  config.sign_up_mutation = "Mutations::SignUp"
  config.update_account_mutation = "Mutations::UpdateAccount"
end
