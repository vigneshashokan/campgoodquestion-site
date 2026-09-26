import assert from 'node:assert/strict';
import { test } from 'node:test';
import { address } from './brc.ts';

// Coordinates hand-placed in the original design.
test('camp addresses land where the design put them', () => {
	assert.deepEqual(address('7:45', 'F'), { x: 73.1, y: 297.4 });
	assert.deepEqual(address('4:30', 'D'), { x: 291.9, y: 291.9 });
	assert.deepEqual(address('4:15', 'E'), { x: 315, y: 288.3 });
	assert.deepEqual(address('10:00', 'L'), { x: 22.5, y: 97.5 });
});
