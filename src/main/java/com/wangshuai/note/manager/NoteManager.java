package com.wangshuai.note.manager;

import com.wangshuai.note.vo.NoteResultVO;
import org.springframework.stereotype.Service;

@Service
public interface NoteManager {
	NoteResultVO loadListByBookId(String bookId);

	NoteResultVO addNote(String bookId, String noteName, String userId);

	NoteResultVO loadNote(String noteId);

	NoteResultVO updateNote(String noteId, String noteTitle, String noteBody);

	NoteResultVO moveNoteToTrash(String noteId);

	NoteResultVO loadTrashedNotesByUserId(String userId);

	NoteResultVO deleteNoteById(String noteId);

	NoteResultVO recoverNote(String noteId);

	NoteResultVO shareNote(String noteId);

	NoteResultVO cancelShareNote(String noteId);

	NoteResultVO searchNote(String key);
}
