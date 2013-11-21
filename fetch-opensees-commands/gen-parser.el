
(with-current-buffer
  (find-file-noselect "opensees-commands-edit.txt")
  (let (line result)
    (beginning-of-buffer)
    (while (= 0 (forward-line))
      (setq line (buffer-substring-no-properties (line-beginning-position) (line-end-position)))
      (push line result))
    result))
