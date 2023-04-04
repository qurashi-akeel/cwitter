import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid post id');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error('Invalid post id');

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      if (updatedLikedIds.includes(currentUser.id)) return;
      updatedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: { body: 'Someone liked your cweet', userId: post.userId },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (req.method === 'DELETE') {
      if (updatedLikedIds.includes(currentUser.id)) {
        updatedLikedIds = updatedLikedIds.filter(
          (likedId) => likedId !== currentUser.id
        );
      } else return;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
