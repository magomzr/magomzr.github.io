import SocialIcon from "./social-icons/";
import { config } from "../config";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${config.email}`} size={6} />
          <SocialIcon kind="github" href={config.github} size={6} />
          <SocialIcon kind="linkedin" href={config.linkedin} size={6} />
          <SocialIcon kind="twitter" href={config.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{config.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          {/* <div>{` • `}</div> */}
          {/* <Link to="https://rabbyhasan.com.bd/">Mario Gomez&apos;s Portfolio</Link> */}
        </div>
      </div>
    </footer>
  );
}
