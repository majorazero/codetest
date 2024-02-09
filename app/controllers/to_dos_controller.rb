class ToDosController < ApplicationController
  before_action :set_to_do, only: %i[ show edit update destroy ]

  # GET /to_dos or /to_dos.json
  def index
    @to_dos = ToDo.all
    data = @to_dos.order("updated_at DESC").sort_by{|a| a.done ? 1 : 0 }
    render json: data
  end

  # GET /to_dos/1 or /to_dos/1.json
  def show
  end

  # GET /to_dos/new
  def new
    @to_do = ToDo.new
  end

  # GET /to_dos/1/edit
  def edit
  end

  # POST /to_dos or /to_dos.json
  def create
    @to_do = ToDo.new(to_do_params)

    respond_to do |format|
      if @to_do.save
        format.json { render :show, status: :created, location: @to_do }
      else
        format.json { render json: @to_do.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /to_dos/1 or /to_dos/1.json
  def update
    respond_to do |format|
      if @to_do.update(to_do_params)
        format.json { render :show, status: :ok, location: @to_do }
      else
        format.json { render json: @to_do.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /to_dos/1 or /to_dos/1.json
  def destroy
    @to_do.destroy!

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_to_do
      @to_do = ToDo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def to_do_params
      params.require(:to_do).permit(:done, :description)
    end
end
