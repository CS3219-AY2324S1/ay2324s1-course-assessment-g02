import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface DeleteUserRequestBody {
  userId: string;
}

const router = Router();
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

router.post('/delete-user', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET as string
    ) as JwtPayload;
    const userIdFromToken = decoded.sub;

    const { userId } = req.body as DeleteUserRequestBody;

    console.log('userId', userId);
    console.log('userIdFromToken', userIdFromToken);

    if (userId !== userIdFromToken) {
      return res.status(403).json({ error: 'Unauthorized request' });
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.log('error', error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log('Invalid or expired token', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

router.post('/update-password', async (req: Request, res: Response) => {
  const { userId, newPassword } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET as string
    ) as JwtPayload;
    const userIdFromToken = decoded.sub;

    if (userId !== userIdFromToken) {
      return res.status(403).json({ error: 'Unauthorized request' });
    }

    // Lol we need some verification here, but supabase not have it
    // directly, so we need to do it ourselves

    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating password' });
  }
});

export default router;
