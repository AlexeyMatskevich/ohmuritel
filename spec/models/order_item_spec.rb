require "rails_helper"

describe OrderItem do
  describe "validations" do
    it { should validate_presence_of(:order) }
    it { should validate_presence_of(:product) }
  end

  it { should belong_to :order }
  it { should belong_to :product }
end
