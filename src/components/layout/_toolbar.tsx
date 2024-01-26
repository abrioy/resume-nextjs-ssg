import styles from "./_toolbar.module.css";
import { faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { publicInfo } from "@/src/content/public-info";
import GitHubButton from "react-github-btn";

const RESUME_PDF_URL = `pdf/${publicInfo.resumePdfName}`;
const CV_PDF_URL = `pdf/${publicInfo.cvPdfName}`;

export default function Toolbar({ type }: { type: "cv" | "resume" }) {
  const menuElement = useRef<HTMLElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(!entry.isIntersecting && entry.boundingClientRect.y < 0);
      },
      { threshold: [1] },
    );

    const ref = menuElement.current;
    if (ref) {
      observer.observe(ref);
      return () => {
        observer.unobserve(ref);
      };
    }
  }, [setIsPinned]);

  const getClickHandler: (
    handlerType: "cv" | "resume",
  ) => MouseEventHandler<HTMLAnchorElement> = (handlerType) => (event) => {
    event.preventDefault();
    const container = document.querySelector("[data-show-children]");
    if (!container) {
      window.print();
    } else {
      const oldSelector = container.getAttribute("data-show-children");
      container.setAttribute("data-show-children", handlerType);
      window.print();
      if (oldSelector) {
        container.setAttribute("data-show-children", oldSelector);
      }
    }
  };
  return (
    <menu
      className={`${styles.toolbar} ${isPinned ? styles.pinned : ""}`}
      ref={menuElement}
    >
      <li style={{ flex: 1 }}>
        <span className={styles.name}>{publicInfo.fullName}</span>
        <span className={styles.title}> {publicInfo.jobTitle}</span>
      </li>

      <li className={styles.desc}>
        {type === "resume" ? publicInfo.resumeDesc : publicInfo.cvDesc}
      </li>

      {publicInfo.repoUrl && (
        <li className={styles.repo}>
          <GitHubButton
            href={publicInfo.repoUrl}
            data-size="large"
            data-show-count="false"
          >
            View on GitHub
          </GitHubButton>
        </li>
      )}

      <li className={styles.dropdown}>
        <FontAwesomeIcon icon={faFilePdf} />

        <ul>
          <li>
            <a
              href={RESUME_PDF_URL}
              target="_self"
              type="application/pdf"
              download={publicInfo.resumePdfName}
            >
              {publicInfo.resumeHoverDownload}
            </a>
          </li>
          <li>
            <a
              href={CV_PDF_URL}
              target="_self"
              type="application/pdf"
              download={publicInfo.cvPdfName}
            >
              {publicInfo.cvHoverDownload}
            </a>
          </li>
        </ul>
      </li>

      <li className={styles.dropdown}>
        <FontAwesomeIcon icon={faPrint} />

        <ul>
          <li>
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              onClick={getClickHandler("resume")}
            >
              {publicInfo.resumeHoverPrint}
            </a>
          </li>
          <li>
            <a
              href={CV_PDF_URL}
              target="_blank"
              onClick={getClickHandler("cv")}
            >
              {publicInfo.cvHoverPrint}
            </a>
          </li>
        </ul>
      </li>
    </menu>
  );
}
