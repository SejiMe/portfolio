export const info = {
  name: "Cer Jivan Edmalin Atienza",
  brief_description:
    "I'm a Full Stack Developer that lean more on Backend Development, or you can call me Seji.",
  role: "Full Stack Developer / Software Developer",
  picture: "/portfolio/bot-c.png",
  picture_alt: "My Bot",
  location: "Tarlac, Philippines",
  cv: "/portfolio/resume.pdf",

  about: {
    description: `I'm a full stack developer with a passion for causing a little chaos in desktop, web and backend development.
    I have a solid foundation in Information Systems, and using Vertical.
    I excel in building my applications using the technologies C#, .NET, Node.JS, SQL Server, NextJS, TypeScript
    Looking for a challenge? Let's create something memorable together.`,
    education: [
      {
        title: "Bachelors of Science in Information System",
        date: "2019 - 2023",
        location: "Philippines Womens' University, Tarlac City, Philippines",
        gpa: "",
        thesis: "Barangay Web Application Information and Document Management System",
      },
      {
        title: "Diploma in Information System Technology",
        date: "2019 - 2022",
        location: "Philippines Womens' University, Tarlac City, Philippines",
        gpa: "",
        thesis: "",
      },
      {
        title: "Senior High School Academic Track on Accountancy & Business Management",
        date: "2017-2019",
        location: "St. Rose Catholic School, Paniqui, Tarlac, Philippines",
        gpa: "",
        thesis: "",
      },
      
    ],
    experience: [
      {
        title: "Jr. Software Developer",
        date: "2023 - Present",
        location: "Central Luzon Doctors' Hospital, Tarlac City, Philippines",
        description:
          "Developed web and desktop experiences using NextJS, Prisma, Socket.IO, Zustand, WinForms, ASP.NET Core Web API, C#. Often multitasked between coding and supporting with IT Department.",
      },
    ],

    skills: ["C#", ".NET", "Node.js", "JavaScript/TypeScript", "Sql Server", "SSRS", "Docker"], // not used yet
  },

  projects: [
    {
      title: "Wellcare API ",
      date: "2024",
      description:
        "A Backend Web API Server for processing Core Features for In-House Systems.",
      link: "https://github.com/SejiMe/portfolio/tree/main/public/APILogbookCensored.png",
      tech: [".NET", "C#", "SQL Server", "Entity Framework Core", "Dapper"],
      img_alt: "WellCare API (CLDH)",
      img_path: "/portfolio/public/APILogbookCensored.png",
    },
    {
      title: "Case Mix Collation System (CLDH)",
      date: "2024",
      description:
        "Developed a legacy system module to correct patient case classifications, ensuring accurate census reports aligned with doctor specializations.",
      link: "https://github.com/SejiMe/portfolio/tree/main/public/CaseMix.png",
      tech: ["SQL Server", "WinForms .NET Framework", "C#"],
      img_alt: "Case Mix",
      img_path: "/portfolio/public/CaseMix.png",
    },
    {
      title: "Patient Queueing System (CLDH)",
      date: "2023",
      description:
        "Built a real-time queue system integrated with BizBox HIS to manage patient flow and reporting.",
      link: "https://github.com/SejiMe/portfolio/tree/main/public/PatientQueuer.png",
      tech: ["NextJS", "Prisma", "SQL Server", "WinForms", "C#", "Dapper", "Socket.IO"],
      img_alt: "Queueing",
      img_path: "portfolio/public/PatientQueuer.png",
    },
    {
      title: "Parking Management System (CLDH)",
      date: "2023",
      description:
        "Parking Management System that facilitates the Parking of Vehicles of Patients Printing of Parking Tickets and a Dashboard Metrics for Daily Reports.",
      link: "/portfolio",
      tech: ["Entity Framework Core", "SQL Server", "WinForms .NET Core", "C#"],
      img_alt: "Queueing Collage",
      img_path: "#",
    }

  ],

  contact: {
    email: "jivanatienza@gmail.com",
    linkedin: "https://www.linkedin.com/in/sejime/",
    github: "https://github.com/SejiMe",
  },
};
