<script lang="ts">
	import { FighterListItem } from '$lib/classes/FighterListItem';
	import axios from 'axios';
	import { parse, HTMLElement } from 'node-html-parser';

	let roots: Array<HTMLElement> = [];
	let search = $state('');

	let fightersFound = $state<Array<FighterListItem>>([]);
	let fighters = $state<Array<FighterListItem>>([]);
	async function fetchData() {
		roots = [];
		for (let i = 0; i < search.split(' ').length; i++) {
			const searchTerm = search.split(' ')[i];
			const res = await fetch(`/api/fighters?search=${searchTerm}`);
			roots.push(parse(await res.text()));
		}

		getListData();
	}

	function getListData() {
		console.log();
		fightersFound = [];
		roots.forEach((root) => {
			let listData = root.getElementsByTagName('tbody')[0];
			listData?.children?.forEach((elem, index) => {
				if (index == 0) return;
				let fighter = new FighterListItem();

				fighter.firstName = elem.children[0].children[0].innerText;
				fighter.url = elem.children[0].children[0].attrs.href;
				fighter.lastName = elem.children[1].children[0].innerText;
				fighter.nickname = elem.children[2].children[0].innerText;
				fighter.height = elem.children[3].innerText;
				fighter.weight = elem.children[4].innerText;
				fighter.reach = elem.children[5].innerText;
				fighter.stance = elem.children[6].innerText;
				fighter.wins = Number.parseInt(elem.children[7].innerText.replaceAll(' ', ''));
				fighter.losses = Number.parseInt(elem.children[8].innerText.replaceAll(' ', ''));
				fighter.belt = elem.children[10].children.length != 0;

				fightersFound.push(fighter);
			});
		});
		findMatchingFighters();
	}

	function findMatchingFighters() {
		fighters = [];
		fightersFound.forEach((fighter) => {
			if (
				fightersFound.filter((x) => deepEqual(x, fighter)).length == search.split(' ').length &&
				fighters.find((x) => deepEqual(x, fighter)) == undefined
			) {
				fighters.push(fighter);
			}
		});
	}

	function deepEqual(a: any, b: any): boolean {
		// Handle strict equality and NaN case
		if (a === b) return true;
		if (Number.isNaN(a) && Number.isNaN(b)) return true;

		// Handle null or undefined
		if (a == null || b == null) return false;

		// Handle Date objects
		if (a instanceof Date && b instanceof Date) {
			return a.getTime() === b.getTime();
		}

		// Handle arrays
		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return false;
			return a.every((val, i) => deepEqual(val, b[i]));
		}

		// Handle objects (including class instances)
		if (typeof a === 'object' && typeof b === 'object') {
			const keysA = Object.keys(a);
			const keysB = Object.keys(b);
			if (keysA.length !== keysB.length) return false;

			return keysA.every((key) => deepEqual(a[key], b[key]));
		}

		// Fallback for primitive mismatch
		return false;
	}
</script>

<input
	class="bg-gray-300"
	placeholder="First name, last name, nickname"
	type="text"
	bind:value={search}
/>
<button class="rounded-2xl bg-blue-400 p-2 px-3" onclick={fetchData}>fetch data</button>

{#each fighters as fighter}
	<div class="flex flex-col bg-amber-200">
		<a href={'fighter/' + fighter.url.split('/').findLast((x) => x)}
			>{fighter.firstName} {fighter.lastName}({fighter.nickname})</a
		>
	</div>
{/each}
