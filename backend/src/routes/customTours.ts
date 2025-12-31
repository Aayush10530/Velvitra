import { Router } from 'express';
import prisma from '../prisma';
import { z } from 'zod';

const router = Router();

// Validation Schema
const customTourSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    destination: z.string().min(2),
    duration: z.number().int().positive(),
    groupSize: z.number().int().positive(),
    budget: z.string().optional(),
    requirements: z.string().optional()
});

// POST create custom tour request (Public)
router.post('/', async (req, res) => {
    try {
        const data = customTourSchema.parse(req.body);

        const customTour = await prisma.customTour.create({
            data: {
                ...data,
                status: 'pending'
            }
        });

        res.status(201).json({
            success: true,
            message: 'Custom tour request received! We will contact you shortly.',
            data: customTour
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: 'Failed to submit request' });
    }
});

export default router;
