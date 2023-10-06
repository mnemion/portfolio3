package portfolio;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository("data")
public class module {
	
	@Resource(name="sqlsession")
	private SqlSessionTemplate session;
	private datadto dto;
	
	public datadto select() {
		this.dto = session.selectOne("");		
		return this.dto;
	}
}
