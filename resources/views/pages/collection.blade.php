@extends('page')
@section('page')
	<article id="currentCollection" class="page collection collection-{{ $collection->name }}" data-collectionname="{{ $collection->name }}" data-collectionid="{{ $collection->id }}">
		<section class="collection-atoms">
			@foreach($collection->atoms as $atom)
				{!! $atom !!}
			@endforeach
			<a href="#" id="addAtom">Add atom here</a>
		</section>
	</article>
@stop