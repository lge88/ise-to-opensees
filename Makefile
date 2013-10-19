
SRC = $(wildcard lib/*.js) $(wildcard lib/*.css) $(wildcard lib/*.html)

UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
	OPEN=gnome-open
endif
ifeq ($(UNAME), Darwin)
	OPEN=open
endif

build: components $(SRC) component.json
	@(node _ise_/build && touch components)

ise-to-opensees.js: components
	@component build --standalone ise-to-opensees --name ise-to-opensees --out .

components: component.json
	@(component install --dev && touch components)

clean:
	rm -fr build components template.js _ise_/build/backup

component.json: $(SRC)
	@node _ise_/build/auto-update-file-list.js

brower-test: build
	$(OPEN) test/index.html

test: build
	NODE_PATH=.. mocha test

demo: build
	$(OPEN) examples/index.html

.PHONY: clean ise-to-opensees.js test
