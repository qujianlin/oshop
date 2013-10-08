jQuery.ajaxcomm={
		ajaxSaveForm:function(url,params){
		 var obj="";
			$.ajax({
			     url: url,
			     data:params,
			     cache:false,
			     async:false,
			     type:"post",
			     dataType:"json",
			     success: function(data){
			    	 obj=data;
			       },
			      error:function(err,a,b){
			    	  alert('操作失败!');
			   		}
			});
			return obj;
	},
	ajaxGetData:function(url,params){
		 var obj="";
		$.ajax({
		     url: url,
		     data:params,
		     cache:false,
		     async:false,
		     type:"post",
		     dataType:"json",
		     success: function(data){
		    	 obj=data;
		       },
		      error:function(err,a,b){
		    	  alert('操作失败!');
		   		}
		});
		return obj;
	}
}