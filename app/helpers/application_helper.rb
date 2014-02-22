module ApplicationHelper

  def include_from_remote key
    method_name = "include_remote_#{key}"
    send method_name if private_methods.include? method_name.to_sym
  end

private
  
  def include_remote_jquery_mobile
    stylesheet = stylesheet_link_tag "//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.0/jquery.mobile.min.css"
    javascript = javascript_include_tag "//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.0/jquery.mobile.min.js"
    
    stylesheet + javascript
  end

end
