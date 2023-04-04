import { useLoginModal } from '@/hooks';
import { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex justify-center items-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 cursor-pointer transition rounded-full hover:bg-opacity-90 bg-sky-500">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Post cweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
