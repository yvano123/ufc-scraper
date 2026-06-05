<script lang="ts">
	let { result }: { result: number } = $props();
</script>

<p
	class=" rounded-full px-3"
	class:bg-green-400={result == 0}
	class:bg-red-400={result == 1}
	class:bg-olive-400={result ?? 0 > 1}
>
	{result == 0
		? 'Win'
		: result == 1
			? 'Loss'
			: result == 2
				? 'Draw'
				: result == 3
					? 'No Contest'
					: result == 4
						? 'Next'
						: 'Unknown'}
</p>
