module FilesTestHelper
  extend self
  extend ActionDispatch::TestProcess

  def png_name
    "test.png"
  end

  def png
    upload(png_name, "image/png")
  end

  def blob_for_png
    blob_for(png_name, "image/png")
  end

  private

  def blob_for(name, type)
    ActiveStorage::Blob.create_after_upload!(
      io: File.open(Rails.root.join("spec", "support", "assets", name)),
      filename: name,
      content_type: type
    )
  end

  def upload(name, type)
    file_path = Rails.root.join("spec", "support", "assets", name)
    fixture_file_upload(file_path, type)
  end
end
