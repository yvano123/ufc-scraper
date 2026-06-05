<script lang="ts">
	import type { FightDetails } from '$lib/classes/FightDetails.js';
	import HeaderBar from '$lib/Components/HeaderBar.svelte';
	import MatchResult from '$lib/Components/MatchResult.svelte';
	import Puppet from '$lib/Components/Puppet.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { Jellyfish } from 'svelte-loading-spinners';

	let { params } = $props();

	let loading = $state(true);

	let fightData = $state<FightDetails>();

	let total1 = $state(1);
	let total2 = $state(1);

	onMount(async () => {
		loading = true;
		const res = await axios.get(`https://localhost:7130/api/fights/${params.id}`);

		fightData = res.data as FightDetails;

		if (!fightData.name1 || !fightData.name2) await rescrape();

		total1 =
			fightData.headStrikesLanded1 + fightData.bodyStrikesLanded1 + fightData.legStrikesLanded1;
		total2 =
			fightData.headStrikesLanded2 + fightData.bodyStrikesLanded2 + fightData.legStrikesLanded2;

		loading = false;
	});

	async function rescrape() {
		loading = true;
		const res = await axios.get(`https://localhost:7130/api/fights/scrape/${params.id}`);

		fightData = res.data as FightDetails;
		loading = false;
	}
</script>

<HeaderBar navButton />
{#if loading}
	<div class="flex h-screen w-full items-center justify-center">
		<Jellyfish color="white" duration="1.5s" />
	</div>
{:else}
	<div class="flex flex-row justify-around">
		<div class="flex flex-col items-center">
			<a class="text-4xl hover:underline" href="/fighter/{fightData?.id1}">{fightData?.name1}</a>
			<p class="text-xl">{fightData?.nickname1 == '' ? 'ᅠ' : fightData?.nickname1}</p>
			<MatchResult result={fightData?.matchResult1 ?? 0} />
		</div>

		<div class="flex flex-row gap-3">
			{#if fightData}
				<Puppet {fightData} index={1} />
				<Puppet {fightData} index={2} />
			{/if}
		</div>

		<div class="flex flex-col items-center">
			<a class="text-4xl hover:underline" href="/fighter/{fightData?.id2}">{fightData?.name2}</a>
			<p class="text-xl">{fightData?.nickname2 == '' ? 'ᅠ' : fightData?.nickname2}</p>
			<MatchResult result={fightData?.matchResult2 ?? 0} />
		</div>
	</div>
{/if}
