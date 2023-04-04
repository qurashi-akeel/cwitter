import { fetcher } from '@/libs';
import useSWR from 'swr';

const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : null;
  return useSWR(url, fetcher);
};
export default usePost;
