package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/graph-gophers/graphql-go/relay"
)

type data struct {
	OperationName string `json:"operationname,omitempty"`
	Query         string `json:"query"`
	Variables     string `json:"variables,omitempty"`
}

func TestServer(t *testing.T) {
	dataJSON, err := json.Marshal(data{Query: "{getUser(id: 4) {id projects {id title }}}"})
	req, err := http.NewRequest("POST", "/query", bytes.NewBuffer(dataJSON))
	if err != nil {
		t.Fatal(err)
	}

	schema := prepareShema()

	rr := httptest.NewRecorder()
	handler := &relay.Handler{Schema: schema}

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `{"data":{"getUser":{"id":"4","projects":[{"id":"1","title":"My life"}]}}}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
