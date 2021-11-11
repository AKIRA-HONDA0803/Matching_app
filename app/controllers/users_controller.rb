class UsersController < ApplicationController
  before_action :authenticate_user!
  def show
    @user = User.find(params[:id])
  end

  def index
    @users = User.where.not(id: current_user.id)
    # where.notで条件にマッチしないレコードを全て返す
    @user = User.find(current_user.id)
  end

end
