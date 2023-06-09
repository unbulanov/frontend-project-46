install:
	npm ci
link:
	npm link
lint:
	npx eslint .
publish:
	npm publish --dry-run
test:
	npx jest
fix:
	npx eslint . --fix
test-coverage:
	npm test -- --coverage --coverageProvider=v8