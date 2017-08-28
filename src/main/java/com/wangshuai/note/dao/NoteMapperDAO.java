package com.wangshuai.note.dao;

import com.wangshuai.note.dataobject.NoteDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoteMapperDAO {
	List<NoteDO> findByNoteBookId(String bookId);

	void deleteByBookId(String bookId);

	void save(NoteDO noteDO);

	NoteDO findByNoteId(String noteId);

	void updateById(NoteDO noteDO);

	List<NoteDO> findTrashedNotesByUserId(String userId);

	void deleteNoteById(String noteId);
}
