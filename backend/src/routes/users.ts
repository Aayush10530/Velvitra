import { Router } from 'express';
import prisma from '../prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// SYNC User Profile (Call this after Supabase Login on Frontend)
router.post('/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { id, email, phone, user_metadata } = req.user;

        // Upsert: Create if new, Update if exists
        const user = await prisma.user.upsert({
            where: { supabaseId: id },
            update: {
                email: email, // Keep email in sync
            },
            create: {
                supabaseId: id,
                email: email,
                name: user_metadata?.full_name || user_metadata?.name || 'Traveler',
                phone: phone || ''
            }
        });

        res.json(user);
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ error: 'Failed to sync user profile' });
    }
});

router.get('/me', requireAuth, async (req: AuthRequest, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { supabaseId: req.user.id }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

export default router;
