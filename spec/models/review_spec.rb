require "rails_helper"

RSpec.describe Review, type: :model do
  describe "validations" do
    it { should validate_presence_of(:rating) }
    it { should validate_numericality_of(:rating).only_integer.is_greater_than(0) }
    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_most(255) }
  end

  it { should belong_to :user }
  it { should belong_to :product }
end
