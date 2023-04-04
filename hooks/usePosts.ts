import { fetcher } from '@/libs';
import useSWR from 'swr';

const usePosts = (userId?: string) => {
  const url = userId ? '/api/posts?userId=' + userId : '/api/posts/';
  return useSWR(url, fetcher);
};
export default usePosts;
