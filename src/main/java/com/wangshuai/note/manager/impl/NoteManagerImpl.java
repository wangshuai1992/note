package com.wangshuai.note.manager.impl;

import com.wangshuai.note.dao.NoteMapperDAO;
import com.wangshuai.note.dao.SharedNoteMapperDAO;
import com.wangshuai.note.dao.UserMapperDAO;
import com.wangshuai.note.dataobject.NoteDO;
import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.dataobject.SharedNoteDO;
import com.wangshuai.note.manager.NoteManager;
import com.wangshuai.note.constants.NoteStatus;
import com.wangshuai.note.utils.Util;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NoteManagerImpl implements NoteManager {

	@Resource
	private NoteMapperDAO noteDAO;
	@Resource
	private UserMapperDAO userDAO;
	@Resource
	private SharedNoteMapperDAO shareDAO;
	
	public NoteResultVO loadListByBookId(String bookId) {
		NoteResultVO result = new NoteResultVO();
		
		List<NoteDO> list = noteDAO.findByNoteBookId(bookId);
		
		result.setStatus("0");
		result.setData(list);
		
		return result;
	}

	public NoteResultVO addNote(String bookId, String noteName, String userId) {
		NoteResultVO result = new NoteResultVO();
		
		NoteDO noteDO = new NoteDO();
		String noteId = Util.generateId();
		noteDO.setCn_note_id(noteId);
		noteDO.setCn_notebook_id(bookId);
		noteDO.setCn_user_id(userId);
		noteDO.setCn_note_status_id(NoteStatus.NORMAL_NOTE);
		noteDO.setCn_note_title(noteName);
		noteDO.setCn_note_create_time(System.currentTimeMillis());
		noteDO.setCn_note_last_modify_time(System.currentTimeMillis());
		
		noteDAO.save(noteDO);
		
		result.setStatus("0");
		result.setData(noteId);
		return result;
	}

	public NoteResultVO loadNote(String noteId) {
		NoteResultVO result = new NoteResultVO();
		
		NoteDO noteDO = noteDAO.findByNoteId(noteId);
		
		result.setStatus("0");
		result.setData(noteDO);
		return result;
	}

	public NoteResultVO updateNote(String noteId, String noteTitle, String noteBody) {
		NoteResultVO result = new NoteResultVO();
		
		boolean isShared = false;
		
		if(noteDAO.findByNoteId(noteId).getCn_note_status_id().equals(NoteStatus.SHARED_NOTE)) {
			isShared = true;
		}
		
		NoteDO noteDO = new NoteDO();
		noteDO.setCn_note_id(noteId);
		noteDO.setCn_note_title(noteTitle);
		noteDO.setCn_note_body(noteBody);
		noteDO.setCn_note_last_modify_time(System.currentTimeMillis());
		
		//TODO 添加事务处理
		noteDAO.updateById(noteDO);
		
		if(isShared) {
			SharedNoteDO share = new SharedNoteDO();
			share.setCn_share_title(noteTitle);
			share.setCn_share_body(noteBody);
			share.setCn_note_id(noteId);
			
			shareDAO.updateByNoteId(share);
		}
		
		result.setStatus("0");
		return result;
	}

	public NoteResultVO moveNoteToTrash(String noteId) {
		NoteResultVO result = new NoteResultVO();
		
		NoteDO noteDO = new NoteDO();
		noteDO.setCn_note_id(noteId);
		noteDO.setCn_note_status_id(NoteStatus.TRASHED_NOTE);
		noteDO.setCn_note_last_modify_time(System.currentTimeMillis());
		
		//TODO 添加事务控制
		noteDAO.updateById(noteDO);
		shareDAO.deleteByNoteId(noteId);
		
		result.setStatus("0");
		return result;
	}

	public NoteResultVO loadTrashedNotesByUserId(String userId) {
		NoteResultVO result = new NoteResultVO();
		
		List<NoteDO> list = noteDAO.findTrashedNotesByUserId(userId);
		
		result.setStatus("0");
		result.setData(list);
		return result;
	}

	public NoteResultVO deleteNoteById(String noteId) {
		NoteResultVO result = new NoteResultVO();
		
		noteDAO.deleteNoteById(noteId);
		
		result.setStatus("0");
		return result;
	}

	public NoteResultVO recoverNote(String noteId) {
		NoteResultVO result = new NoteResultVO();
		
		NoteDO noteDO = new NoteDO();
		noteDO.setCn_note_id(noteId);
		noteDO.setCn_note_status_id(NoteStatus.NORMAL_NOTE);
		noteDO.setCn_note_last_modify_time(System.currentTimeMillis());
		noteDAO.updateById(noteDO);
		
		result.setStatus("0");
		return result;
	}

	public NoteResultVO shareNote(String noteId) {
		NoteResultVO result = new NoteResultVO();
		
		NoteDO noteDO = noteDAO.findByNoteId(noteId);
		
		if(noteDO == null) {
			result.setStatus("1");
			result.setMsg("未找到相应笔记！");
			return result;
		}
		
		SharedNoteDO share = new SharedNoteDO();
		
		share.setCn_share_id(Util.generateId());
		share.setCn_share_title(noteDO.getCn_note_title());
		share.setCn_share_body(noteDO.getCn_note_body());
		share.setCn_note_id(noteDO.getCn_note_id());
		
		noteDO.setCn_note_status_id(NoteStatus.SHARED_NOTE);

		//TODO 添加事务处理
		shareDAO.save(share);
		noteDAO.updateById(noteDO);
		
		result.setStatus("0");
		result.setData(share.getCn_share_id());
		return result;
	}

	public NoteResultVO cancelShareNote(String noteId) {
		NoteResultVO result = new NoteResultVO();
		
		NoteDO noteDO = new NoteDO();
		noteDO.setCn_note_id(noteId);
		noteDO.setCn_note_status_id(NoteStatus.NORMAL_NOTE);
		
		//TODO 添加事务处理
		shareDAO.deleteByNoteId(noteId);
		noteDAO.updateById(noteDO);
		
		result.setStatus("0");
		return result;
	}

	public NoteResultVO searchNote(String key) {
		NoteResultVO result = new NoteResultVO();
		
		List<SharedNoteDO> list = shareDAO.findNotesLike("%" + key + "%");
		
		result.setStatus("0");
		result.setData(list);
		return result;
	}

}
