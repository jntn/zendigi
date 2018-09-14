package main // import "github.com/jntn/zendigi/api"

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	graphqlgo "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	graphql "github.com/jntn/zendigi/api/graphql"
	"github.com/jntn/zendigi/api/postgres"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Starting zendigi api")

	err := godotenv.Load()
	if err != nil {
		log.Println(" - Not using .env file")
	}

	conn := os.Getenv("DB_CONN")

	fmt.Println(" - DB: connecting with: " + conn)

	s, err := getSchema("../../graphql/schema.graphql")
	if err != nil {
		log.Fatal(err)
	}

	db, err := postgres.Open(conn)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	us := &postgres.UserService{DB: db}
	ps := &postgres.ProjectService{DB: db}

	schema := graphqlgo.MustParseSchema(s, &graphql.Resolver{UserService: us, ProjectService: ps})

	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write(page)
	}))

	http.Handle("/query", &relay.Handler{Schema: schema})

	log.Fatal(http.ListenAndServe(":7000", nil))
}

var page = []byte(`
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/graphiql/0.10.2/graphiql.css" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/1.1.0/fetch.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/graphiql/0.10.2/graphiql.js"></script>
	</head>
	<body style="width: 100%; height: 100%; margin: 0; overflow: hidden;">
		<div id="graphiql" style="height: 100vh;">Loading...</div>
		<script>
			function goFetcher(goParams) {
				return fetch("/query", {
					method: "post",
					body: JSON.stringify(goParams),
					credentials: "include",
				}).then(function (response) {
					return response.text();
				}).then(function (responseBody) {
					try {
						return JSON.parse(responseBody);
					} catch (error) {
						return responseBody;
					}
				});
			}
			ReactDOM.render(
				React.createElement(GraphiQL, {fetcher: goFetcher}),
				document.getElementById("graphiql")
			);
		</script>
	</body>
</html>
`)

func getSchema(path string) (string, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return "", err
	}

	return string(b), nil
}
