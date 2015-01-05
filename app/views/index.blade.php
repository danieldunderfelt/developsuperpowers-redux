<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Develop Superpowers</title>

	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700,900,400italic,700italic,900italic|Old+Standard+TT:400,400italic' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" type="text/css" href="/css/style.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery.min.js">\x3C/script>')</script>

	<script>
		// Picture element HTML5 shiv
		document.createElement( "picture" );
	</script>
	<script src="/js/vendor/picturefill.min.js" async></script>
	<script src="/js/vendor/traceur-runtime.js"></script>
	<script src="/js/index.js"></script>
</head>
<body>

	<div class="container">
		@include('includes.sidebar')
		@yield('content')
	</div>

</body>
</html>