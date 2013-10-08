<%@ page language="java" import="java.util.*,java.net.URL"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ include file="/WEB-INF/pages/include/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>后台管理系统登陆</title>

<link rel="stylesheet" href="<%=basePath %>resources/css/reset.css"	type="text/css" media="screen" />
<link rel="stylesheet" href="<%=basePath %>resources/css/style.css"	type="text/css" media="screen" />
<link rel="stylesheet" href="<%=basePath %>resources/css/invalid.css" type="text/css" media="screen" />
</head>
<body id="login">
<div id="login-wrapper" class="png_bg">
	<div id="login-top">
		<h1>Simpla Admin</h1>
		<a href="#"><img id="logo" src="<%=basePath %>resources/images/logo.png" alt="Simpla Admin logo" />
		</a>
	</div>
	<div id="login-content">
		<form id="loginForm" action="${action }" method="post">
			<input type="hidden" name="password" id="password" />
			<div class="notification error png_bg" >
	        	<c:choose>
	        		<c:when test="${!empty sessionMessage}">
	        			<div id="msg">${sessionMessage }</div>
	        		</c:when>
	        		<c:otherwise>
	        			<div id="msg" style="display: none;">${sessionMessage }</div>
	        		</c:otherwise>
	        	</c:choose>
	        </div>
			<p>
		    	<label>用户名</label>
		        <input class="text-input" type="text" name="loginName" id="loginname" />
		    </p>
		    <div class="clear"></div>
		    <p>
		        <label>密码</label>
		        <input class="text-input" type="password" id="_password"/>
		    </p>
			<div class="clear"></div>
			<p id="remember-password">
				<input type="checkbox" /> 记住我
			</p>
			<div class="clear"></div>
			<p>
				<input class="button" type="button" id="login_button" value="登陆" />
			</p>
		</form>
	</div>
</div>
<script type="text/javascript" src="<%=basePath %>resources/scripts/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#login_button").click(function(e) {
        if($("#loginname").val().trim().length==0) {
			$("#msg").text("用户名不能为空!").show();
			return;
		}
		if($("#_password").val().length==0) {
			$("#msg").text("密码不能为空!").show();
			return;
		}
		//TODO: 进行加密处理
		$("#password").val($("#_password").val());
		$("#loginForm").submit();
    });
    $("html").off().on("keydown",function(event){  
	    if(event.keyCode==13){  
	    	$("#login_button").click();
	    }  
	});
});
</script>
</body>
</html>
