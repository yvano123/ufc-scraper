<script lang="ts">
	import axios from 'axios';
	const ufcUrl = 'http://ufcstats.com/statistics/fighters';

	async function fetchData() {
		const res = await axios.get(ufcUrl, );
		console.log(res.data);
	}
</script>

<button class="rounded-2xl bg-blue-400 p-2 px-3" onclick={fetchData}>fetch data</button>
