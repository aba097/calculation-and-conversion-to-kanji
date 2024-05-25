package main

import (
	"net/http"
	"text/template"
)

func mainHandler(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("index.html")
	if err != nil {
		panic(err.Error())
	}
	if err := t.Execute(w, nil); err != nil {
		panic(err.Error())
	}
}

func main() {
	// 静的ファイルのハンドリング
	// /static/で始まるリクエストに対して、
	// http.StripPrefix("/static/",)で/static/を削除し、ファイル名のみを取り出し、
	// http.FileServer(http.Dir("static"))でローカルのstaticフォルダ内のファイルを提供する
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(":8000", nil)
}