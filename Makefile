CF_PROJECT ?= icecastleblog

.PHONY: install dev build start lint clean extension blog-static deploy-blog

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
	cp app/icon.svg static_blog/icon.svg
	# Cloudflare Pages redirect: /blog/* -> /* (client hits /blog/slug, serves /slug)
	echo "/blog/* /:splat 301" > static_blog/_redirects
	# Keep assets and blog links local (/blog/x -> /x); point every other
	# root-relative link at the main site.
	find static_blog -name "*.html" -type f -exec sed -i '' \
		-e 's|="/_next/|="@LOCAL@_next/|g' \
		-e 's|="/icon.svg|="@LOCAL@icon.svg|g' \
		-e 's|="/blog/|="@LOCAL@|g' \
		-e 's|="/blog"|="@LOCAL@"|g' \
		-e 's|="/|="https://www.icecastle.si/|g' \
		-e 's|@LOCAL@|/|g' \
		{} \;

# Cloudflare Pages deploys a directory, not an archive, so no zip step here;
# requires `wrangler login` once, or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID set.
# Override project with: make deploy-blog CF_PROJECT=my-project
deploy-blog: blog-static
	npx wrangler pages deploy static_blog --project-name=$(CF_PROJECT)
