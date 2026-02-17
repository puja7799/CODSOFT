/* JOB DATABASE 
   Load jobs from localStorage or use default jobs */
let jobs = JSON.parse(localStorage.getItem("jobs")) || [
{title:"Frontend Developer",company:"Google",location:"Remote",salary:"12 LPA",type:"Full Time",desc:"Build UI interfaces"},
{title:"Backend Developer",company:"Amazon",location:"Bangalore",salary:"15 LPA",type:"Full Time",desc:"Server logic"},
{title:"UI Designer",company:"Adobe",location:"Remote",salary:"10 LPA",type:"Remote",desc:"Design layouts"},
{title:"Data Analyst",company:"Microsoft",location:"Hyderabad",salary:"14 LPA",type:"Hybrid",desc:"Analyze data"},
{title:"Software Tester",company:"Infosys",location:"Pune",salary:"8 LPA",type:"Full Time",desc:"Test applications"},
{title:"AI Engineer",company:"OpenAI",location:"Remote",salary:"20 LPA",type:"Remote",desc:"Build AI models"},
{title:"Java Developer",company:"TCS",location:"Delhi",salary:"9 LPA",type:"Full Time",desc:"Develop backend"},
{title:"Python Developer",company:"IBM",location:"Chennai",salary:"13 LPA",type:"Hybrid",desc:"Automation scripts"}
];

/* Save jobs array to localStorage */
function saveJobs(){
localStorage.setItem("jobs",JSON.stringify(jobs));
}


/* TOAST MESSAGE FUNCTION
   Shows temporary popup notification */
function toast(msg){
let t=document.createElement("div");
t.className="toast";
t.innerText=msg;
document.body.appendChild(t);
t.style.display="block";
setTimeout(()=>t.remove(),2500);
}


/* SHOW JOBS ON PAGE LOAD */
if(document.getElementById("jobList"))
displayJobs(jobs);

/* SHOW FEATURED JOBS */
if(document.getElementById("featuredJobs"))
displayJobs(jobs.slice(0,4),"featuredJobs");


/* DISPLAY JOB CARDS */
function displayJobs(list,id="jobList"){
let box=document.getElementById(id);
if(!box) return;
box.innerHTML="";

/* If no jobs found */
if(list.length===0){
box.innerHTML="<p>No jobs found</p>";
return;
}

/* Loop through job list and create cards */
list.forEach((job,i)=>{
box.innerHTML+=`
<div class="card">
<h3>${job.title}</h3>
<p>${job.company}</p>
<p>${job.location}</p>
<p>${job.type}</p>
<button onclick="viewJob(${i})">Details</button>
</div>`;
});
}


/* SEARCH JOB FUNCTION */
function searchJobs(){
let val=document.getElementById("search").value.toLowerCase();

/* Filter jobs based on search input */
let filtered=jobs.filter(j=>
j.title.toLowerCase().includes(val) ||
j.company.toLowerCase().includes(val) ||
j.location.toLowerCase().includes(val)
);

displayJobs(filtered);
}


/* FILTER JOB BY TYPE */
function filterType(type){
if(type==="all") displayJobs(jobs);
else displayJobs(jobs.filter(j=>j.type===type));
}


/* VIEW JOB DETAILS PAGE */
function viewJob(i){
localStorage.setItem("selectedJob",JSON.stringify(jobs[i]));
location.href="job-detail.html";
}


/* LOAD JOB DETAILS DATA */
let job=JSON.parse(localStorage.getItem("selectedJob"));

if(job && document.getElementById("title")){
title.innerText=job.title;
company.innerText="Company: "+job.company;
location.innerText="Location: "+job.location;
salary.innerText="Salary: "+job.salary;
type.innerText="Type: "+job.type;
desc.innerText=job.desc;
}


/* APPLY JOB FUNCTION */
function applyJob(){
let applied=JSON.parse(localStorage.getItem("applied"))||[];

/* Prevent duplicate application */
if(applied.includes(job.title)){
toast("Already applied ❗");
return;
}

applied.push(job.title);
localStorage.setItem("applied",JSON.stringify(applied));
toast("Application Submitted 🎉");
}


/* POST JOB FUNCTION (Employer) */
function postJob(){
let j={
title:jtitle.value,
company:jcompany.value,
location:jlocation.value,
salary:jsalary.value,
type:jtype.value,
desc:jdesc.value
};

/* Validate required fields */
if(!j.title || !j.company){
toast("Fill required fields");
return;
}

jobs.push(j);
saveJobs();
toast("Job Posted Successfully 🚀");
setTimeout(()=>location.reload(),1200);
}


/* LOGIN FUNCTION */
function login(){
let u=JSON.parse(localStorage.getItem("user"));

if(u && u.email===email.value && u.pass===pass.value){
toast("Login Success ✅");
setTimeout(()=>location.href="index.html",1000);
}else toast("Invalid Login ❌");
}


/* REGISTER FUNCTION */
function register(){
localStorage.setItem("user",JSON.stringify({
email:email.value,
pass:pass.value
}));

toast("Registered Successfully 🎉");
}


/* SAVE PROFILE */
function saveProfile(){
localStorage.setItem("profile",JSON.stringify({
name:name.value,
email:email.value,
skills:skills.value
}));

toast("Profile Saved 💾");
}


/* SHOW APPLIED JOB LIST */
let applied=JSON.parse(localStorage.getItem("applied"));

if(applied && document.getElementById("applied")){
applied.forEach(a=>{
appliedDiv.innerHTML+=`<p>✔ ${a}</p>`;
});
}


/* DARK MODE TOGGLE */
function toggleDark(){
document.body.classList.toggle("dark");
localStorage.setItem("darkmode",document.body.classList.contains("dark"));
}

/* LOAD DARK MODE IF ENABLED */
if(localStorage.getItem("darkmode")==="true")
document.body.classList.add("dark");
