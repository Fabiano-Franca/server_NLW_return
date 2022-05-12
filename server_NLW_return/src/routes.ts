import express from 'express';
import { json } from 'stream/consumers';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './repositories/use-cases/submit-feedback-use-case';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    const feedback = await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })



    return res.status(201).json(feedback);
});

routes.get('/feedbacks', async (req, res) => {

    const prismaFeedbackRepository = new PrismaFeedbackRepository()

    return res.status(201).json(prismaFeedbackRepository);
});