// Initial Jobs Data
let jobs = [
    { id: 1, company: "Mobile First Corp", pos: "React Native Developer", loc: "Remote", type: "Full-time", sal: "$130k - $175k", desc: "Build cross-platform mobile apps using React Native for global scale.", status: "all" },
    { id: 2, company: "WebFlow Agency", pos: "Web Designer & Developer", loc: "Los Angeles, CA", type: "Part-time", sal: "$80k - $120k", desc: "Create high-end web experiences for premium digital brands.", status: "all" },
    { id: 3, company: "DataViz Solutions", pos: "Data Specialist", loc: "Boston, MA", type: "Full-time", sal: "$125k - $165k", desc: "Transform big data into actionable insights and visualizations.", status: "all" },
    { id: 4, company: "CloudFirst Inc", pos: "Backend Developer", loc: "Seattle, WA", type: "Full-time", sal: "$140k - $190k", desc: "Manage server-side logic and cloud infrastructure architecture.", status: "all" },
    { id: 5, company: "SoftMind", pos: "Frontend Engineer", loc: "Remote", type: "Contract", sal: "$90k - $110k", desc: "Develop interactive user interfaces with modern frameworks.", status: "all" },
    { id: 6, company: "CyberShield", pos: "Security Analyst", loc: "Chicago", type: "Full-time", sal: "$115k - $145k", desc: "Protect enterprise systems from potential security breaches.", status: "all" },
    { id: 7, company: "GreenTech", pos: "DevOps Engineer", loc: "Austin, TX", type: "Hybrid", sal: "$130k - $160k", desc: "Automate deployment pipelines and manage cloud resources.", status: "all" },
    { id: 8, company: "Creative Hub", pos: "UI/UX Designer", loc: "New York", type: "Full-time", sal: "$100k - $135k", desc: "Design user-centric workflows for complex web applications.", status: "all" }
];

let currentTab = 'all';

// Function to update Dashboard statistics
function updateDashboard() {
    document.getElementById('dash-total').innerText = jobs.length;
    document.getElementById('dash-interview').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('dash-rejected').innerText = jobs.filter(j => j.status === 'rejected').length;
}

// Function to switch between tabs
function setTab(tab) {
    currentTab = tab;
    // Update Tab UI active states
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

// Function to change status of a job
function updateStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex !== -1) {
        jobs[jobIndex].status = newStatus;
        updateDashboard();
        render();
    }
}

// Function to delete a job card
function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    updateDashboard();
    render();
}

// Main render function to display cards
function render() {
    const container = document.getElementById('jobs-container');
    const empty = document.getElementById('empty-state');
    
    // Filter jobs based on current tab
    const filteredJobs = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    
    // Update count in the section header
    document.getElementById('current-tab-count').innerText = filteredJobs.length;

    // Show empty state if no jobs match
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
    // Re-initialize icons after rendering
    lucide.createIcons();
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    render();
});