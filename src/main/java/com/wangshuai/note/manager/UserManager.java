package com.wangshuai.note.manager;

import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.dataobject.UserDO;
import org.springframework.stereotype.Service;

@Service
public interface UserManager {
	NoteResultVO checkLogin(String name, String password);
	
	NoteResultVO save(UserDO userDO);
	
	NoteResultVO checkLogin(String base64msg);

	NoteResultVO checkPassword(String cn_user_id, String cn_user_password);

	NoteResultVO changePwd(String newpwd, String userId);
}
