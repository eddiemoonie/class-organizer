class AssignmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  # belongs_to :subject
  belongs_to :subject
end
