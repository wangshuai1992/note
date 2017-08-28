package com.wangshuai.note.manager.impl;

import com.alibaba.fastjson.JSON;
import com.wangshuai.note.dao.NoteBookMapperDAO;
import com.wangshuai.note.dao.NoteMapperDAO;
import com.wangshuai.note.dataobject.NoteBookDO;
import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.manager.NoteBookManager;
import com.wangshuai.note.utils.Util;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NoteBookManagerImpl implements NoteBookManager {

	@Resource
	private NoteBookMapperDAO noteBookDAO;
	@Resource
	private NoteMapperDAO noteDAO;

	public NoteResultVO loadListByUserId(String userId) {
		NoteResultVO result = new NoteResultVO();

		if (userId == null || "".equals(userId)) {
			result.setStatus("1");
			result.setMsg("没有用户ID");
			return result;
		}

		List<NoteBookDO> list = noteBookDAO.findByUserId(userId);
		result.setStatus("0");
		result.setData(JSON.toJSONString(list));

		return result;
	}

	public NoteResultVO save(NoteBookDO book) {
		NoteResultVO result = new NoteResultVO();

		noteBookDAO.save(book);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("bookId", book.getCn_notebook_id());
		result.setStatus("0");
		result.setMsg("");
		result.setData(data);
		return result;
	}

	public NoteResultVO save(String cn_notebook_name, String cn_user_id) {
		NoteBookDO book = new NoteBookDO();
		
		//检查笔记本名是否重复
		
		book.setCn_notebook_id(Util.generateId());
		book.setCn_notebook_name(cn_notebook_name);
		book.setCn_user_id(cn_user_id);
		book.setCn_notebook_createtime(new Timestamp(System.currentTimeMillis()));
		
		return save(book);
	}

	public NoteResultVO deleteById(String bookId) {
		NoteResultVO result = new NoteResultVO();
		
		noteDAO.deleteByBookId(bookId);
		noteBookDAO.deleteById(bookId);
		
		result.setStatus("0");
		
		return result;
	}

}
