/*
 * Copyright (c) 2001-2017 GuaHao.com Corporation Limited. All rights reserved. 
 * This software is the confidential and proprietary information of GuaHao Company. 
 * ("Confidential Information"). 
 * You shall not disclose such Confidential Information and shall use it only 
 * in accordance with the terms of the license agreement you entered into with GuaHao.com.
 */
package com.wangshuai.note.controller.notebook;

import com.wangshuai.note.dataobject.NoteBookDO;
import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.dataobject.UserDO;
import com.wangshuai.note.manager.NoteBookManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * TODO
 *
 * @author wangshuai
 * @version V1.0
 * @since 2017-08-27 13:28
 */
@Controller
@RequestMapping("notebook")
public class NoteBookController {
    @Resource
    private NoteBookManager noteBookManager;

    @RequestMapping("addbook.json")
    @ResponseBody
    public NoteResultVO execute(@RequestBody NoteBookDO book) {
        NoteResultVO result = noteBookManager.save(book.getCn_notebook_name(), book.getCn_user_id());
        return result;
    }

    @RequestMapping("delete.json")
    @ResponseBody
    public NoteResultVO execute(String bookId) {
        NoteResultVO result = noteBookManager.deleteById(bookId);
        return result;
    }

    @RequestMapping("loadlist.json")
    @ResponseBody
    public NoteResultVO execute(@RequestBody UserDO userDO) {
        NoteResultVO result = noteBookManager.loadListByUserId(userDO.getCn_user_id());
        return result;
    }

}
