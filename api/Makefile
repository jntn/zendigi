all: build

test:
	@go test
build:
	@CGO_ENABLED=0 go build -ldflags "-s -w" ./cmd/server/server.
build-vendor:
	@CGO_ENABLED=0 go build -mod=vendor -ldflags "-s -w" ./cmd/server/server. 
run:
	@cd cmd/server && go run server.go
generate:
	go generate ./...
generate-debug:
	go-bindata -debug ./...

.PHONY: test build run