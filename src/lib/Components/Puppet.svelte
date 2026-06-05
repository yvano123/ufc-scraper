<script lang="ts">
	import type { FightDetails } from '$lib/classes/FightDetails';
	import PuppetBody from './PuppetBody.svelte';
	import PuppetHead from './PuppetHead.svelte';
	import PuppetLegs from './PuppetLegs.svelte';

	let { fightData, index }: { fightData: FightDetails; index: number } = $props();
	let total = $state(1);

	let headLanded = $state(1);
	let bodyLanded = $state(1);
	let legLanded = $state(1);
	const exponent = 0.75;

	if (index == 1) {
		total =
			fightData.headStrikesLanded1 + fightData.bodyStrikesLanded1 + fightData.legStrikesLanded1;
		headLanded = fightData.headStrikesLanded1;
		bodyLanded = fightData.bodyStrikesLanded1;
		legLanded = fightData.legStrikesLanded1;
	} else {
		total =
			fightData.headStrikesLanded2 + fightData.bodyStrikesLanded2 + fightData.legStrikesLanded2;
		headLanded = fightData.headStrikesLanded2;
		bodyLanded = fightData.bodyStrikesLanded2;
		legLanded = fightData.legStrikesLanded2;
	}
</script>

<div class="flex h-max flex-row gap-3">
	{#if index == 1}
		<div class="flex h-full flex-col gap-9">
			<p class="text-center">{Math.round((headLanded / total) * 100)}%</p>
			<p class="text-center">{Math.round((bodyLanded / total) * 100)}%</p>
			<p class="text-center">{Math.round((legLanded / total) * 100)}%</p>
		</div>
		<div class="flex flex-col items-center gap-1">
			<PuppetHead {total} strikesLanded={headLanded} {exponent} />
			<PuppetBody {total} strikesLanded={bodyLanded} {exponent} />
			<PuppetLegs {total} strikesLanded={legLanded} {exponent} />
		</div>
	{:else}
		<div class="flex flex-col items-center gap-1">
			<PuppetHead {total} strikesLanded={headLanded} {exponent} />
			<PuppetBody {total} strikesLanded={bodyLanded} {exponent} />
			<PuppetLegs {total} strikesLanded={legLanded} {exponent} />
		</div>
		<div class="flex h-full flex-col gap-9">
			<p class="text-center">{Math.round((headLanded / total) * 100)}%</p>
			<p class="text-center">{Math.round((bodyLanded / total) * 100)}%</p>
			<p class="text-center">{Math.round((legLanded / total) * 100)}%</p>
		</div>
	{/if}
</div>
