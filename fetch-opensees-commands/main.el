(setq lexical-binding t)

(defun grab-opensees-command-urls (root start pattern file)
  (url-retrieve
   (concat root start)
   (lambda (x)
     (beginning-of-buffer)
     (let (list)
       (while (re-search-forward pattern nil t)
         (push (match-string-no-properties 1) list))
       (with-current-buffer (find-file-noselect file)
         (end-of-buffer)
         (insert "\n")
         (insert
          (mapconcat
           'identity
           list
           "\n"))
         (switch-to-buffer (current-buffer)))))))

(grab-opensees-command-urls
 "http://opensees.berkeley.edu"
 "/wiki/index.php"
 "<a href=\"\\(/wiki/index.php[^:?\"]*\\)\""
 "opensees-pages.txt")

(mapc
 (lambda (x)
   (grab-opensees-command-urls
    "http://opensees.berkeley.edu"
    x
    "<a href=\"\\(/wiki/index.php[^:?\"]*\\)\""
    "opensees-pages.txt"))
 (with-current-buffer (find-file-noselect "opensees-pages.txt")
   (delete "" (split-string (buffer-string)))))

(defun grab-opensees-command-in-this-page (url)
  (url-retrieve
   url
   (lambda (x)
     (beginning-of-buffer)
     (when (re-search-forward "<td style=\"background:\\(yellow\\|lime\\); color:black; width:800px\">" nil t)
       (let
         ((str (url-unhex-string (buffer-substring-no-properties
                 (re-search-forward "<b>" nil t)
                 (- (re-search-forward "</b>" nil t) 4)))))
         (with-current-buffer (find-file-noselect "opensees-commands.txt")
           (insert str)
           (insert "\n")))))))

(mapc 'grab-opensees-command-in-this-page
      (with-current-buffer (find-file-noselect "opensees-pages.txt")
        (mapcar
         (lambda (x) (concat "http://opensees.berkeley.edu" x))
         (delete "" (split-string (buffer-string) "\n")))))

;; (grab-opensees-command-in-this-page "http://opensees.berkeley.edu/wiki/index.php/ZeroLength_Element")
