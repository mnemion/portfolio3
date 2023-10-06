document.addEventListener("DOMContentLoaded", function() {
    var f = document.forms["f"];

    // 신청하기 버튼
    document.querySelector("#adm_ok").addEventListener("click", function() {
        // 소속 검사
        if(f.affiliation.value === "") {
            alert("소속을 선택해 주세요.");
            return;
        }
        
        // 부서 검사
        if(f.department.value === "") {
            alert("부서를 선택해 주세요.");
            return;
        }
        
        // 이름 검사
        if(f.name.value === "") {
            alert("이름을 입력해 주세요.");
            return;
        }

        // 직책 검사
        if(f.position.value === "") {
            alert("직책을 선택해 주세요.");
            return;
        }
        
        // 아이디 검사
        if(f.username.value === "") {
            alert("아이디를 입력해 주세요.");
            return;
        }

        // 아이디 길이 검사
        if(f.username.value.length < 5) {
            alert("아이디는 최소 5자 이상이어야 합니다.");
            return;
        }

        // 패스워드 검사
        if(f.password.value === "") {
            alert("패스워드를 입력해 주세요.");
            return;
        }

        // 패스워드 길이 검사
        if(f.password.value.length < 5) {
            alert("패스워드는 최소 5자 이상이어야 합니다.");
            return;
        }

        // 패스워드 확인 검사
        if(f.passwordConfirm.value === "") {
            alert("패스워드 확인을 입력해 주세요.");
            return;
        }

        // 패스워드 일치 검사
        if(f.password.value !== f.passwordConfirm.value) {
            alert("패스워드가 일치하지 않습니다.");
            return;
        }
        
        // 이메일 검사
        if(f.email.value === "") {
            alert("이메일을 입력해 주세요.");
            return;
        }

        // 연락처 검사
        if(f.phone_prefix.value === "" || f.phone_number.value === "" || f.phone_number1.value === "") {
            alert("전화번호를 입력해 주세요.");
            return;
        }
        window.location.href = './index.jsp';
        f.submit();
    });
});

function checkDuplicate() {
    var username = $('#username').val();
    $.ajax({
        url: '/checkUsername.do',
        type: 'post',
        data: {username: username},
        success: function(data) {
            if (data === 'duplicate') {
                alert('이미 사용 중인 아이디입니다.');
            } else {
                alert('사용 가능한 아이디입니다.');
            }
        },
        error: function(request, status, error) {
            alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    });
}