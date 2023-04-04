import { useRouter } from 'next/router';
import { BsTwitter } from 'react-icons/bs';

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      className="rounded-full h-14 w-14 flex p-4 items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
      onClick={() => router.push('/')}
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};
export default SidebarLogo;
