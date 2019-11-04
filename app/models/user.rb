class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  validates :last_name, presence: true, length: {maximum: 50}
  validates :first_name, presence: true, length: {maximum: 50}
  validates :email, uniqueness: {case_sensitive: false}
end
