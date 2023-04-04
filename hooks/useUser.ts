import { fetcher } from '@/libs';
import useSWR from 'swr';

const useUser = (userId: string) => {
  return useSWR(userId ? '/api/users/' + userId : null, fetcher);
};
export default useUser;
