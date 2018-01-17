package com.videtek.jwt.demo.base.exception;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * 
* @ClassName: MyExceptionHandler 
* @Description: 全局异常控制 
* @author bing
* @date 2017年3月8日 下午4:30:53 
*
 */
public class MyExceptionHandler implements HandlerExceptionResolver {
	
	private static final Logger logger= Logger.getLogger(MyExceptionHandler.class);

	@Override
	public ModelAndView resolveException(HttpServletRequest paramHttpServletRequest,
                                         HttpServletResponse paramHttpServletResponse, Object paramObject, Exception paramException) {
		Map<String, Object> model = new HashMap<String, Object>();
		logger.error(paramException);
		model.put("message", paramException);
		return new ModelAndView("error", model);
	}

}
