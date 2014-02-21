class UsersController < ApplicationController
  def create
    unless User.find_by_fb_id params[:user][:fb_id]
      user = User.new params[:user]
      
      if user.save
        render json: 'user successfully saved', status: 201
      else
        render json: 'user not saved', status: 304
      end
    else
      render json: 'user already exists', status: 304
    end
  end
end
