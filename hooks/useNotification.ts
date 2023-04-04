import { fetcher } from '@/libs';
import useSwr from 'swr';

const useNotification = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  return useSwr(url, fetcher);
};
export default useNotification;
