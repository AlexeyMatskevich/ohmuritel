require "rails_helper"

RSpec.describe Product, type: :model do
  describe "validations" do
    subject { create(:product) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive }
    it { should validate_length_of(:name).is_at_most(55) }
    it { should validate_presence_of(:weight) }
    it { should validate_numericality_of(:weight).only_integer.is_greater_than(0) }
    it { should validate_presence_of(:price) }
    it { should validate_numericality_of(:price).only_integer.is_greater_than(0) }
    it { should validate_presence_of(:preview_description) }
    it { should validate_length_of(:preview_description).is_at_most(255) }
  end

  it "create Product with image" do
    expect(create(:product, :with_image)).to be_valid
  end
end
