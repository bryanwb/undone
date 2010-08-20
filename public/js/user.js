      $(document).ready(function(){
	  var buttonEdit = $('#buttonEdit');
	  buttonEdit.click(function(event){
             event.preventDefault();
             $("#firstName,#lastName").attr('disabled', '');
	     buttonEdit.attr('value', "Update");
	 });
			    
      }
      );
