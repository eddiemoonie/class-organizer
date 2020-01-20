class SubjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :assignments
end
