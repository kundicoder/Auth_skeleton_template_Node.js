


<% if(message.success){ %>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Hello!</strong>  <%= message.success %>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
<% } %>


<% if(message.feedback){ %>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Hello!</strong>  <%= message.feedback %>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    </div>
<% } %>