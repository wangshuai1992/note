package com.wangshuai.note.utils;


import org.apache.tomcat.util.codec.binary.Base64;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class Util {
	
	public static String generateId() {
		String id = UUID.randomUUID().toString();
		return id;
	}

	public static String generateToken() {
		String token = UUID.randomUUID().toString();
		token.replaceAll("-", "");
		return token;
	}
	
	/**
	 * MD5摘要算法
	 * @param msg
	 * @return
	 */
	public static String md5(String msg) {
		MessageDigest md = null;
		String resultMsg = null;
		try {
			md = MessageDigest.getInstance("MD5");
			byte[] input = msg.getBytes();
			byte[] output = md.digest(input);
			
			//Base64算法将等长字节数组转成字符串
			resultMsg = Base64.encodeBase64String(output);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return resultMsg;
	}
	
	public static String base64Decode(String msg) {
		byte[] output = Base64.decodeBase64(msg);
		String str = null;
		try {
			str =  new String(output, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return str;
	}
	
}
