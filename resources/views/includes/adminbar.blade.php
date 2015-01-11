<section class="admin-bar" id="adminBar">
	<article class="admin-buttons on-standby">
		<ul>
			<li class="editbtn-atom">
				<a href="{{ route('admin.save.atom') }}" class="admin-btn" data-action="new.atom">New Atom</a>
			</li>
		</ul>
	</article>
	<article class="edit-mode atom hidden" id="atomEditControls">
		<ul>
			<li class="id-field">
				Atom id:&nbsp;
				<span class="pseudo-input" data-fieldname="id" data-default=""></span>
			</li>
			<li class="name-field">
				<label>Atom name:&nbsp;
					<input type="text" id="atomName" data-fieldname="name" data-default="" value="">
				</label>
			</li>
			<li class="description-field">
				<label>Atom description:&nbsp;
					<input type="text" id="atomDescription" data-fieldname="description" data-default=""value="">
				</label>
			</li>
		</ul>
	</article>
	<article class="edit-mode collection hidden" id="collectionEditControls">
		<ul>
			<li class="name-field">
				<label>Collection name:&nbsp;
					<input type="text" id="collectionName" value="">
				</label>
			</li>
			<li class="tags-field">
				<label>Collections tags:&nbsp;
					<input type="text" id="collectionTags" value="">
				</label>
			</li>
			<li class="attrs-field">
				<label>Collection attributes:&nbsp;
					<input type="text" id="collectionAttrs" value="">
				</label>
			</li>
		</ul>
	</article>
	<article class="actions on-edit hidden">
		<ul>
			<li>
				<button type="button" class="button blue" id="saveCurrent">Save</button>
			</li>
			<li>
				<button type="button" class="button red" id="cancel">Cancel</button>
			</li>
		</ul>
	</article>
</section>