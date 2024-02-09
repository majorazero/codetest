json.extract! to_do, :id, :done, :description, :created_at, :updated_at
json.url to_do_url(to_do, format: :json)
