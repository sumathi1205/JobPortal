import React , {useState} from "react";
import { useForm } from "react-hook-form"
import { useLoaderData , useParams} from 'react-router-dom';
import CreatableSelect from "react-select/creatable"


const UpdateJob = () => {
  const {id} = useParams();
  console.log(id)
  const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,companyLogo,employmentType,description,postedBy,skills} =useLoaderData();
  const [selectedOption,setSelectedOption]=useState(null);
    const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>{
    data.skills=selectedOption;
   //console.log(data);
   fetch("http://localhost:3000/update-job/${id}",{
    method:"PATCH",
    headers:{'content-type':'application/json'},
    body:JSON.stringify(data)
  })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);
      if(result.acknowledged === true){
        alert("Job Updated Successfully!!!")
      }
      reset()
    });
  };

   
  const options=[
    {value: "JavaScript",label:"JavaScript"},
    {value: "C",label:"C"},
    {value: "C++",label:"C++"},
    {value: "Java",label:"Java"},
    {value: "Python",label:"Python"},
    {value: "Php",label:"Php"},
    {value: "HTML",label:"HTML"},
    {value: "CSS",label:"CSS"},
    {value: "React",label:"React"},
    {value: "Node",label:"Node"},
    {value: "MongoDB",label:"MongoDB"},
    {value: "Redux",label:"Redux"},
    

  ];


  return (
    <div className='max-w-screen-2x1 container mx-auto x1:px-24 px-4'> 
    {/*form*/}
    <div className='bg-[#FAFAFA] PY-10PX-4 LG:PX-16'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* 1st row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Title</label>
                    <input type="text" defaultValue={jobTitle}
                     {...register("jobTitle")} className="create-job-input" />
                </div>
                  <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Company Name</label>
                    <input type="text" placeholder="Microsoft"
                    defaultValue={companyName}
                     {...register("companyName")} className="create-job-input" />
                </div>
            </div>
        {/* 2nd row*/}
             <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Minimum Salary</label>
                    <input type="text" placeholder="$20k"
                    defaultValue={minPrice}
                     {...register("minPrice")} className="create-job-input" />
                </div>
                  <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Maximum Salary</label>
                    <input type="text" placeholder="$120k"
                    defaultValue={maxPrice}
                     {...register("maxPrice")} className="create-job-input" />
                </div>
            </div>
        {/* 3rd row */}
              <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Salary Type</label>
                    <select {...register("salaryType")} className="create-job-input">
                     <option value={salaryType}>{salaryType}</option>
                     <option value="Hourly">Hourly</option>
                     <option value="Monthly">Monthly</option>
                     <option value="Yearly">Yearly</option>
                    </select>
                </div>
                  <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Location</label>
                    <input type="text" placeholder="Brussels"
                    defaultValue={jobLocation}
                     {...register("jobLocation")} className="create-job-input" />
                </div>
            </div>
        {/* 4th row */}
              <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Posting Date</label>
                    <input type="date" placeholder="2024-2-1"
                    defaultValue={postingDate}
                     {...register("postingDate")} className="create-job-input" />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Experience Level</label>
                    <select {...register("experienceLevel")} className="create-job-input">
                     <option value={experienceLevel}>{experienceLevel}</option>
                     <option value="NoExperience">NoExperience</option>
                     <option value="Internship">Internship</option>
                     <option value="WorkExperience">Work Remotely</option>
                    </select>
                </div>
            </div> 
        {/* 5th row */}
              <div>
                   <label className="block mb-2 text-lg">Required Skill Sets</label>
                    <CreatableSelect
                    defaultValue={skills}
                    onChange={setSelectedOption}
                    options={options}
                    isMulti
                    className="create-job-input py-4"/>
              </div>
        {/* 6th row */}
                 <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Company Logo</label>
                    <input type="url" placeholder="paste your company logo url: https://i.ibb.co/fXnBWVk/sumacompany.png "
                    defaultValue={companyLogo}
                     {...register("companyLogo")} className="create-job-input" />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Employment Type</label>
                    <select {...register("employmentType")} className="create-job-input">
                     <option value={employmentType}>{employmentType}</option>
                     <option value="Full-time">Full-time</option>
                     <option value="Part-time">Part-time</option>
                     <option value="Temporary">Temporary</option>
                    </select>
                </div>
            </div> 
        {/*7th row */}
                <div>
                    <label className="block mb2 text-lg">Job Description</label>
                    <textarea className="w-full p1-3 py=1.5 focus:outline-none placeholder:tex-gray-700"
                     rows={6}
                     defaultValue={description}
                     placeholder="Job Description"
                     {...register("description")}/>
                </div>
        {/* last row */}
                <div className="w-full">
                   <label className="block mb2 text-lg">Job Posted By</label>  
                   <input type="email" placeholder="your email"
                   defaultValue={postedBy}
                     {...register("postedBy")} className="create-job-input"
                      />
                </div>
          
      <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
    </form>
    </div>
    </div>
  )
}

export default UpdateJob