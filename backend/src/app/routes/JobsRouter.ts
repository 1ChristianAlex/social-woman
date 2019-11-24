import { Router } from 'express';
import JobController from '../controllers/Jobs/JobController';

export const JobsRouter = Router();
const JobsRouterPath = '/api/jobs/:id?';
const JobsC = new JobController();

JobsRouter.route(JobsRouterPath)
  .post(async (req, res, next) => {
    try {
      const {
        job,
        user: { id }
      } = req.body;
      const jobCreation = await JobsC.CreateJob(job, id);
      res.json(jobCreation);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const { query, limit, offset } = req.query;
      const jobSearch = await JobsC.GetJobs(query, limit, offset);

      res.json(jobSearch);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const {
        user: { id },
        job
      } = req.body;

      await JobsC.UpdateJob(job.id, id, job);

      res.json({ mensage: 'Success on post update' });
      next();
    } catch (error) {
      res.status(400).json({ mensage: 'Error on update job' });
    }
  });