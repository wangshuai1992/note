package com.wangshuai.note.controller.note;

import com.wangshuai.note.vo.NoteResultVO;
import com.wangshuai.note.manager.NoteManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * TODO
 *
 * @author wangshuai
 * @version V1.0
 * @since 2017-08-27 13:24
 */
@Controller
@RequestMapping("note")
public class NoteController {
    @Resource
    private NoteManager noteManager;

    @RequestMapping("addnote.json")
    @ResponseBody
    public NoteResultVO addNote(String bookId, String noteName, String userId) {
        return noteManager.addNote(bookId, noteName, userId);
    }

    @RequestMapping("cancelsharenote.json")
    @ResponseBody
    public NoteResultVO cancelShareNote(String noteId) {
        return noteManager.cancelShareNote(noteId);
    }

    @RequestMapping("deletenote.json")
    @ResponseBody
    public NoteResultVO deleteNote(String noteId) {
        return noteManager.deleteNoteById(noteId);
    }

    @RequestMapping("loadnote.json")
    @ResponseBody
    public NoteResultVO loadNote(String noteId) {
        return noteManager.loadNote(noteId);
    }

    @RequestMapping("shownotes.json")
    @ResponseBody
    public NoteResultVO showNotes(String bookId) {
        return noteManager.loadListByBookId(bookId);
    }

    @RequestMapping("loadtrashednotes.json")
    @ResponseBody
    public NoteResultVO load(String userId) {
        return noteManager.loadTrashedNotesByUserId(userId);
    }

    @RequestMapping("movetotrash.json")
    @ResponseBody
    public NoteResultVO moveNoteToTrash(String noteId) {
        return noteManager.moveNoteToTrash(noteId);
    }

    @RequestMapping("recovernote.json")
    @ResponseBody
    public NoteResultVO recoverNote(String noteId) {
        return noteManager.recoverNote(noteId);
    }

    @RequestMapping("searchnote.json")
    @ResponseBody
    public NoteResultVO searchNote(String key) {
        return noteManager.searchNote(key);
    }

    @RequestMapping("sharenote.json")
    @ResponseBody
    public NoteResultVO shareNote(String noteId) {
        return noteManager.shareNote(noteId);
    }

    @RequestMapping("updatenote.json")
    @ResponseBody
    public NoteResultVO updateNote(String noteId, String noteTitle, String noteBody) {
        return noteManager.updateNote(noteId, noteTitle, noteBody);
    }

}
