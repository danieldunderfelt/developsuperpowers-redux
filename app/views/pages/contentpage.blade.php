@extends('page')
@section('page')

	@foreach($page->atoms as $atom)
		{{ $atom->content }}
	@endforeach

@stop