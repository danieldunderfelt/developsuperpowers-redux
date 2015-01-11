@extends('page')
@section('page')
	<article class="page content-page collection-{{ $collection->name }}" data-collectionname="{{ $collection->name }}" data-collectionid="{{ $collection->id }}">
		<section class="collection-atoms">
			@foreach($collection->atoms as $atom)
				{!! $atom !!}
			@endforeach
		</section>
	</article>

@stop