build:
	GOOS=linux GOARCH=amd64 go build -o t1cg-forum ./main.go

spec:
	swagger generate spec -m -o swagger.json 

docs:
	swagger generate spec -m -o swagger.json 
	swagger serve ./swagger.json 

start:
	go run ./main.go
