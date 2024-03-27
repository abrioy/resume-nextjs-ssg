import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGitlab,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./_info.module.css";
import { ReactElement } from "react";
import Image from "next/image";
import { ConfigurationVariant } from "@/src/model/configuration.model";
import { PrivateInfo } from "@/src/model/private-info";

export default function Info({
  variant,
  isPublic,
  isAnonymous,
  privateInfo,
  children,
}: {
  variant: ConfigurationVariant;
  isPublic: boolean;
  isAnonymous: boolean;
  privateInfo: PrivateInfo;
  children?: ReactElement | ReactElement[];
}) {
  let elements = [];
  if (!isPublic && !isAnonymous) {
    if (privateInfo.email) {
      elements.push(
        <li key="email">
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />{" "}
          <a href={"mailto:" + privateInfo.email}>{privateInfo.email}</a>
        </li>,
      );
    }
    if (privateInfo.phone && privateInfo.phoneInt) {
      elements.push(
        <li key="phone">
          <FontAwesomeIcon className={styles.icon} icon={faPhone} />{" "}
          <a href={"tel:" + privateInfo.phoneInt}>{privateInfo.phone}</a>
        </li>,
      );
    }
  }
  if (!isAnonymous) {
    if (variant.socials.linkedIn()) {
      elements.push(
        <li key="linkedin">
          <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />{" "}
          <a href={"https://" + variant.socials.linkedIn()}>
            {variant.socials.linkedIn()}
          </a>
        </li>,
      );
    }

    if (variant.socials.github()) {
      elements.push(
        <li key="github">
          <FontAwesomeIcon className={styles.icon} icon={faGithub} />{" "}
          <a href={"https://" + variant.socials.github()}>
            {variant.socials.github()}
          </a>
        </li>,
      );
    }

    if (variant.socials.gitlab()) {
      elements.push(
        <li key="gitlab">
          <FontAwesomeIcon className={styles.icon} icon={faGitlab} />{" "}
          <a href={"https://" + variant.socials.gitlab()}>
            {variant.socials.gitlab()}
          </a>
        </li>,
      );
    }
  }
  if (privateInfo.address1) {
    elements.push(
      <li key="address">
        <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
        <span>
          {privateInfo.address1}
          {privateInfo.address2 && (
            <>
              <br /> {privateInfo.address2}
            </>
          )}
        </span>
      </li>,
    );
  } else {
    elements.push(
      <li key="address">
        <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
        <span> {variant.infos.location()} </span>
      </li>,
    );
  }

  const pictureUrl = variant.picture.url();
  const pictureAlt = variant.picture.url();
  return (
    <section
      className={`${styles.info} ${
        variant.picture ? styles["has-picture"] : ""
      }`}
    >
      <div>
        <h1 className={styles.title}>
          {isAnonymous
            ? variant.infos.anonymousName()
            : variant.infos.fullName()}
        </h1>
        <p className={styles.subtitle}>{variant.infos.jobTitle()}</p>
      </div>
      <ul>{elements}</ul>
      {pictureUrl && pictureAlt ? (
        <div className={styles.picture}>
          <div>
            <Image
              src={pictureUrl}
              alt={pictureAlt}
              fill={true}
              loading={"lazy"}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <section className={styles.intro}>{children}</section>
    </section>
  );
}
