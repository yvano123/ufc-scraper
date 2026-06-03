<script lang="ts">
	import type { FightDetails } from '$lib/classes/FightDetails.js';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let { params } = $props();

	let fightData = $state<FightDetails>();

	onMount(async () => {
		const res = await axios.get(`https://localhost:7130/api/fights/${params.id}`);

		fightData = res.data as FightDetails;
	});
</script>

<p>{fightData?.ufcStatsId}</p>
