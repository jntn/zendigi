package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"github.com/ory/dockertest"
	"gopkg.in/testfixtures.v2"
)

var fixtures *testfixtures.Context

type data struct {
	OperationName string `json:"operationname,omitempty"`
	Query         string `json:"query"`
	Variables     string `json:"variables,omitempty"`
}

var testCases = []struct {
	name     string
	query    string
	response string
}{
	{"GetUser", "{getUser(id: 1) { name }}", `{"data":{"getUser":{"name":"Jonatan"}}}`},
	{"GetUser", "{getUser(id: 2) { name }}", `{"data":{"getUser":{"name":"Sanaz"}}}`},
}

func TestServer(t *testing.T) {
	prepareTestDatabase()

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			dataJSON, err := json.Marshal(data{Query: tc.query})
			req, err := http.NewRequest("POST", "/query", bytes.NewBuffer(dataJSON))
			if err != nil {
				t.Fatal(err)
			}

			rr := httptest.NewRecorder()
			handler := router()

			handler.ServeHTTP(rr, req)

			if status := rr.Code; status != http.StatusOK {
				t.Errorf("handler returned wrong status code: got %v want %v",
					status, http.StatusOK)
			}

			expected := tc.response
			if rr.Body.String() != expected {
				t.Errorf("handler returned unexpected body: got %v want %v",
					rr.Body.String(), expected)
			}
		})
	}
}

func TestMain(m *testing.M) {
	isTesting = true
	var err error
	database := "test"
	password := "p79cWkQkRy38h3P8"
	pool, err := dockertest.NewPool("")

	if err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}

	resource, err := pool.Run("postgres", "9.4", []string{"POSTGRES_PASSWORD=" + password, "POSTGRES_DB=" + database})
	if err != nil {
		log.Fatalf("Could not start resource: %s", err)
	}

	if err = pool.Retry(func() error {
		var err error
		db, err = sql.Open("postgres", fmt.Sprintf("postgres://postgres:"+password+"@localhost:%s/%s?sslmode=disable", resource.GetPort("5432/tcp"), database))
		if err != nil {
			return err
		}

		return db.Ping()
	}); err != nil {
		log.Fatalf("Could not connect to docker: %s", err)
	}

	fixtures, err = testfixtures.NewFiles(db, &testfixtures.PostgreSQL{UseAlterConstraint: true},
		"fixtures/account.yml",
	)

	if err != nil {
		log.Fatal(err)
	}

	exitCode := m.Run()

	// When you're done, kill and remove the container
	err = pool.Purge(resource)

	// Exit
	os.Exit(exitCode)
}

func prepareTestDatabase() {
	driver, err := postgres.WithInstance(db, &postgres.Config{})

	if err != nil {
		log.Fatal(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"postgres", driver)

	if err != nil {
		log.Fatal(err)
	}

	m.Up()

	if err := fixtures.Load(); err != nil {
		log.Fatal(err)
	}
}
