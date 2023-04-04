import { Form, Header, PostFeed } from '@/components';

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's Happening" />
      <PostFeed />
    </>
  );
}
