<script lang="ts">
	let {
		strikesLanded,
		total,
		exponent
	}: { strikesLanded: number; total: number; exponent: number } = $props();
</script>

<div class="flex flex-row gap-1">
	<div
		style={`background-color: rgb(${Math.round(
			255 * Math.pow((strikesLanded ?? 0) / total, exponent)
		)}, ${Math.round(255 * (1 - Math.pow((strikesLanded ?? 0) / total, exponent)))}, 0);`}
		class="mt-1 h-12 w-3 rounded-full"
	></div>
	<div
		style={`background-color: rgb(${Math.round(
			255 * Math.pow((strikesLanded ?? 0) / total, exponent)
		)}, ${Math.round(255 * (1 - Math.pow((strikesLanded ?? 0) / total, exponent)))}, 0);`}
		class="h-15 w-10 rounded-xl"
	></div>
	<div
		style={`background-color: rgb(${Math.round(
			255 * Math.pow((strikesLanded ?? 0) / total, exponent)
		)}, ${Math.round(255 * (1 - Math.pow((strikesLanded ?? 0) / total, exponent)))}, 0);`}
		class="mt-1 h-12 w-3 rounded-full"
	></div>
</div>
