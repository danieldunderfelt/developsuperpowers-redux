@extends('page')
@section('page')
	<article class="page home-page">
		<header>
			{!! Atom::display(1) !!}
			{!! Atom::display(15) !!}
			<h1>
				Hello!
			</h1>
		</header>
		<section class="intro">
			<p>
				I'm Daniel, a full-stack web developer from Finland. I work with Javascript, PHP and Sass, and my application framework of choice is <a href="http://laravel.com">Laravel</a>.
			</p>
			<p>
				I have some code on <a href="https://github.com/danieldunderfelt">Github</a>, and I create more all the time. Why not check it out?
			</p>
		</section>
		<div class="divider"></div>
		<section class="projects">
			<h2>
				Cool projects in progress:
			</h2>
			<article class="project">
				<h3>
					<a href="https://github.com/danieldunderfelt/default.js">Skeleton.js</a>
				</h3>
				<p>
					Have you ever copied useful files between projects over and over again? I have. I'm talking about your snippet files, your nice little helpers or your Sass mixins. Wouldn't it be nice to throw one command into the terminal and have all of that setup for new projects just how you are used to have them in that previous project? That's where Skeleton.js comes in.
				</p>
			</article>
			<article class="project">
				<h3>
					<a href="https://github.com/danieldunderfelt/house">House</a>
				</h3>
				<p>
					House is a game played on a 10x10 grid where you claim "houses" by drawing a single line between two cells. If the line you drew closes the square, the house is yours and you get to draw again. This can be played with a minimum of two people. I thought "hey, I could probably make this into a silly browser game", so I started. The game uses websockets to enable multiplayer.
				</p>
			</article>
		</section>
		<div class="divider"></div>
	</article>
@stop