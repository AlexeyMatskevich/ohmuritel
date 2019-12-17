require "rails_helper"

describe Order do
  describe "validations" do
    it { should validate_presence_of(:user) }
  end

  it { should have_many :order_items }
  it { should belong_to :user }
end
