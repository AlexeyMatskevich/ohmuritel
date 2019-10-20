require "rails_helper"

RSpec.describe Mutations::BaseMutation do
  subject { described_class }

  it { is_expected.to have_a_field(:errors).of_type("[AttributesError!]!") }

  describe "#add_attribute_errors" do
    subject { described_class.new(object: nil, context: {}).add_attribute_errors(obj) }

    let(:obj) {
      build :user,
        first_name: "John",
        last_name: "Wick",
        email: "John@example.com",
        password: "123456Qq",
        password_confirmation: "1"
    }

    let(:expected_errors) do
      [{message: "doesn't match Password", path: [:password_confirmation]}]
    end

    it "return errors" do
      obj.save
      expect(subject[:errors]).to eq expected_errors
    end
  end
end
