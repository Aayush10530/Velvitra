import { Router } from 'express';
import prisma from '../prisma';
import { z } from 'zod';
import { sendCustomTourEmail } from '../services/emailService';

const router = Router();

// Validation Schema
const customTourSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    countryCode: z.string().optional(),

    // New fields
    country: z.string().optional(),
    monuments: z.array(z.string()),
    themes: z.array(z.string()),
    adults: z.number().int().nonnegative(),
    children: z.number().int().nonnegative(),
    language: z.string().optional(),
    date: z.string().optional(), // Received as ISO string
    vehicle: z.string().optional(),
    specialRequests: z.string().optional()
});

// POST create custom tour request (Public)
router.post('/', async (req, res) => {
    try {
        const data = customTourSchema.parse(req.body);

        // Convert date string to Date object
        const travelDate = data.date ? new Date(data.date) : null;

        // Remove date from data object to avoid type conflict, handled manually
        const { date, ...prismaData } = data;

        const customTour = await prisma.customTour.create({
            data: {
                ...prismaData,
                travelDate: travelDate,
                status: 'pending'
            }
        });

        // Send Email Notification (Async - do not block response)
        sendCustomTourEmail(customTour).catch(err => console.error('Failed to send email notification:', err));

        res.status(201).json({
            success: true,
            message: 'Custom tour request received! We will contact you shortly.',
            data: customTour
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
            return res.status(400).json({ message: `Validation Error: ${errorMessage}`, errors: error.errors });
        }
        console.error(error);
        res.status(500).json({
            message: 'Failed to submit request',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;
