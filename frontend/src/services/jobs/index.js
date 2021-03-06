import { APIPrivateRequest } from 'services/http/private';

export class Jobs extends APIPrivateRequest {
  static getInstance() {
    return new Jobs();
  }

  _jobsRoute = '/jobs/';

  _pushQuery([...item]) {
    const query = item
      .map((qry, index) => {
        const [name] = Object.keys(qry);
        const [value] = Object.values(qry);

        if (value) {
          if (index === 0) {
            return `?${name}=${value}&`;
          } else {
            return `${name}=${value}&`;
          }
        }
        return '';
      })
      .filter(Boolean);
    return query.join('');
  }

  async FetchJobs({ query = '', limit, offset }) {
    try {
      const parm = this._pushQuery([{ query }, { limit }, { offset }]);

      const jobsFetched = await this.Get(`${this._jobsRoute}${parm}`);
      return jobsFetched;
    } catch (error) {
      console.log(error);
    }
  }

  async CreateJob(job, userId) {
    try {
      const jobToCreate = { job };
      const newJob = await this.Post(`/jobs/${userId}`, jobToCreate);

      return newJob;
    } catch (error) {
      console.log(error);
    }
  }
}
export default Jobs.getInstance();
