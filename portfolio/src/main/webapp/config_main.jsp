<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="portfolio.datadto"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	Date today = new Date();
	DateFormat df = new SimpleDateFormat("yyyMMddhms");
	String dates = df.format(today);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./css/page_default.css?v=<%=dates%>">
<link rel="stylesheet" href="./css/admin_css.css?v=<%=dates%>">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap">
<title>관리자 페이지</title>
</head>
<body>
<nav>
<%@ include file="./top2.jsp"%>
</nav>
<main class="page_main">
<%@ include file="./main2.jsp"%>
</main>
<footer>
<%@ include file="./footer2.jsp"%>
</footer>
</body>
<script src="./js/adm_option.js?v=<%=dates%>"></script>
</html>