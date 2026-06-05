<script lang="ts">
	import { onMount } from 'svelte';

	import { Fighter } from '$lib/classes/Fighter.js';
	import moment from 'moment';
	import axios, { AxiosError } from 'axios';
	import { RefreshCw } from '@lucide/svelte';
	import { Jellyfish } from 'svelte-loading-spinners';
	import HeaderBar from '$lib/Components/HeaderBar.svelte';
	import { error } from '@sveltejs/kit';

	let { params } = $props();
	let loading = $state(true);

	let fighter = $state<Fighter | undefined>(undefined);

	onMount(async () => {
		loading = true;
		try {
			const res = await axios.get(`https://localhost:7130/api/fighter/${params.id}`);

			fighter = res.data as Fighter;
			if (fighter.fights.length == 0) {
				await scrapeFighter();
			}
		} catch (e: any) {
			const err = e as AxiosError;
			console.log(err.status);

			if (err.status == 404) navigation.navigate('/fighter/404');
		}

		loading = false;
	});

	async function scrapeFighter() {
		loading = true;
		const res = await axios.get(`https://localhost:7130/api/fighter/scrape/${fighter?.id}`);

		fighter = res.data as Fighter;
		loading = false;
	}
</script>

<HeaderBar navButton />
{#if loading}
	<div class="flex h-screen w-full items-center justify-center">
		<Jellyfish duration="1.5s" color="white" />
	</div>
{:else}
	<div class=" px-3">
		<div class="flex flex-row items-center gap-4">
			<h1 class="text-2xl">
				{fighter?.firstName}
				{fighter?.lastName}
				{fighter?.wins}-{fighter?.losses}-{fighter?.draws}
				({fighter?.noContests} NC)
			</h1>
			<div class="flex items-center gap-1">
				<button
					onclick={scrapeFighter}
					class="group relative items-center rounded-full bg-zinc-700 p-1"
					><RefreshCw size={18} />
					<div class="scale-0 transition-all group-hover:scale-100">
						<span
							class="absolute z-20 w-max -translate-x-1/2 translate-y-3 self-center rounded-md p-1 text-xs dark:bg-zinc-700 dark:text-white"
							>rescrape</span
						>
						<!-- Arrow -->
						<div
							class="absolute aspect-square w-4 translate-y-2 rotate-45 rounded-xs dark:bg-zinc-700"
						></div>
					</div>
				</button>
				<i>Updated {moment(fighter?.updatedAt).fromNow()}</i>
			</div>
		</div>

		<h1 class="text-xl">{fighter?.nickname}</h1>
		<p>Height: {fighter?.height}</p>
		<p>Weight: {fighter?.weight}</p>
		<p>Reach: {fighter?.reach}</p>
		<p>Stance: {fighter?.stance}</p>

		<div class="flex flex-col gap-1 border-2 border-zinc-900">
			<div class=" mb-1 flex flex-row items-center gap-5 bg-black px-3">
				<p class="w-10 text-center">W/L</p>
				<p>Fighter</p>
				<p>Test</p>
				<p>Test</p>
			</div>
			{#each fighter?.fights as match, index}
				<a
					href="/fights/{match.fightDetailsId}"
					class:pointer-events-none={match.result == 5}
					class="flex flex-row items-center gap-5 p-2 px-3"
					class:bg-zinc-800={index % 2 == 1}
					class:bg-zinc-700={index % 2 == 0}
				>
					<p
						class="w-13 rounded-full px-2 text-center"
						class:bg-green-400={match.result == 0}
						class:bg-red-400={match.result == 1}
						class:bg-olive-400={match.result > 1 && match.result != 5}
						class:bg-purple-400={match.result == 5}
					>
						{match.result == 0
							? 'Win'
							: match.result == 1
								? 'Loss'
								: match.result == 2
									? 'Draw'
									: match.result == 3
										? 'NC'
										: match.result == 5
											? 'Next'
											: '?'}
					</p>
					<div class="flex flex-col">
						<p>{fighter?.firstName} {fighter?.lastName}</p>
						<p>{match.opponentName}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}
