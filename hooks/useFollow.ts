import { useCallback, useMemo, useState } from 'react';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import useUser from './useUser';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      setIsLoading(true);
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }
      await request();
      mutateCurrentUser();
      mutateFetchedUser();
      isFollowing
        ? toast('Unfollowed ' + currentUser.name)
        : toast.success('Following ' + currentUser.name);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    isFollowing,
    mutateCurrentUser,
    mutateFetchedUser,
    userId,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
    isLoading,
  };
};
export default useFollow;
