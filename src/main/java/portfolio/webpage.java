package portfolio;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class webpage {
	@Resource(name="data")
	private module sm;
	
	@RequestMapping("/test.do")
	public String test(Model m) {
		datadto dto = this.sm.select();
		m.addAttribute("dto", dto);
		return null;
	}
}
