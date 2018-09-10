FROM golang:latest as base
WORKDIR /usr/src
COPY . .
WORKDIR /usr/src/cmd/server
RUN go get -d -v && CGO_ENABLED=0 go build -ldflags "-s -w" -o /usr/src/server

FROM scratch
ARG DB_CONN=unset
ENV DB_CONN=$DB_CONN
COPY --from=base /usr/src/server /cmd/api/server
COPY --from=base /usr/src/graphql/schema.graphql /graphql/schema.graphql
EXPOSE 8080
CMD ["/cmd/api/server"]