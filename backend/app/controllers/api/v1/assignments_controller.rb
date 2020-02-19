class Api::V1::AssignmentsController < ApplicationController
  def index
    if params[:subject_id]
      assignments = Subject.find(params[:subject_id]).assignments
    else
      assignments = Assignment.all
    end
    render json: AssignmentSerializer.new(assignments)
  end

  def show
    assignment = Assignment.find_by(:id => params[:id])
    render json: AssignmentSerializer.new(assignment)
  end

  def create
    assignment = Assignment.new(assignment_params)
    # subjects = Subject.all
    render json: AssignmentSerializer.new(assignment)
  end

  def destroy
    assignment = Assignment.find_by_id(params[:id])
    assignment.destroy
    render json: AssignmentSerializer.new(assignment)
  end

  private

  def assignment_params
    params.require(:assignment).permit(:name, :subject_id)
  end
end
