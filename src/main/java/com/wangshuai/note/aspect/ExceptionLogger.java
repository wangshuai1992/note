package com.wangshuai.note.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ExceptionLogger {
	
	Logger logger = Logger.getLogger(ExceptionLogger.class);
	
	@AfterThrowing(pointcut="within(com.wangshuai.note.manager..*)", throwing="ex")
	public void execute(Exception ex) {
		logger.error("错误！", ex);
	}
	
}
