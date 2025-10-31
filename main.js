// Basic interactive app logic: render jobs, search, modal apply handling.

document.addEventListener('DOMContentLoaded', () => {
  // sample job data
  const jobs = [
    { id: 'j1', title: 'House Manager', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,500 - 2,000', description: 'Taking care of the house when your bosses are not at home, Keeping and looking after the children of your bosses.' },
    { id: 'j2', title: 'Hospital Cleaner', country: 'Qatar', category: 'Cleaning', salary: 'QAR 1,800 - 2,500', description: 'Cleaning in the hospital.' },
    { id: 'j3', title: 'Assistant Nurse ', country: 'UAE', category: 'Healthcare', salary: 'AED 2,200 - 2,800', description: 'Qualified nurse with valid Certificate.' },
    { id: 'j4', title: 'House Keeper', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,200 - 1,400', description: 'Household duties, childcare, and cleaning.' },
    { id: 'j5', title: 'House Keeper', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,200 - 1,500', description: 'Household duties, childcare, and cleaning.' },
    { id: 'j6', title: 'Security Personel', country: 'Dubai', category: 'Security', salary: 'AED 1,500 - 2,000', description: 'Ensuring safety & providing Security.' },
    { id: 'j7', title: 'House Maid', country: 'Qatar', category: 'House Managing', salary: 'AED 1,300 - 1,600', description: 'Household duties, childcare, and cleaning.' },
    { id: 'j8', title: 'House Maid', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,200 - 1,500', description: 'Household duties, childcare, and cleaning.' },
    { id: 'j9', title: 'Security Personel', country: 'Qatar', category: 'Security', salary: 'QAR 1,200 - 1,500', description: 'Ensuring safety & providing Security.' },
    { id: 'j10', title: 'House Maid', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,200 - 1,500', description: 'Household duties, childcare, and cleaning.' },
    { id: 'j11', title: 'House Maid', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,200 - 1,500', description: 'Household duties, childcare, and cleaning.' },
    { id: 'j12', title: 'House Maid', country: 'Qatar', category: 'House Managing', salary: 'QAR 1,200 - 1,500', description: 'Household duties, childcare, and cleaning.' },
  ];

  const jobsList = document.getElementById('jobs-list');
  const searchBtn = document.getElementById('search-btn');
  const keywordInput = document.getElementById('search-keyword');
  const countrySelect = document.getElementById('search-country');
  const categorySelect = document.getElementById('search-category');
  const quickSearch = document.getElementById('quick-search');

  function renderJobs(list) {
    jobsList.innerHTML = '';
    if (!list.length) {
      jobsList.innerHTML = '<p>No jobs found. Try different filters.</p>';
      return;
    }
    list.forEach(job => {
      const card = document.createElement('article');
      card.className = 'job-card';
      card.innerHTML = `
        <h4>${job.title}</h4>
        <div class="job-meta"><span>${job.country}</span> · <span>${job.category}</span> · <span>${job.salary}</span></div>
        <p>${job.description}</p>
        <div class="job-actions">
          <button class="btn primary" data-job-id="${job.id}">Apply</button>
          <a class="btn" href="jobs.html?job=${job.id}">Details</a>
        </div>
      `;
      jobsList.appendChild(card);
    });
  }

  // initial render
  renderJobs(jobs);

  // search/filter
  function applyFilters() {
    const kw = (keywordInput.value || quickSearch.value || '').toLowerCase().trim();
    const country = countrySelect.value;
    const cat = categorySelect.value;
    const filtered = jobs.filter(j => {
      const matchesKw = !kw || (j.title + ' ' + j.description + ' ' + j.category).toLowerCase().includes(kw);
      const matchesCountry = !country || j.country === country;
      const matchesCat = !cat || j.category === cat;
      return matchesKw && matchesCountry && matchesCat;
    });
    renderJobs(filtered);
  }

  searchBtn?.addEventListener('click', applyFilters);
  quickSearch?.addEventListener('keyup', (e) => { if (e.key === 'Enter') applyFilters(); });
  document.getElementById('nav-toggle')?.addEventListener('click', () => {
    const nav = document.getElementById('main-nav');
    if (nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });
  document.getElementById('nav-toggle2')?.addEventListener('click', () => {
    const nav = document.getElementById('main-nav2');
    if (nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });

  // Delegate apply button clicks to open modal
  jobsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-job-id]');
    if (!btn) return;
    openApplyModal(btn.dataset.jobId);
  });

  // Modal logic
  const modal = document.getElementById('apply-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel');
  const applyForm = document.getElementById('apply-form');
  const feedback = document.getElementById('apply-feedback');

  function openApplyModal(jobId) {
    document.getElementById('apply-job-id').value = jobId;
    feedback.textContent = '';
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeApplyModal() {
    modal.setAttribute('aria-hidden', 'true');
    applyForm.reset();
  }
  modalClose?.addEventListener('click', closeApplyModal);
  modalCancel?.addEventListener('click', closeApplyModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeApplyModal(); });

  applyForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('apply-job-id').value;
    const name = document.getElementById('applicant-name').value.trim();
    const phone = document.getElementById('applicant-phone').value.trim();
    const country = document.getElementById('applicant-country').value.trim();
    const notes = document.getElementById('applicant-notes').value.trim();

    if (!name || !phone || !country) {
      feedback.style.color = 'crimson';
      feedback.textContent = 'Please fill required fields.';
      return;
    }
    // Save application locally (demo). Replace with server call when available.
    const apps = JSON.parse(localStorage.getItem('aziz_applications') || '[]');
    apps.push({ id: id || 'unknown', name, phone, country, notes, time: new Date().toISOString() });
    localStorage.setItem('aziz_applications', JSON.stringify(apps));

    feedback.style.color = 'green';
    feedback.textContent = 'Application sent. Our team will contact you soon.';
    setTimeout(() => closeApplyModal(), 1200);
  });

  // Newsletter form
  const nlForm = document.getElementById('newsletter-form');
  nlForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    const fb = document.getElementById('newsletter-feedback');
    if (!email || !/.+@.+\..+/.test(email)) {
      fb.style.color = 'crimson';
      fb.textContent = 'Please enter a valid email.';
      return;
    }
    fb.style.color = 'Blue';
    fb.textContent = 'Subscribed — thank you!';
    nlForm.reset();
  });

  // Footer year
  document.getElementById('year').textContent =  Date(2023).getFullYear(2023);
});