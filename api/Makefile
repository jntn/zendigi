all: build

test:
	go test ./cmd/server/
build:
	@CGO_ENABLED=0 go build -ldflags "-s -w" ./cmd/server/server.go
run:
	@cd cmd/server && go run server.go
generate:
	go generate ./...
generate-debug:
	go-bindata -debug ./...


.PHONY: test build run