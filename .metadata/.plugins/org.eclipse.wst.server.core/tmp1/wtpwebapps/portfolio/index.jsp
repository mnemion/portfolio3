<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./css/admin_css.css?v=2023090212">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap">
<title>관리자 페이지</title>
<script>
	window.onload = function() {
	    var msg = '<%= request.getSession().getAttribute("msg") %>';
	    if (msg != null && msg != '' && msg != 'null') {
	        alert(msg);
	        <% request.getSession().removeAttribute("msg"); %>
	    }
	}
</script>
</head>
<body>
  <div class="adbody">
      <div class="adtitle">ADMINISTRATOR</div>
      <div class="admoom">
        <form id="member_log" name="member_log" method="post" action="./index.do">
          <div class="intotal"> 
            <div class="adin1">
              <input type="text" name="username" id="login_id" class="loginid" placeholder="아이디">
            </div>
            <div class="adin2">
              <input type="password" name="password" id="login_pass" class="loginpass" placeholder="패스워드">
            </div>
          </div>
          <div class="adbt">
            <button type="submit" class="loginbt1" id="login_button">로그인</button>
            <button type="button" class="loginbt2" id="member_add">회원가입</button>
          </div>
          <div class="adinfomain">
            <ul>
               <li class="adinfo">※ 사원번호가 없을시 관리자에게 연락 바랍니다.</li>
               <li class="adinfo">※ 모든 정보는 기록되어 집니다.</li>
               <li class="adinfo">※ 퇴사시 해당 정보는 접속이 불가능 하게 됩니다.</li>
            </ul>
          </div>
         </form>
      </div>
   </div>
</body>
<script src="./js/page_result.js?v=<?php echo $daterecall?>"></script>
</html>