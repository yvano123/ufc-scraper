<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';

	let { navButton }: { navButton?: boolean } = $props();
</script>

<div class="mb-2 flex h-12 w-full items-center bg-zinc-900 px-3">
	{#if navButton}
		<a class=" transition-all hover:scale-110" href="/"> <ArrowLeft /></a>
	{/if}
</div>
