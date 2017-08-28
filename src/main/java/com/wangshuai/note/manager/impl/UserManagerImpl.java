package com.wangshuai.note.manager.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wangshuai.note.dao.NoteBookMapperDAO;
import com.wangshuai.note.dao.UserMapperDAO;
import com.wangshuai.note.dataobject.NoteBookDO;
import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.dataobject.UserDO;
import com.wangshuai.note.manager.UserManager;
import com.wangshuai.note.utils.Util;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserManagerImpl implements UserManager {

	@Resource
	private UserMapperDAO userDAO;
	
	@Resource
	private NoteBookMapperDAO noteBookDAO;

	public NoteResultVO save(@RequestBody UserDO userDO) {
		NoteResultVO result = new NoteResultVO();
		
		UserDO u = userDAO.findByName(userDO.getCn_user_name());
		if(u != null) {
			result.setStatus("1");
			result.setMsg("用户名被占用");
			return result;
		}
		
		userDO.setCn_user_id(Util.generateId());
		userDO.setCn_user_password(Util.md5(userDO.getCn_user_password()));
		userDAO.save(userDO);
		
		NoteBookDO defaultBook = new NoteBookDO();
		defaultBook.setCn_notebook_id(Util.generateId());
		defaultBook.setCn_user_id(userDO.getCn_user_id());
		defaultBook.setCn_notebook_type_id(0);
		defaultBook.setCn_notebook_name("默认笔记本");
		defaultBook.setCn_notebook_desc("默认记事本");
		defaultBook.setCn_notebook_createtime(new Timestamp(System.currentTimeMillis()));
		noteBookDAO.save(defaultBook);

		result.setStatus("0");
		result.setMsg("注册成功");
		return result;
	}

	public NoteResultVO checkLogin(String name, String password) {
		NoteResultVO result = new NoteResultVO();

		UserDO userDO = userDAO.findByName(name);
		password = Util.md5(password);
		if (userDO == null) {
			result.setStatus("1");
			result.setMsg("用户不存在");
			return result;
		}
		if (!password.equals(userDO.getCn_user_password())) {
			result.setStatus("2");
			result.setMsg("密码错误");
			return result;
		}

		result.setStatus("0");
		result.setMsg("登录成功");

		String token = Util.generateToken();
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("token", token);
		data.put("userId", userDO.getCn_user_id());
		data.put("userName", name);

		result.setData(data);
		return result;
	}

	public NoteResultVO checkLogin(String base64msg) {
		String name = null;
		String password = null;
		try {
			String msg = base64msg.split(" ")[1];
			msg = Util.base64Decode(msg);

			JSONObject jo = JSON.parseObject(msg);
			if (jo.containsKey("cn_user_name")) {
				name = jo.getString("cn_user_name");
			}
			if (jo.containsKey("cn_user_password")) {
				password = jo.getString("cn_user_password");
			}

		} catch (Exception e) {
			e.printStackTrace();
			NoteResultVO result = new NoteResultVO();
			result.setStatus("-1");
			result.setMsg("不合法请求！");
			return result;
		}
		return checkLogin(name, password);
	}

	public NoteResultVO checkPassword(String cn_user_id, String cn_user_password) {
		NoteResultVO result = new NoteResultVO();
		
		String password = userDAO.findById(cn_user_id).getCn_user_password();
		if(!password.equals(Util.md5(cn_user_password))) {
			result.setStatus("1");
			result.setMsg("原密码错误！");
			return result;
		}
		
		result.setStatus("0");
		return result;
	}

	public NoteResultVO changePwd(String newpwd, String userId) {
		NoteResultVO result = new NoteResultVO();
		
		UserDO userDO = new UserDO();
		userDO.setCn_user_id(userId);
		userDO.setCn_user_password(Util.md5(newpwd));
		
		userDAO.update(userDO);
		
		result.setStatus("0");
		
		return result;
	}

}
