<script lang="ts">
	import { onMount } from 'svelte';

	import { parse, HTMLElement } from 'node-html-parser';
	import { Fighter, ProfileMatchItem } from '$lib/classes/Fighter.js';

	let { params } = $props();

	let fighter = $state<Fighter | undefined>(undefined);

	let root: HTMLElement | undefined = undefined;

	onMount(async () => {
		const res = await fetch(`/api/fighter?id=${params.id}`);

		root = parse(await res.text());

		getFighterData();
		getMatches();
	});

	function getFighterData() {
		var page = root!.querySelector('.b-fight-details')!;
		const containerChildren = page.children[0].children[0].children;

		fighter = new Fighter();

		fighter.Name = '';
		fighter.height = containerChildren[0].text
			.removeReturnCharacters()
			.removeWhitespace()
			.getStat();
		fighter.weight = containerChildren[1].text
			.removeReturnCharacters()
			.removeWhitespace()
			.getStat();
		fighter.reach = containerChildren[2].text.removeReturnCharacters().removeWhitespace().getStat();
		fighter.stance = containerChildren[3].text
			.removeReturnCharacters()
			.removeWhitespace()
			.getStat();

		fighter.dateOfBirth = containerChildren[4].text.removeReturnCharacters().removeWhitespace();
		fighter.Name = dataByclass('b-content__title-highlight');
		fighter.record = dataByclass('b-content__title-record').getStat();
		fighter.nickname = dataByclass('b-content__Nickname');
	}

	function getMatches() {
		const matchParent = root?.getElementsByTagName('tbody')[0];
		matchParent?.children.forEach((fight, index) => {
			if (index == 0) return;

			let match = new ProfileMatchItem();
			match.result = fight.querySelector('.b-flag__text')?.innerText ?? 'Unknown';

			match.opponentName = fight.children[1].children[1].innerText
				.removeReturnCharacters()
				.removeWhitespace();

			fighter?.matches.push(match);
		});
	}

	function dataByclass(className: string) {
		return root!
			.querySelector('.' + className)!
			.innerText.removeWhitespace()
			.removeReturnCharacters();
	}

	String.prototype.removeWhitespace = function () {
		const str = String(this);

		return str.replaceAll('  ', '');
	};
	String.prototype.removeReturnCharacters = function () {
		const str = String(this);

		return str.replaceAll('\n', '');
	};

	String.prototype.getStat = function () {
		const str = String(this);

		return str.split(':')[1].replace(' ', '');
	};
</script>

<h1 class="text-2xl">{fighter?.Name} {fighter?.record}</h1>
<h1 class="text-xl">{fighter?.nickname}</h1>
<p>Height: {fighter?.height}</p>
<p>Weight: {fighter?.weight}</p>
<p>Reach: {fighter?.reach}</p>
<p>Stance: {fighter?.stance}</p>

<div class="flex flex-col gap-1">
	<div class=" mb-1 flex flex-row items-center gap-5 bg-black px-3 text-white">
		<p class="w-10 text-center">W/L</p>
		<p>Fighter</p>
		<p>Test</p>
		<p>Test</p>
	</div>
	{#each fighter?.matches as match, index}
		<div
			class="flex flex-row items-center gap-5 p-2 px-3"
			class:bg-gray-300={index % 2 == 0}
			class:bg-white={index % 2 == 1}
		>
			<p
				class="w-10 rounded-full bg-gray-100 px-2 text-center"
				class:bg-green-400={match.result == 'win'}
			>
				{match.result}
			</p>
			<div class="flex flex-col">
				<p>{fighter?.Name}</p>
				<p>{match.opponentName}</p>
			</div>
		</div>
	{/each}
</div>
