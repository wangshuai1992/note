package com.wangshuai.note.manager;

import com.wangshuai.note.dataobject.NoteBookDO;
import com.wangshuai.note.vo.NoteResultVO;
import org.springframework.stereotype.Service;

@Service
public interface NoteBookManager {
	NoteResultVO loadListByUserId(String userId);

	NoteResultVO save(NoteBookDO book);

	NoteResultVO save(String cn_notebook_name, String cn_user_id);

	NoteResultVO deleteById(String bookId);
}
