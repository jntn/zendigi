FROM golang:latest as base
WORKDIR /usr/src
COPY . .
RUN go get -d -v && CGO_ENABLED=0 go build -ldflags "-s -w" -o /usr/src/main

FROM scratch
COPY --from=base /usr/src/main /app
COPY --from=base /usr/src/graphql/schema.graphql /graphql/schema.graphql
COPY --from=base /usr/src/.env /.env
EXPOSE 8080
CMD ["/app"]