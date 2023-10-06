<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>검색 폼 만들기</title>
</head>
<body>
	<form id="f" method="post" action="./search.do">
	검색어 입력 : <input type="text" name="search"><br>
	<input type="button" value="검색" id=search>
	</form>
</body>
<script>
	document.querySelector("#search").addEventListener("click", function(){
		f.submit();
	});
</script>
</html>