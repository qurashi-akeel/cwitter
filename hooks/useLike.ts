import { useCallback, useMemo, useState } from 'react';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import usePost from './usePost';
import usePosts from './usePosts';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts();

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser?.id]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      setIsLoading(true);
      let request;

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      hasLiked ? toast('Like removed') : toast.success('Liked');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    loginModal,
    hasLiked,
    postId,
    mutateFetchedPosts,
    mutateFetchedPost,
  ]);

  return {
    hasLiked,
    isLoading,
    toggleLike,
  };
};
export default useLike;
