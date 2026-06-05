<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';

	var HeadText = $state<HTMLButtonElement>();
	let { navButton }: { navButton?: boolean } = $props();
	function navBack() {
		window.history.back();
	}
</script>

<div class="relative mb-2 flex h-12 w-full items-center justify-center bg-zinc-900 px-3">
	{#if navButton}
		<button class="b absolute left-2 m-0 w-0 transition-all hover:scale-110" onclick={navBack}>
			<ArrowLeft /></button
		>
	{/if}
	<div class="flex flex-row">
		<button
			bind:this={HeadText}
			onclick={() => {
				navigation.navigate('/');
			}}
			class="text-xl transition-transform duration-75 hover:-translate-y-0.5"
		>
			U
		</button>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>f</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>c</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>s</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>c</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>r</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>a</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>p</button
		>
		<button
			onclick={() => {
				navigation.navigate('/');
			}}
			class={HeadText?.className ?? 'text-xl'}>e</button
		>
	</div>
</div>
