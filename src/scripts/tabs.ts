// Tabs without a framework. Markup:
//   <div data-tabs>
//     <button data-tab="a" aria-selected="true">…</button>
//     <div data-panel="a" data-active>…</div>
//   </div>
// Groups can nest (a panel may itself be a [data-tabs] group); a button only switches
// panels whose nearest enclosing group is its own.
document.addEventListener('click', (e) => {
	const tab = (e.target as Element).closest<HTMLElement>('[data-tab]');
	const group = tab?.closest<HTMLElement>('[data-tabs]');
	if (!tab || !group) return;
	const own = (el: Element) => el.parentElement?.closest('[data-tabs]') === group;
	group.querySelectorAll('[data-tab]').forEach((t) => own(t) && t.setAttribute('aria-selected', String(t === tab)));
	group.querySelectorAll<HTMLElement>('[data-panel]').forEach((p) => {
		if (own(p)) p.toggleAttribute('data-active', p.dataset.panel === tab.dataset.tab);
	});
});
