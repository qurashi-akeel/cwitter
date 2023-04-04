import { useUser } from '@/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';

interface AvatorProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avator: FC<AvatorProps> = ({ userId, hasBorder, isLarge }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`${hasBorder ? 'border-4 border-black' : ''} ${
        isLarge ? 'h-32 w-32' : 'h-12 w-12'
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        alt={fetchedUser?.username + "'s Avatar"}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
        fill
        sizes='120px'
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        onClick={onClick}
      />
    </div>
  );
};
export default Avator;
