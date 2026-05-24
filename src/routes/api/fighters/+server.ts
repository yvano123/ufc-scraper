
import axios from 'axios';

export const GET = async ({ url }: { url: URL }) => {
  const res = await axios.get(`http://ufcstats.com/statistics/fighters/search?query=${url.searchParams.get("search")}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  return new Response(res.data, {
    headers: { 'content-type': 'text/html' },
  });
};
