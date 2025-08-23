import SocialIcon from "./social-icons/";
import { siteData } from "../config";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteData.email}`} size={6} />
          <SocialIcon kind="github" href={siteData.github} size={6} />
          <SocialIcon kind="linkedin" href={siteData.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteData.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteData.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          {/* <div>{` • `}</div> */}
          {/* <Link to="https://rabbyhasan.com.bd/">Mario Gómez&apos;s Portfolio</Link> */}
        </div>
      </div>
    </footer>
  );
}
