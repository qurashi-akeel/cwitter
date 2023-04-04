import { useCurrentUser, useLike, useLoginModal } from '@/hooks';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo } from 'react';
import Avator from '../Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: FC<PostItemProps> = ({ userId, data = {} }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, isLoading, toggleLike } = useLike({
    postId: data.id,
    userId,
  });

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/users/${data.user?.id}`);
    },
    [router, data.user?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] cursor-pointer border-neutral-800 p-5 hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avator userId={data.user?.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data.user?.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{data.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt} ago</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500 disabled:opacity-50"
              onClick={isLoading ? () => toast('Please wait...') : onLike}
            >
              <LikeIcon size={20} color={hasLiked ? 'crimson' : ''} />
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
