<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Develop Superpowers</title>

	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700,900,400italic,700italic,900italic|Old+Standard+TT:400,400italic' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="/css/style.css">

	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="jspm_packages/npm/vendor/jquery.min.js">\x3C/script>')</script>

	<script>
		// Picture element HTML5 shiv
		document.createElement( "picture" );
	</script>

	<script src="jspm_packages/system.js"></script>
	<script src="config.js"></script>
	<script>
		System.import('./js/index').catch(console.error.bind(console));
	</script>
</head>
<body>

	<div class="container">
		@include('includes.sidebar')
		@yield('content')
	</div>

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-50845459-1', 'auto');
	  ga('require', 'displayfeatures');
	  ga('send', 'pageview');

	</script>
</body>
</html>