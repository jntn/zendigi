FROM golang:latest as build
WORKDIR /jntn/src
RUN export PATH=$PATH:$GOPATH/bin
RUN go get -u github.com/go-bindata/go-bindata/...
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN make generate && make build

FROM scratch
ARG DB_CONN=unset
ENV DB_CONN=$DB_CONN
WORKDIR /app
COPY --from=build /jntn/src/server /app/
ENTRYPOINT ["./server"]
EXPOSE 3001