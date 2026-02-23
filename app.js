let jobs = [];
let currentTab = 'all';

// 1. HTML er data-source 
function initData() {
    const rawElements = document.querySelectorAll('.job-source');
    rawElements.forEach(el => {
        jobs.push({
            id: parseInt(el.dataset.id),
            company: el.dataset.company,
            pos: el.dataset.pos,
            loc: el.dataset.loc,
            type: el.dataset.type,
            sal: el.dataset.sal,
            desc: el.dataset.desc,
            status: el.dataset.status
        });
    });
}

//2. Dashboard
function updateDashboard() {
    document.getElementById('dash-total').innerText = jobs.length;
    document.getElementById('dash-interview').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('dash-rejected').innerText = jobs.filter(j => j.status === 'rejected').length;
}

// 3. Tab bodlano
function setTab(tab) {
    currentTab = tab;
    ['all', 'interview', 'rejected'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if(t === tab) {
            btn.className = "btn btn-sm tab-active-custom px-6";
        } else {
            btn.className = "btn btn-sm btn-ghost bg-white border border-gray-200 text-gray-500 px-6";
        }
    });
    render();
}

// 4. newStatus bodlano
function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        job.status = newStatus;
        updateDashboard();
        render();
    }
}

//5. Delet kora
function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    updateDashboard();
    render();
}

// 6. render 
function render() {
    const container = document.getElementById('jobs-container');
    const empty = document.getElementById('empty-state');
    const filteredJobs = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    
    document.getElementById('current-tab-count').innerText = filteredJobs.length;

    if (filteredJobs.length === 0) {
        container.innerHTML = "";
        empty.classList.remove('hidden');
        empty.classList.add('flex');
    } else {
        empty.classList.add('hidden');
        container.innerHTML = filteredJobs.map(job => `
            <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm relative group transition-all duration-300 hover:shadow-md">
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-gray-300 hover:text-error transition-colors">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
                <h3 class="text-lg font-bold text-gray-800">${job.company}</h3>
                <p class="text-gray-500 mb-2 font-medium">${job.pos}</p>
                <div class="flex flex-wrap gap-4 text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">
                    <span>${job.loc}</span> • <span>${job.type}</span> • <span>${job.sal}</span>
                </div>
                <div class="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded text-[10px] font-black mb-4 uppercase">
                    ${job.status === 'all' ? 'Not Applied' : job.status}
                </div>
                <p class="text-sm text-gray-600 mb-6 leading-relaxed max-w-3xl">${job.desc}</p>
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" 
                        class="btn ${job.status === 'interview' ? 'btn-success' : 'btn-outline btn-success'} btn-sm px-6 font-bold uppercase tracking-tighter">
                        Interview
                    </button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" 
                        class="btn ${job.status === 'rejected' ? 'btn-error' : 'btn-outline btn-error'} btn-sm px-6 font-bold uppercase tracking-tighter">
                        Rejected
                    </button>
                </div>
            </div>
        `).join('');
    }
    lucide.createIcons();
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateDashboard();
    render();
});