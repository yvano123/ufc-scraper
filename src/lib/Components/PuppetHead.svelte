<script lang="ts">
	let {
		strikesLanded,
		total,
		exponent
	}: { strikesLanded: number; total: number; exponent: number } = $props();
</script>

<div
	style={`background-color: rgb(${Math.round(
		255 * Math.pow((strikesLanded ?? 0) / total, exponent)
	)}, ${Math.round(255 * (1 - Math.pow((strikesLanded ?? 0) / total, exponent)))}, 0);`}
	class="h-10 w-10 rounded-full"
></div>
