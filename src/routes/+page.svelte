<script lang="ts">
	import { FighterListItem } from '$lib/classes/FighterListItem';
	import axios from 'axios';
	import { Crown } from '@lucide/svelte';
	import { Diamonds, Rainbow } from 'svelte-loading-spinners';

	let search = $state('');
	let lastSearch = '';

	let fighters = $state<Array<FighterListItem>>();
	async function fetchData() {
		const res = await axios.get(`https://localhost:7130/api/fighter/search?search=${search}`);
		fighters = res.data as Array<FighterListItem>;
	}
	async function scrapeData() {
		const res = await axios.get(
			`https://localhost:7130/api/fighter/search/scrape?search=${search}`
		);
		fighters = res.data as Array<FighterListItem>;
	}

	let timer: number;
	const fetchOnDebounce = () => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			if (search == '') {
				fighters = undefined;
			} else {
				await fetchData();
			}
		}, 150);
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3">
	<input
		class="w-3/10 rounded-2xl bg-zinc-700 p-2 px-3 text-2xl text-white placeholder-zinc-500"
		placeholder="First name, last name, nickname"
		type="text"
		bind:value={search}
		onkeyup={() => fetchOnDebounce()}
	/><Diamonds />
	<div class="flex h-4/5 w-screen justify-center">
		{#if fighters}
			<div class="flex w-3/10 flex-col gap-1.5 rounded-2xl p-3">
				{#each fighters as fighter}
					<div class="flex flex-col rounded-xl bg-zinc-600 p-2 px-3">
						<a class="flex flex-row justify-between text-white" href={'fighter/' + fighter.id}
							><p>
								{fighter.firstName}
								{fighter.lastName}
								{fighter.nickname !== '' ? `(${fighter.nickname})` : ''}
							</p>
							<div class="flex flex-row gap-2">
								<p>{fighter.wins}-{fighter.losses}-{fighter.draws}</p>
								{#if fighter.belt}
									<Crown />
								{/if}
							</div>
						</a>
					</div>
				{/each}

				<div class="flex flex-col items-center justify-center">
					<p class="text-white">Your fighter not listed?</p>
					<button class="bg-white" onclick={scrapeData}> Scrape now</button>
				</div>
			</div>
		{/if}
	</div>
</div>
