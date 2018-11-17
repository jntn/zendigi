package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	if !isTesting {
		openDatabase()
	}
	defer db.Close()
	fmt.Println("\n🚀 Zendigi API")
	fmt.Println("--------------")
	fmt.Printf("  * Starting server on %v\n\n", port)

	log.Fatal(http.ListenAndServe(port, router()))

	log.Println("Shut down.")
}
