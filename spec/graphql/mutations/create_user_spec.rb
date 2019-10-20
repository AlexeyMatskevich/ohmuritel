require "rails_helper"

RSpec.describe Mutations::CreateUser do
  subject { described_class }

  it { is_expected.to have_a_field(:user).of_type(Types::UserType) }

  describe "#resolve" do
    subject { described_class.new(object: nil, context: {}).resolve(params) }

    let(:params) do
      {
        first_name: "John",
        last_name: "Wick",
        email: "John@example.com",
        password: "123456Qq",
        password_confirmation: "123456Qq",
      }
    end

    it "create user" do
      expect(subject[:user].persisted?).to eq true
    end
  end
end
