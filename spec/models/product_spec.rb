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

  describe "Search", search: true do
    it "searches by name" do
      create(:product, :reindex, name: "Pizza")
      Product.reindex
      assert_equal ["Pizza"], Product.search("Pizza").map(&:name)
      assert_equal ["Pizza"], Product.search("Pi", match: :word_start, load: false).map(&:name)
    end

    it "searches by preview_description" do
      create(:product, :reindex, preview_description: "Pizza with sausage")
      assert_equal ["Pizza with sausage"], Product.search("sausage").map(&:preview_description)
    end
  end
end
