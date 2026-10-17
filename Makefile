.PHONY: install dev build start lint clean extension blog-static

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm start

lint:
	npm run lint

clean:
	rm -rf .next

extension:
	cd seo-roi-extension && zip -r ../seo-roi-extension.zip . -x ".*"

# Pulls the already-prerendered blog HTML + its JS/CSS chunks out of .next
# into a standalone folder servable by any static host (e.g. icecastleblog.com).
# Nav/Footer links to non-blog pages (/, /faq, /gpus/...) will 404 there since
# only blog routes are copied.
blog-static: build
	rm -rf static_blog
	mkdir -p static_blog
	cp .next/server/app/blog.html static_blog/index.html
	for f in .next/server/app/blog/*.html; do \
		slug=$$(basename $$f .html); \
		mkdir -p static_blog/$$slug; \
		cp $$f static_blog/$$slug/index.html; \
	done
	mkdir -p static_blog/_next
	cp -r .next/static static_blog/_next/static
