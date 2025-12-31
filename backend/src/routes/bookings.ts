import { Router } from 'express';
import prisma from '../prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

const createBookingSchema = z.object({
    tourId: z.string(),
    price: z.number().positive(),
    // Add paymentIntentId here later if integrating Stripe
});

// GET user bookings
router.get('/my-bookings', requireAuth, async (req: AuthRequest, res) => {
    try {
        // Assuming Supabase User ID matches our Database User ID (or supabaseId)
        // We first need to find the local user record based on the Supabase ID from token
        console.log('Fetching bookings for Supabase ID:', req.user.id);

        const user = await prisma.user.findUnique({
            where: { supabaseId: req.user.id }
        });

        if (!user) {
            console.error('User profile not found in local DB for Supabase ID:', req.user.id);
            return res.status(404).json({ error: 'User profile not found' });
        }

        console.log('Found local user:', user.id);

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: { tour: true },
            orderBy: { createdAt: 'desc' }
        });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// POST create booking
router.post('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { tourId, price } = createBookingSchema.parse(req.body);

        // 1. Get User
        const user = await prisma.user.findUnique({
            where: { supabaseId: req.user.id }
        });

        if (!user) {
            return res.status(404).json({ error: 'User profile not found. Please log in again.' });
        }

        // 2. Transaction: Check Availability -> Create Booking
        const result = await prisma.$transaction(async (tx) => {
            const tour = await tx.tour.findUnique({
                where: { id: tourId },
                include: { bookings: true } // Or count
            });

            if (!tour) throw new Error('Tour not found');

            const currentBookings = await tx.booking.count({
                where: { tourId }
            });

            if (currentBookings >= tour.maxGroupSize) {
                throw new Error('Tour is fully booked');
            }

            const booking = await tx.booking.create({
                data: {
                    userId: user.id,
                    tourId,
                    price,
                    paid: true // Assume paid for MVP, or integrate Stripe webhook here
                }
            });

            return booking;
        });

        res.status(201).json(result);
    } catch (error: any) {
        if (error.message === 'Tour is fully booked') {
            return res.status(409).json({ error: error.message });
        }
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: 'Booking failed' });
    }
});

export default router;
