# @desandro only

gulp:
	gulp

deploy:
	netlify deploy --dir=build

prod: gulp deploy
