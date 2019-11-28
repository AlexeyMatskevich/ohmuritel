class User < ApplicationRecord
  extend Enumerize
  has_many :reviews
  enumerize :role, in: [:user, :admin], default: :user

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  validates :last_name, presence: true, length: {maximum: 50}
  validates :first_name, presence: true, length: {maximum: 50}
  validates :email, uniqueness: {case_sensitive: false}
end
