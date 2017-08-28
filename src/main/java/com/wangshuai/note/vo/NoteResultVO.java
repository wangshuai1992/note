package com.wangshuai.note.vo;

import java.io.Serializable;

public class NoteResultVO implements Serializable {

	private static final long serialVersionUID = 9208417228023885494L;

	private String status;
	private String msg;
	private Object data;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
