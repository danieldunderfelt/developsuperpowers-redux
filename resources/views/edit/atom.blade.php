<section class="atom-editor">
	<header>
		<h2>
			Create a new atom
		</h2>
	</header>
	<article class="editor-area">
		<div class="superpowers-atom edit" id="atomEdit" data-atomid="{{ isset($atom->id) ? $atom->id : "" }}" data-atomname="{{ isset($atom->name) ? $atom->name : "" }}" data-atomdescription="{{ isset($atom->description) ? $atom->description : "" }}" contenteditable>
			{{ isset($atom->content) ? $atom->content : "" }}
		</div>
	</article>
</section>