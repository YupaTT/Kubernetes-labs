FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY *.go ./
RUN go test ./... && CGO_ENABLED=0 go build -ldflags="-s -w" -o /config-demo .

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /config-demo /config-demo
EXPOSE 8080
ENTRYPOINT ["/config-demo"]
