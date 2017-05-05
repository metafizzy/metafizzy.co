# @desandro only

gulp:
	gulp

deploy:
	s3cmd -c ~/.s3cfg-fizzy sync --cf-invalidate build/. s3://metafizzy.co/

prod: gulp deploy
