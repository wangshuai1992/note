package com.wangshuai.note.dao;

import com.wangshuai.note.dataobject.SharedNoteDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SharedNoteMapperDAO {

	void save(SharedNoteDO share);

	void deleteByNoteId(String noteId);

	List<SharedNoteDO> findNotesLike(String key);

	void updateByNoteId(SharedNoteDO share);
}
