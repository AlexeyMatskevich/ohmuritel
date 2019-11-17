require "rails_helper"

RSpec.describe Types::Url do
  describe "validate url" do
    subject { Types::Url.coerce_input(url, nil) }
    let(:url) { "https://site.com" }
    it "return url" do
      expect(subject).to eq URI.parse(url)
    end

    context "url invalid" do
      let(:url) { "site" }

      it "raise error" do
        expect { subject }.to raise_error(GraphQL::CoercionError, "\"#{url}\" is not a valid URL")
      end
    end
  end
end
