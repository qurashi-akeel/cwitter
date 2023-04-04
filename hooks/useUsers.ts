import { fetcher } from '@/libs';
import useSWR from 'swr';

const useUsers = () => {
  return useSWR('/api/users', fetcher);
};
export default useUsers;
