package portfolio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository("data")
public class module {
	
	@Resource(name="sqlsession")
	private SqlSessionTemplate session;
	
	//회원가입 처리
	public void insert(datadto dto) {
		session.insert("portfolioDB.insertMember", dto);
	}
	
	// 아이디 중복 체크
	public boolean checkUsername(datadto dto) {
		int count = session.selectOne("portfolioDB.checkUsername", dto);
		return count > 0;
	}
	
	// 로그인 시도 횟수를 조회
	public int getLoginAttempts(datadto dto) {
		Integer result = session.selectOne("portfolioDB.getLoginAttempts", dto);
	    return Optional.ofNullable(result).orElse(0);
	}
		
	// 로그인 시도 횟수를 5로 설정
	public void setLoginAttemptsToFive(datadto dto) {
	    session.update("portfolioDB.setLoginAttemptsToFive", dto);
	}

	// 로그인 시도 횟수를 0으로 초기화
	public void resetLoginAttempts(datadto dto) {
	    session.update("portfolioDB.resetLoginAttempts", dto);
	}
		
	// 로그인 시도 횟수를 증가
	public void increaseLoginAttempts(datadto dto) {
		session.update("portfolioDB.increaseLoginAttempts", dto);
	}
		
	// 아이디와 비밀번호를 확인
	public boolean checkLogin(datadto dto) {
		int count = session.selectOne("portfolioDB.checkLogin", dto);
		return count > 0;
	}
	
	// IP 확인
	public boolean checkIP(datadto dto) {
		int count = session.selectOne("portfolioDB.checkIP", dto);
		return count > 0;
	}
	
	/* 위 코드들은 회원가입과 로그인 파트 */
	
	// 현황 업데이트 처리
	public String getCurrentStatus(datadto dto) {
	    return session.selectOne("portfolioDB.getCurrentStatus", dto);
	}
	
	// 관리자 목록을 가져옴
	public List<datadto> getAdmins() {
	    return session.selectList("portfolioDB.getAdmins");
	}
	
	// 소속에 따른 관리자 목록을 가져옴
	public List<datadto> getAdminsByAffiliation(String affiliation) {
	    return session.selectList("portfolioDB.getAdminsByAffiliation", affiliation);
	}
	
	// 검색에 따른 관리자 목록을 가져옴
	public List<datadto> searchAdmins(String searchPart, String searchText) {
	    Map<String, String> params = new HashMap<>();
	    params.put("searchPart", searchPart);
	    params.put("searchText", searchText);
	    return session.selectList("portfolioDB.searchAdmins", params);
	}
	
	//페이징 처리
	public List<datadto> getAdmins(RowBounds rowBounds) {
	    return session.selectList("portfolioDB.getAdmins", null, rowBounds);
	}
	
	// 전체 관리자 수를 가져옴
	public int getTotalAdmins() {
	    return session.selectOne("portfolioDB.getTotalAdmins");
	}
	
	//상태 업데이트 [퇴직, 근무]
	public void updateStatus(datadto dto) {
	    session.update("portfolioDB.updateStatus", dto);
	    
	    //상태가 "근무중"으로 변경되면 로그인 시드 횟수를 0으로 리셋
	    if ("근무중".equals(dto.getStatus())) {
	    	resetLoginAttempts(dto);
	    }
	}
	

}