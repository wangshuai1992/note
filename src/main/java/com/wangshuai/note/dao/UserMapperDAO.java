package com.wangshuai.note.dao;

import com.wangshuai.note.dataobject.UserDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapperDAO {
	List<UserDO> findAll();
	
	UserDO findByName(String name);
	
	void save(UserDO userDO);
	
	void update(UserDO userDO);

	UserDO findById(String cn_user_id);

	UserDO findByBookId(String bookId);
	
}
