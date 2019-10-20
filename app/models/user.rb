class User < ApplicationRecord
  has_secure_password

  validates :last_name, presence: true, length: {maximum: 50}
  validates :first_name, presence: true, length: {maximum: 50}
  validates :email, presence: true, length: {maximum: 255},
                    format: {with: URI::MailTo::EMAIL_REGEXP},
                    uniqueness: {case_sensitive: false}
  validates :password, presence: true, length: {minimum: 8}
end
