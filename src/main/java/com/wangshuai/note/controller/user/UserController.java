/*
 * Copyright (c) 2001-2017 GuaHao.com Corporation Limited. All rights reserved. 
 * This software is the confidential and proprietary information of GuaHao Company. 
 * ("Confidential Information"). 
 * You shall not disclose such Confidential Information and shall use it only 
 * in accordance with the terms of the license agreement you entered into with GuaHao.com.
 */
package com.wangshuai.note.controller.user;

import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.dataobject.UserDO;
import com.wangshuai.note.manager.UserManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * TODO
 *
 * @author wangshuai
 * @version V1.0
 * @since 2017-08-27 13:33
 */
@Controller
@RequestMapping("user")
public class UserController {

    @Resource
    private UserManager userManager;

    @RequestMapping("validpwd.json")
    @ResponseBody
    public NoteResultVO validPwd(@RequestBody UserDO userDO) {

        return userManager.checkPassword(userDO.getCn_user_id(), userDO.getCn_user_password());
    }

    @RequestMapping("changepwd.json")
    @ResponseBody
    public NoteResultVO changePwd(String newpwd, String userId) {

        return userManager.changePwd(newpwd, userId);
    }

    @RequestMapping("login.json")
    @ResponseBody
    public NoteResultVO excecute(@RequestHeader("Authorization") String base64msg) {
        NoteResultVO result = userManager.checkLogin(base64msg);
        return result;
    }

    @RequestMapping("regist.json")
    @ResponseBody
    public NoteResultVO save(@RequestBody UserDO userDO) {

        return userManager.save(userDO);

    }

}
