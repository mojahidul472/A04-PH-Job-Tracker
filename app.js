let jobs = [];
let currentTab = 'all';

function initData() {
    document.querySelectorAll('.job-source').forEach(el => {
        jobs.push({ ...el.dataset });
    });
}

function updateDashboard() {
    document.getElementById('dash-total').innerText = jobs.length;
    document.getElementById('dash-interview').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('dash-rejected').innerText = jobs.filter(j => j.status === 'rejected').length;
}

function setTab(tab) {
    currentTab = tab;
    ['all', 'interview', 'rejected'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        btn.className = (t === tab) ? "btn btn-sm tab-active-custom px-6 text-xs" : "btn btn-sm btn-ghost bg-white border border-[#F1F2F4] text-[#64748B] px-6 text-xs";
    });
    render();
}

function render() {
    const container = document.getElementById('jobs-container');
    const empty = document.getElementById('empty-state');
    const template = document.getElementById('job-card-template');
    
    container.innerHTML = "";
    const filtered = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    document.getElementById('current-tab-count').innerText = filtered.length;

    if (filtered.length === 0) {
        empty.classList.replace('hidden', 'flex');
    } else {
        empty.classList.replace('flex', 'hidden');
        filtered.forEach(job => {

            const clone = template.content.cloneNode(true);

            clone.querySelector('.comp-name').innerText = job.company;
            clone.querySelector('.job-pos').innerText = job.pos;
            clone.querySelector('.job-meta').innerText = `${job.loc} • ${job.type} • ${job.sal}`;
            clone.querySelector('.job-desc').innerText = job.desc;
            clone.querySelector('.job-status-badge').innerText = job.status === 'all' ? 'Not Applied' : job.status;

            const intBtn = clone.querySelector('.btn-int');
            const rejBtn = clone.querySelector('.btn-rej');
            const delBtn = clone.querySelector('.del-btn');

            intBtn.classList.add(job.status === 'interview' ? 'btn-success' : 'btn-outline');
            rejBtn.classList.add(job.status === 'rejected' ? 'btn-error' : 'btn-outline');

            intBtn.onclick = () => { job.status = 'interview'; updateDashboard(); render(); };
            rejBtn.onclick = () => { job.status = 'rejected'; updateDashboard(); render(); };
            delBtn.onclick = () => { jobs = jobs.filter(j => j.id != job.id);
             updateDashboard(); render(); 
            };

            container.appendChild(clone);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateDashboard();
    render();
});