class Api::V1::AssignmentsController < ApplicationController
  def index
    assignments = Assignment.all
    render json: AssignmentSerializer.new(assignments)
  end

  def show
    assignment = Assignment.find_by(:id => params[:id])
    render json: AssignmentSerializer.new(assignment)
  end

  def create
    assignment = Assignment.new(assignment_params)
    # subjects = Subject.all
    assignment.save
    render json: assignment
  end

  def destroy
    assignment = Assignment.find_by_id(params[:id])
    assignment.destroy
    render json: assignment
  end

  private

  def assignment_params
    params.require(:assignment).permit(:name, :subject_id)
  end
end
