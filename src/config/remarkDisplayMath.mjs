function delimiterLength(node) {
	if (!node.position || typeof node.value !== 'string') return 0;
	return node.position.end.offset - node.position.start.offset - node.value.length;
}

function isStandaloneDisplayMath(child, previous, next) {
	if (child.type !== 'inlineMath' || delimiterLength(child) < 4) return false;

	const previousText = previous?.type === 'text' ? previous.value : '';
	const nextText = next?.type === 'text' ? next.value : '';
	const startsLine = !previous || previousText.endsWith('\n');
	const endsLine = !next || nextText.startsWith('\n');

	return startsLine && endsLine;
}

function flushParagraph(nodes, output) {
	const children = nodes.filter((child) => child.type !== 'text' || child.value.length > 0);
	if (children.length === 0) return;

	output.push({
		type: 'paragraph',
		children,
	});
}

function transformParagraph(node) {
	if (node.type !== 'paragraph' || !Array.isArray(node.children)) return [node];

	const output = [];
	let paragraphChildren = [];
	let changed = false;

	node.children.forEach((child, index) => {
		const previous = node.children[index - 1];
		const next = node.children[index + 1];

		if (!isStandaloneDisplayMath(child, previous, next)) {
			paragraphChildren.push(child);
			return;
		}

		changed = true;
		const previousParagraphChild = paragraphChildren.at(-1);
		if (previousParagraphChild?.type === 'text') {
			previousParagraphChild.value = previousParagraphChild.value.replace(/\n$/, '');
		}

		flushParagraph(paragraphChildren, output);
		paragraphChildren = [];

		output.push({
			type: 'math',
			value: child.value,
			data: {
				hName: 'pre',
				hChildren: [
					{
						type: 'element',
						tagName: 'code',
						properties: { className: ['language-math', 'math-display'] },
						children: [{ type: 'text', value: child.value }],
					},
				],
			},
		});

		if (next?.type === 'text') {
			next.value = next.value.replace(/^\n/, '');
		}
	});

	if (!changed) return [node];

	flushParagraph(paragraphChildren, output);
	return output;
}

function visit(node) {
	if (!node || typeof node !== 'object' || !Array.isArray(node.children)) return;

	node.children = node.children.flatMap((child) => {
		visit(child);
		return transformParagraph(child);
	});
}

export default function remarkDisplayMath() {
	return (tree) => {
		visit(tree);
	};
}
