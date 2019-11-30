require "rails_helper"

describe Review do
  describe "validations" do
    it { should validate_presence_of(:rating) }
    it { should validate_numericality_of(:rating).only_integer.is_greater_than(0) }
    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_most(255) }
  end

  it { should belong_to :user }
  it { should belong_to :product }

  describe "#create" do
    let(:product) { create(:product) }
    let(:review) { create(:review, product: product, rating: 5) }
    let(:reviews) { create_pair(:review, product: product, rating: 4) }

    it "update product rating" do
      expect { review; product.reload }.to change(product, :rating).from(nil).to(5)
      expect { reviews; product.reload }.to change(product, :rating).from(5).to(4.33333333333333)
    end
  end

  describe "#destroy" do
    let(:product) { create(:product) }
    let!(:review) { create(:review, product: product, rating: 5) }
    let!(:reviews) { create_pair(:review, product: product, rating: 4) }

    it "update product rating" do
      expect { Review.delete(reviews) }.to change { product.reload.rating }.from(4.33333333333333).to(5)
      expect { review.delete; product.reload }.to change(product, :rating).from(5).to(nil)
    end
  end
end
