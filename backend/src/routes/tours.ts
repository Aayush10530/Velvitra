import { Router } from 'express';
import prisma from '../prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation Schemas
const createTourSchema = z.object({
    title: z.string().min(3),
    location: z.string(),
    description: z.string(),
    price: z.number().positive(),
    duration: z.number().int().positive(),
    maxGroupSize: z.number().int().positive(),
    imageCover: z.string().optional(),
    images: z.array(z.string()).optional()
});

// GET all tours
router.get('/', async (req, res) => {
    try {
        const tours = await prisma.tour.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(tours);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tours' });
    }
});

// GET single tour
router.get('/:id', async (req, res) => {
    try {
        const tour = await prisma.tour.findUnique({
            where: { id: req.params.id },
            include: { reviews: true }
        });

        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        res.json(tour);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tour' });
    }
});

// POST new tour (Admin only - practically protected by just auth for now)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const data = createTourSchema.parse(req.body);
        const tour = await prisma.tour.create({ data });
        res.status(201).json(tour);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ error: 'Failed to create tour' });
    }
});

export default router;
