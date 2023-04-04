// import axios from 'axios';

// const fetcher = async (url: string) => {
//   const res = await axios.get(url);
//   const data = await res.data();
//   return data;
// };

// export default fetcher;

import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
