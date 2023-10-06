//소속 처리
document.querySelector("#affiliationSelect").addEventListener("change", function(){
    var selectedAffiliation = this.value;
    fetch("./getAdminsByAffiliation.do", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `affiliation=${selectedAffiliation}`
    })
    .then(response => response.json())
    .then(admins => {
        let tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";

        if (admins.length === 0) {
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            cell.textContent = "등록된 관리자가 없습니다.";
            cell.setAttribute("colspan", "9");
            cell.className = "listcenter";
            row.appendChild(cell);
            tableBody.appendChild(row);
        } else {
            admins.forEach(admin => {
                let row = document.createElement("tr");
                row.className = "master_list";

                let keys = ["id", "affiliation", "username", "name", "position", "email", "phone", "status", "apply"];
                keys.forEach(key => {
                    let cell = document.createElement("td");
                    cell.className = "listcenter";
                    if (key === 'phone') {
                        cell.textContent = `${admin['phone_prefix']}${admin['phone_number']}`;
                    } else {
                        cell.textContent = admin[key] ? admin[key] : '';
                    }
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.log("Data Error!!");
    });
});

// 전체 관리자 목록을 저장할 변수
let allAdmins = [];

// 현재 페이지 번호
let currentPage = 1;

// 한 페이지에 표시할 관리자 수
const perPage = 10;

// 페이지 버튼을 만드는 함수
function createPageButtons(totalPages) {
    const pageButtonsDiv = document.querySelector(".propagebt ul");
    pageButtonsDiv.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("li");
        pageBtn.innerHTML = `<a href="javascript:void(0);" data-page="${i}">${i}</a>`;
        pageBtn.addEventListener("click", function() {
            currentPage = i;
            displayAdmins();
        });
        pageButtonsDiv.appendChild(pageBtn);
    }
}

// 행추가
function createRow(admin) {
    const row = document.createElement("tr");
    row.className = "master_list";
    
    const keys = ["id", "affiliation", "username", "name", "position", "email", "phone", "status", "apply"];
    keys.forEach(key => {
        const cell = document.createElement("td");
        cell.className = "listcenter";
        if (key === 'phone') {
            cell.textContent = `${admin['phone_prefix']}${admin['phone_number']}`;
        } else {
            cell.textContent = admin[key] ? admin[key] : '';
        }
        row.appendChild(cell);
    });

    return row;
}

// 관리자 목록을 표시하는 함수
function displayAdmins() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const end = Math.min(allAdmins.length, start + perPage);

    for (let i = start; i < end; i++) {
        const admin = allAdmins[i];
        tableBody.appendChild(createRow(admin));
    }
}


// "전체" 버튼에 이벤트 리스너 추가
document.querySelector(".prochoL button[type='button']").addEventListener("click", function() {
    fetch("./getAdminsByAffiliation.do", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `affiliation=`
    })
    .then(response => response.json())
    .then(admins => {
        allAdmins = admins;
        const totalPages = Math.ceil(allAdmins.length / perPage);
        createPageButtons(totalPages);
        currentPage = 1;  // 페이지를 초기화합니다.
        displayAdmins();  // 관리자 목록을 표시합니다.
    })
    .catch(error => {
        console.log("Data Error!!");
    });
});

//검색 처리
function member_search() {
    // 선택된 검색 유형과 검색어를 가져옵니다.
    const searchPart = document.querySelector('select[name="search_part"]').value;
    const searchText = document.querySelector('input[name="search"]').value;

    // 서버에 검색 쿼리를 보냅니다.
    fetch("./searchAdmins.do", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `searchPart=${searchPart}&searchText=${searchText}`
    })
    .then(response => response.json())
    .then(admins => {
        let tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";

        if (admins.length === 0) {
            // 검색 결과가 없을 경우 "1번"을 출력합니다.
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            cell.textContent = "1번";
            cell.setAttribute("colspan", "9");
            cell.className = "listcenter";
            row.appendChild(cell);
            tableBody.appendChild(row);
        } else {
            // 검색 결과가 있을 경우 테이블에 결과를 표시합니다.
            admins.forEach(admin => {
                let row = document.createElement("tr");
                row.className = "master_list";

                let keys = ["id", "affiliation", "username", "name", "position", "email", "phone", "status", "apply"];
                keys.forEach(key => {
                    let cell = document.createElement("td");
                    cell.className = "listcenter";
                    if (key === 'phone') {
                        cell.textContent = `${admin['phone_prefix']}${admin['phone_number']}`;
                    } else {
                        cell.textContent = admin[key] ? admin[key] : '';
                    }
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error("Data Error:", error);
    });

    return false;
}


//근퇴 처리 로직
function updateStatus(adminId) {
    var status = document.querySelector(`#status-${adminId}`).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/changeStatus.do", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("상태가 업데이트되었습니다.");
        }
    };
    
    xhr.send(`id=${adminId}&status=${status}`);
}