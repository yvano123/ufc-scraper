<script lang="ts">
	let {
		strikesLanded,
		total,
		exponent
	}: { strikesLanded: number; total: number; exponent: number } = $props();
</script>

<div class="flex flex-row gap-2">
	<div
		style={`background-color: rgb(${Math.round(
			255 * Math.pow((strikesLanded ?? 0) / total, 0.75)
		)}, ${Math.round(255 * (1 - Math.pow((strikesLanded ?? 0) / total, 0.75)))}, 0);`}
		class="h-12 w-3 rounded-full"
	></div>
	<div
		style={`background-color: rgb(${Math.round(
			255 * Math.pow((strikesLanded ?? 0) / total, 0.75)
		)}, ${Math.round(255 * (1 - Math.pow((strikesLanded ?? 0) / total, 0.75)))}, 0);`}
		class="h-12 w-3 rounded-full"
	></div>
</div>
