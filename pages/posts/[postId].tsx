import { CommentFeed, Form, Header, PostItem } from '@/components';
import { usePost } from '@/hooks';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  return (
    <>
      <Header label={'Cweet'} showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        placeholder="Send reply to cweet"
        postId={postId as string}
        isComment
      />
      <CommentFeed comments={fetchedPost?.comments}/>
    </>
  );
};
export default PostView;
