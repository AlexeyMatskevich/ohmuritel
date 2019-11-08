require "rails_helper"

RSpec.describe User, type: :model do

  describe "validations" do
    subject { create(:user) }
    it { should validate_presence_of(:last_name) }
    it { should validate_length_of(:last_name).is_at_most(50) }
    it { should validate_presence_of(:first_name) }
    it { should validate_length_of(:last_name).is_at_most(50) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should enumerize(:role).in(:user, :admin) }
  end
end
