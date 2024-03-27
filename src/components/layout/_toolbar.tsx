import styles from "./_toolbar.module.css";
import { faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { configuration } from "@/src/content/configuration";
import GitHubButton from "react-github-btn";
import {
  ConfigurationVariant,
  VariantDocument,
} from "@/src/model/configuration.model";

export default function Toolbar({
  variant,
  resume,
}: {
  variant: ConfigurationVariant;
  resume: VariantDocument;
}) {
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
    resumeId: string,
  ) => MouseEventHandler<HTMLAnchorElement> = (resumeId) => (event) => {
    event.preventDefault();
    const container = document.querySelector("[data-show-children]");
    if (!container) {
      window.print();
    } else {
      const oldSelector = container.getAttribute("data-show-children");
      container.setAttribute("data-show-children", resumeId);
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
        <span className={styles.name}>{variant.infos.fullName()}</span>
        <span className={styles.title}> {variant.infos.jobTitle()}</span>
      </li>

      <li className={styles.desc}>{resume.headerTitle}</li>

      {configuration.repoUrl && (
        <li className={styles.repo}>
          <GitHubButton
            href={configuration.repoUrl}
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
          {variant.documents.map((resume, index) => (
            <li key={index}>
              <a
                href={`pdf/${resume.pdfName}`}
                target="_self"
                type="application/pdf"
                download={resume.pdfName}
              >
                {resume.hoverDownload}
              </a>
            </li>
          ))}
        </ul>
      </li>

      <li className={styles.dropdown}>
        <FontAwesomeIcon icon={faPrint} />

        <ul>
          {variant.documents.map((resume, index) => (
            <li key={index}>
              <a
                href={`pdf/${resume.pdfName}`}
                target="_blank"
                onClick={getClickHandler(`${index}`)}
              >
                {resume.hoverPrint}
              </a>
            </li>
          ))}
        </ul>
      </li>
    </menu>
  );
}
