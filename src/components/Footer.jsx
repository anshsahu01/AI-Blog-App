import React from "react";
import { footer_data  } from "../main";

const Footer = () => {
  return (
    <div className="px-6 md:px-24 xl:px-32 bg-blue-700/30">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
       <div>
        <img src="logo.svg" alt="logo img" className="w-32 sm:w-44"/>
       </div>

       <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
{footer_data.map((section,index)=>(
    <div key={index}>
        <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
        <ul>
            {section.links.map((link,i)=>(
                <li key={i}>
                    <a href="#">{link}</a>
                    </li>
            ))}
        </ul>
        </div>
))}
       </div>



      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 @ AI blog app - All rights reserved
      </p>
    </div>
  );
};

export default Footer;
