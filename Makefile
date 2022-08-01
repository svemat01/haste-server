build:
	sudo docker build -t svemat/haste-server .

push:
	sudo docker push svemat/haste-server:latest

all: build push