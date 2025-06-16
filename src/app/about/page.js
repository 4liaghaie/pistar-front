// app/about/page.js
import Image from "next/image";
import styles from "./page.module.css";

async function getAboutData() {
  const res = await fetch(
    "https://api.pistaragency.com/api/about?populate=*",
    { cache: "no-store" } // remove if you want ISR
  );
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}

export default async function About() {
  const data = await getAboutData();
  const aboutContent = data?.data?.About_text ?? "No content found.";

  /* ⚡ if you store the images in Strapi too, resolve them here -------------
     const base      = "https://api.pistaragency.com";
     const imgLight  = base + (data?.data?.img?.formats?.medium?.url ?? data?.data?.img?.url ?? "");
     const firstDark = Array.isArray(data?.data?.img_dark) ? data.data.img_dark[0] : data?.data?.img_dark;
     const imgDark   = base + (firstDark?.formats?.medium?.url ?? firstDark?.url ?? "");
  -------------------------------------------------------------------------*/

  return (
    <>
      {/* Desktop layout */}
      <div className={styles.aboutContainer}>
        <main className={styles.container}>
          <h1 className="ml-10 text-5xl mb-10">About&nbsp;Us</h1>
          <div
            className="ml-10"
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          />
        </main>

        {/* Sticky circle with light + dark images */}
        <div className={styles.stickyImage}>
          <div className={styles.circleWrapper}>
            {/* light-mode image */}
            <Image
              src="/pi-star-agency.png" /* or imgLight */
              alt="Pi-Star logo"
              fill
              style={{ objectFit: "cover" }}
              className="block dark:hidden"
              priority
            />
            {/* dark-mode image */}
            <Image
              src="/pi-star-white.png" /* or imgDark */
              alt="Pi-Star logo (dark)"
              fill
              style={{ objectFit: "cover" }}
              className="hidden dark:block"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
