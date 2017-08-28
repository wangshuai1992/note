package com.wangshuai.note.dao;

import com.wangshuai.note.dataobject.NoteBookDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoteBookMapperDAO {
	List<NoteBookDO> findAll();
	
	List<NoteBookDO> findByUserId(String cn_user_id);
	
	void save(NoteBookDO noteBookDO);
	
	void update(NoteBookDO noteBookDO);

	void deleteById(String bookId);
	
}
