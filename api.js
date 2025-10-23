function fetchJobs() {
    return fetch('../data/jobs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function getJobById(jobId) {
    return fetchJobs().then(jobs => {
        return jobs.find(job => job.id === jobId);
    });
}

function searchJobs(keyword) {
    return fetchJobs().then(jobs => {
        return jobs.filter(job => job.title.toLowerCase().includes(keyword.toLowerCase()));
    });
}