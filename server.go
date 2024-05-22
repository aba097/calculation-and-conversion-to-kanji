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
	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(":8000", nil)
}