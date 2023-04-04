import { fetcher } from '@/libs';
import useSwr from 'swr';

const useCurrentUser = () => {
  return useSwr('/api/current', fetcher);
};

export default useCurrentUser;
