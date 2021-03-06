import React, { useEffect } from 'react';

import { JobCard } from 'components';
import { useStore } from 'context/store';
import { updateJobs } from 'context/actions/jobs';
import { Jobs } from 'services/';
import { Container, JobWrapper } from './styles';

const JobsList = () => {
  const { jobs, dispatch } = useStore();

  useEffect(() => {
    (async () => {
      const jobsFetched = await Jobs.FetchJobs({});
      dispatch(updateJobs(jobsFetched));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {jobs.map(job => (
        <JobWrapper key={job.id}>
          <JobCard {...job} />
        </JobWrapper>
      ))}
    </Container>
  );
};

export default JobsList;
