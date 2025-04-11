import { Suspense } from "react";
import { info } from "../../data/info";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BgPlaceHolder from "./BgPlaceHolder";

interface ProjectCardProps {
  project: (typeof info)["projects"][number];
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <div className="flex flex-col bg-primary dark:bg-dk-primary rounded-lg">
      <div className="flex-shrink-0">
        <a
          href={project.link}
          rel="noreferrer"
          aria-label={project.img_alt + ", click to open the project page"}
        >
          {
            project.img_path != "#" ? 
              (<Suspense fallback={<BgPlaceHolder/>}>
                  {/* LazyLoadImage is used to load the image only when it is in the viewport */}
                    {/* <LazyLoadImage
                      className="h-52 w-full object-cover"
                      src={project.img_path}
                      alt={project.img_alt}
                      width="100%"
                      effect="blur"
                    /> */}
                <div className="relative group">
                    <LazyLoadImage
                      className="h-52 w-full object-cover"
                      src={project.img_path}
                      alt={project.img_alt}
                      width="100%"
                      effect="blur"
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-all duration-300 group-hover:backdrop-blur-0 group-hover:bg-black/0"></div>
                  </div>
                  {/* <img  className="h-52 w-full object-cover " src="/portfolio/bg.jpg" alt="Loading..." /> */}
              </Suspense>) : 
              <BgPlaceHolder/>
          }
        </a>
      </div>
      <div className="flex-1 bg-primary dark:bg-dk-primary p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text dark:text-dk-text">
            <a
              href={project.link}
              rel="noreferrer"
              className="hover:underline"
              aria-label="Title of the project, click to open the project page"
            >
              {project.title}
            </a>
          </p>
          <a
            href={project.link}
            rel="noreferrer"
            className="block mt-2"
            aria-label="Description of the project, click to open the project page"
          >
            <p className="text-xl font-semibold text-gray-900">
              {project.description}
            </p>
          </a>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex flex-wrap space-x-2">
            {project.tech.map((tech) => (
              <span
                className="text-accent dark:text-dk-accent text-xs font-semibold"
                key={tech}
              >
                #{tech}
              </span>
            ))}
          </div>
          <p className="ml-auto text-sm font-medium text-gray-900">
            {project.date}
          </p>
        </div>
      </div>
    </div>
  );
}
