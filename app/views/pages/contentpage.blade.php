@extends('page')
@section('page')
	<article class="page content-page contentname-{{ $page->name }}" data-pagename="{{ $page->name }}" data-pageid="{{ $page->id }}">
		<header class="page-header">
			<h1 class="page-title">
				{{ $page->title }}
			</h1>
		</header>
		<section class="page-atoms">
			@foreach($page->atoms as $atom)
				{{ $atom }}
			@endforeach
		</section>
	</article>

@stop