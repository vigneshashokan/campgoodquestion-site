// Accordions from <details name="group"> (Join Us dues, and the FAQ on phones): items open and close
// smoothly, one per group at a time. Safari can't animate <details> height in CSS yet.
// We take over the one-open-at-a-time job from the name attribute, which would snap the other item shut.
// While an item animates shut it's still [open], so it carries data-state="" for CSS to style it as closed.
// In a [data-always-open] list the open item can't be closed, only swapped for another.
// Without JS (or with reduced motion) the plain <details> behavior still works, just instantly.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
	const items = [...document.querySelectorAll<HTMLDetailsElement>('details[name]')];
	const setOpen = (d: HTMLDetailsElement, open: boolean) => {
		const from = d.offsetHeight; // mid-animation height if it's already moving
		d.dataset.state = open ? 'open' : '';
		d.getAnimations().forEach((a) => a.cancel());
		d.open = true;
		const to = open ? d.offsetHeight : d.querySelector('summary')!.offsetHeight + d.offsetHeight - d.clientHeight; // + borders
		d.animate(
			{ height: [`${from}px`, `${to}px`], overflow: ['hidden', 'hidden'] },
			{ duration: 300, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
		).onfinish = () => {
			d.open = open;
			// The item closing above can pull this one up under the header; bring it back into view.
			if (open) d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		};
	};
	items.forEach((d) => {
		const group = (d.dataset.group = d.name);
		d.removeAttribute('name');
		if (d.open) d.dataset.state = 'open';
		d.querySelector('summary')!.addEventListener('click', (e) => {
			e.preventDefault();
			const opening = d.dataset.state !== 'open';
			if (!opening && d.closest('[data-always-open]')) return;
			if (opening) items.forEach((o) => o !== d && o.dataset.state === 'open' && o.dataset.group === group && setOpen(o, false));
			setOpen(d, opening);
		});
	});
}
