import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./_info.module.css";
import { ReactElement } from "react";
import Image from "next/image";
import { PrivateInfo, PublicInfo } from "@/src/model/info";

export default function Info({
  isPublic,
  isAnonymous,
  publicInfo,
  privateInfo,
  children,
}: {
  isPublic: boolean;
  isAnonymous: boolean;
  publicInfo: PublicInfo;
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
    if (publicInfo.linkedIn) {
      elements.push(
        <li key="linkedin">
          <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />{" "}
          <a href={"https://" + publicInfo.linkedIn}>{publicInfo.linkedIn}</a>
        </li>,
      );
    }

    if (publicInfo.github) {
      elements.push(
        <li key="github">
          <FontAwesomeIcon className={styles.icon} icon={faGithub} />{" "}
          <a href={"https://" + publicInfo.github}>{publicInfo.github}</a>
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
        <span> {publicInfo.city} </span>
      </li>,
    );
  }

  return (
    <section
      className={`${styles.info} ${
        publicInfo.picture ? styles["has-picture"] : ""
      }`}
    >
      <div>
        <h1 className={styles.title}>
          {isAnonymous ? publicInfo.anonymousName : publicInfo.fullName}
        </h1>
        <p className={styles.subtitle}>{publicInfo.jobTitle}</p>
      </div>
      <ul>{elements}</ul>
      {publicInfo.picture ? (
        <div className={styles.picture}>
          <div>
            <Image
              alt={publicInfo.picture.alt}
              src={publicInfo.picture.url}
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
